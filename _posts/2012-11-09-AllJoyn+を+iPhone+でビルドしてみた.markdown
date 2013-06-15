---
layout: post
title: AllJoyn を iPhone でビルドしてみた
date: 2012-11-09 08:37:55 GMT
tags: 
---
![](http://media.tumblr.com/tumblr_md7njnHro31qzpfj2.png)

[@saisa6153][] が [AllJoyn][] を iPhone で使ったみたいというのでビルドしてみた。

## Regist
[AllJoyn][] は iOS/Mac/Android/Windows 向けに SDK を配布しており、これをダウンロードするためにはユーザ登録が必要

## ダウンロード
[AllJoyn][] からSDKをダウンロードする。
ビルドするには OpenSSL が必要になるのでこれもダウンロード＆ビルド。

1. <http://www.openssl.org/source/>
2. <https://github.com/sqlcipher/openssl-xcode>

1と2を展開して、2のopenssl.xcodeprojを1に入れてXcodeでビルドするのが簡単かな。

## サンプルを動かす
![](http://media.tumblr.com/tumblr_md7njnHro31qzpfj2.png)

$ALLJOYN_SDK/alljoyn_objc/samples/iOS/AllJoynChat を動かしてみると面白い。
iPhone Simulator と iPhone 実機にインストールして同じネットワーク上にあれば問題なく通信できる。


### ビルドのやり方
$ALLJOYN_SDK/AllJoyn Programming Guide for the Objective-C Language.pdf に事細かに書いてあるのでそれを参照．．．ではうまく動かなかったのでぼくのやり方を掲載。

サンンプルはPDFの通りに設定してあるので、それで動かなかった場合は以下のようにすると動くかもしれない。

#### Header Search Path の設定
$ALLJOYN_SDK/alljoyn_core/build/darwin/armv7/iphoneos/debug/dist/inc
辺りにヘッダーファイル一式がある。PDFだと環境やビルド先別にパスを設定しているのだけど、「ヘッダーファイルなんて全部一緒でしょ？」ということで括りだしてパスを通しやすいところにおいてそれを指定している。

#### Other Link Flags と Library Search Path は設定しない
$ALLJOYN_SDK/alljoyn_core/build/darwin/armv7/iphoneos/debug/dist/lib
辺りにリンクするファイルがあるのでこれをプロジェクトに追加する。さらに作成した libcrypto.a と libssl.a も追加する。シミュレータで動かす場合はシミュレータのもの、デバイスで動かす場合はデバイスに対応した物を追加する。

  iPhone はモデルによってアーキテクチャが異なる。
  iPhone3GS / 4 / 4S は armv7。iPhone5はarmv7s と少しややこしい。lipo コマンドでまとめると良い。

Library Search Path はプロジェクトに追加した時に自動で設定されるので触らない。

#### C++ Standard Library の設定
![](http://media.tumblr.com/tumblr_md7onelbhZ1qzpfj2.png)

PDFには載ってなかったと思うのだけど C++ Standard Library を Compiler Default にする必要がある。

## まとめ
AllJoyn のことは正直ぜんぜん分かってないので、[@saisa6153][] の続報を期待する。
[After Coding](http://saisa.hateblo.jp)

[@saisa6153]: http://twitter.com/saisa6153
[AllJoyn]: https://www.alljoyn.org
