@zuccoi さんが作った REKit がとても面白かった。

[インスタンス毎の動的メソッド実装／上書き機能を備えた REKit](http://runlooprun.wordpress.com/2013/02/12/rekit-intro/)
https://github.com/zuccoi/REKit

このままcloneしてコピーしてARCの問題があったりしていやんなので [CocoaPod](http://www.cocoapods.org/)化してみた。

# tag打ち

    $pod spec create https://github.com/zuccoi/REKit

したら「バージョン番号のタグ打てよ」と怒られたのでフォークして言われるがままにした

    $git clone git@github.com:dictav/REKit.git
    $git tag -a 1.0.0 -m "Tag release 1.0.0"
    $git push --tags

# podspecファイルの作成
ファイルを作るコマンドを打つ

    $pod spec create https://github.com/dictav/REKit

REKit.podspec というファイルができて長ーいスペックファイルができあがる。REKitに合うように適当に修正して以下のようになった。author直してません、スミマセン、スミマセン
※コメント行があると通りません

    Pod::Spec.new do |s|
      s.name         = "REKit"
      s.version      = "1.0.0"
      s.summary      = "Collection of NSObject extensions."
      s.homepage     = "https://github.com/dictav/REKit"
      s.license      = { :type => 'MIT', :file => 'LICENSE' }
      s.author       = { "Shintaro Abe" => "dictav@gmail.com" }
      s.source       = { :git => "https://github.com/dictav/REKit.git", :tag => "1.0.0" }
      s.source_files = 'REKit', 'REKit/**/*.{h,m}'
    end

できたらlintする

    $pod spec lint REKit.podspec

オーケーなら Specs のマスターに入れる。（他に方法あるかも）

    $mkdir ~/.cocoapods/master/REKit/1.0.0
    $mv REKit.podspec ~/.cocoapods/master/REKit/1.0.0

準備完了

# Podfileの作成

    platform :iOS
    pod 'REKit'

こんなのを作って

    $ pod install

で上手くインストールできました。

    [_myButton respondsToSelector:@selector(didButtonTouch:) withKey:@"key" usingBlock:^(id reciever){
        NSLog(@"Button Touched: %@", receiver);
    }];
    [_myButton addTarget:_myButton action:@selector(didButtonTouch:) forControlEvents:UIControlEventTouchUpInside];

# CocoaPods/Specs に登録する
今のままだと自分のローカルの環境でしか使えません。ぼくは作者の方ではないので勝手な事はしませんが、広くみんなに使ってもらうためには [CocoaPods/Specs](https://github.com/CocoaPods/Specs) に登録されると嬉しいなあ。

登録するにはフォークしてファイルを追加して pull-request 送ると良いらしいです。

# 使ってみた感想
面白いです。
ぼくは UIButton のアウトレットに処理を追加するようにしてみましたが感覚としてはすごく好きです。特にボタンが沢山ある場合などは分かりやすいコードが書けそうです。
UIControl に addActionForControlEvents:usingBlock: みたいなメソッドを生やしても良いかもしれません。
また、モックやスタブで真価を発揮しそうなので次はそちらで使ってみようと思います。
