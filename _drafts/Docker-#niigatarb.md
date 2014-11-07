---
layout: post
title: Dockerはじめだけていねいに #niigatarb
published: false
tags: niigatarb meetup
---

今日は Niigata.rb meetup だったので [Docker](http://www.docker.com/) でruby web アプリケーションを動作させてみました。
ぼくは [Heroku](http://www.heroku.com/) が好きなので、

    Herokuみたいに簡単にDockerを使いたい！

ということで今回は [boot2docker](http://boot2docker.io) と [building](https://github.com/CenturyLinkLabs/building) を使います。

## ぼくの理解しているDocker
Linux上での Docker はすごい chroot を使った軽量仮想環境だと思っている。
普通の仮想環境がホストOS環境に依存しないのに対して、軽量仮想環境ではホスト環境への依存は少なからずあり、例えば全く異なるOSを動かすというようなことはできない。

Mac 上の Docker は VirtualBox 上に作ったコンテナを乗っける専用の仮想環境(Linux)を作るので普通に仮想環境。
VirtualBox+boot2docker+dockerの組み合わせが良くできていて、軽量仮想環境な気分を存分に味わえる感じ。



Docker には [FreeBSD のポートが存在していて](https://github.com/kzys/docker/tree/execdriver-jail)、これがうまく動くようになれば「VirtualBox上にFreeBSD立ち上げてDockerコマンドで jail 作る」なんてことができるみたいで、ワクワクする。
Solarisのzoneなんかも動かせそうだし、そうなるとDockerはLinuxの世界にとらわれないアプリケーションになりそうだ。
Macにもsandboxという物があるからこれがjail並みになってくれればDockerでMac(darwin)コンテナ動かすとか、それもまた楽しそう:)

## CenturyLInkLabs/building

> A simple dev tool CLI for building Docker containers for any app using Heroku Buildpacks

Docker では [Docker Hub]() からイメージをダウンロードして

## まとめ
building はすばらしく簡単にWebアプリを立ち上げることができて良い。
ただ、rubyなどは何度もbuildpackを再構築するようで、毎回 ruby のコンパイルが必要になるためかリリースまでとても時間がかかる。
この辺は Dokku などはどうなのか調べてみる必要がありそうだ。
