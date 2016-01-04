TestFlight を試してみる

iOS の開発において実機でテストするのはとても大事でとても面倒です。
というのも、普通にやると１台１台をMacに繋いでアプリをインストールする必要があるからです。これでは自分の端末でしかテストができません。
これを解消するために AdHoc でのアプリの配布という方法があります。プロヴィジョニングファイルを作ってアプリを作り、相手にアプリを配布してインストールしてもらう方法です。
これを使えば遠方の協力者（テスター）にファイルを送ってテストしてもらうことができるます。
しかし、PCの操作に不慣れな人にお願いする場合などはやはり困難がつきまといます。

# TestFlight
この AdHoc の配布を簡略化し、管理できるようにした素晴らしいツールが TestFlight です。１度設定してしまえばアプリをアップロードするだけで全てのテスターにメールで通知してくれます。テスターはメールの中のリンクをクリックするだけでアプリをダウンロードし、テストする事が出来ます。

## アカウントの作成
[https://testflightapp.com]() からアカウントを作成します。

アカウントを作成しログインすると次のような画面がでます。

![](http://media.tumblr.com/90acd10b619e6c3fabcf2cd0aa647855/tumblr_inline_mganfy2e391qzpfj2.png)

1. Team を作る
2. アプリをアップロード
3. テスターを招待する

実に簡単です。 1 もチーム名を決めるだけです。
チームは上部のツールバー「People」で管理できます。

## アプリのアップロード
アプリのアップロード方法は３つあります。

- Webでアップロード
- The TestFlight Desktop App ([download](https://testflightapp.com/desktop/))
- Upload API

Web を使ったアップロードはブラウザ経由で出来ます。

Desktopアプリは Mac のメニューバーに常駐するタイプのアプリです。ウィンドウにD&Dでアップロードできてこれだけでも便利ですが、Xcode でアプリを Archive すると自動で立ち上がってアップロードするか聞いてくれます。
ぜひ使いましょう。

開発を自動化するなら Upload API ([doc](https://testflightapp.com/api/doc/)) がおススメです。
詳細は省きますが、curl などのコマンドを使ってアプリをアップロードできます。

    curl http://testflightapp.com/api/builds.json 
        -F file=@testflightapp.ipa
        -F dsym=@testflightapp.app.dSYM.zip
        -F api_token='your_api_token' 
        -F team_token='your_team_token' 
        -F notes='This build was uploaded via the upload API' 
        -F notify=True 
        -F distribution_lists='Internal, QA'

# まとめ
TestFlight の使い方を簡単に説明しました。
１人で開発している場合でも、複数の端末にコピーする手間を大幅に簡略化できます。
ぜひ使いましょう。

ぼくのアプリをテストしてくれるテスター募集中です！

