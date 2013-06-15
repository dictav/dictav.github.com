---
layout: post
title: WordPressを始めました
date: 2013-01-08 09:21:00 GMT
tags: 
---
# WordPressを始めました
お仕事で WordPress を触っています。
全くプログラミングが出来ない人でも導入できる WordPress はやはりすごい。
いろんなプラグインが開発されていて素晴らしい。
自分で０から作る気なんてなくなってしまうな。

# jQuery UI 1.9 の罠
WordPress 初心者のぼくに辛かったのは、普通にインストールした plugin が使えなかった事。

    no such method 'rotate'...

なんだよ、それ。
なんで自分でコード書いていないのにエラー吐かれなきゃいけないんだ。

もくもくと探していると [jQuery UI 1.9 Upgrade Guide](http://jqueryui.com/upgrade-guide/1.9/#removed-rotate-method) なるものに遭遇。どうやら rotate メソッドは廃止されたようです。 そんで、[これ](https://github.com/cmcculloh/jQuery-UI-Tabs-Rotate) 使えと。

導入して問題は無事解決。めでたし。
