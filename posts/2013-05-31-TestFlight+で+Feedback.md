インストールは [CocoaPods](http://cocoapods.org) から。

    # Podfile
    platform :ios
    target :PROJECT_NAME, :exclusive => true do
       pod 'TestFlightSDK', '~> 1.2.5'
    end


あとはインストールするだけ。簡単♪

    $ pod install

※ 1.3.0 の beta が出ているけど、beta は openFeedbackView メソッドがなくなってしまった（？）ので、1.2.5を使用。

# セットアップ
ぼくの拙い文章よりもドキュメントを参照するべし→ https://testflightapp.com/sdk/ios/doc/

Integration の 4. In your Application Delegate から。

１点だけ、CocoaPods を使うと Framework化（？）されるので import に注意。

    //Prefix.pch
    #ifdef __OBJC__
        #import <TestFlightSDK/TestFlight.h>
    #endif

# どうやって Feedback 送る？
Feedback を送るには

- `[TestFlight openFeedbackView] で組み込みの View を使う
- 独自の View を実装して `[TestFlight submitFeedback:]` で直接送信

今回は楽をしたいので前者で。
メソッドをユーザに呼び出してもらう必要があるけど、View上にボタンなどを設置するとせっかくのデザインが壊れてしまう。「設定」などのメニューから飛ぶこともできるけど、ユーザがFeedbackを送りたい時っていつ？

<strong>「今でしょ！」</strong>

というわけで、正にViewを表示しているその時に送りたいんだと思うんです。そこでこれ！

## シェイク
今回はデザインも壊さずFeedbackしたいと思った時に直にってことでシェイクジェスチャーに注目。

普通は ViewController に以下のように実装します。

    - (BOOL)canBecomeFirstResponder{ return YES; }
    - (void)motionEnded:(UIEventSubtype)motion withEvent:(UIEvent *)event
    {
        if (motion == UIEventSubtypeMotionShake) {
            // SHAKE SHAKE!!
        }
    }

だけど、全ての ViewController に実装するのめんどいなあ。
そこでこれ！

## SWIZZLING!!!

そもそもシェイクジェスチャーがあったら View とか関係なく発動したいわけです。iOS においてイベントは UIApplication -> UIWindow ときて各種 View （というか UIResponder）に流れて行きます。

UIApplication または UIWindow の sendEvent: メソッドを監視すれば全てのイベントをキャッチできます。普通は MyApplication や MyWindow というサブクラスを使ってうまくやるんですけど、それはそれで面倒です。

そこで Swzzling と呼ばれるテクニックを使います。Objective-C には既存のメソッドを置き換えてしまえ、てことが簡単にできるんですね、Ruby みたいですね。

<script type='text/javascript' src='https://gist.github.com/dictav/3877796.js?file=swizzling.m'></script>

toggleWatchShakeGesture がださいですねー。Block渡したりBOOL渡して切り替える方が良さそう
