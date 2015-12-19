---
layout: post
title: SLRequest で Facebook のFeedを得る
date: 2012-10-12 07:55:00 GMT
tags: ios slrequest facebook
---
iOS6 になってから OS に Facebook が組み込まれ、Safari などからも投稿できるようになった。
開発者視点で見ると Social.framework 追加され、Facebookへのアクセスが Apple 提供の API を通して利用できるようになった。

サンプルコード
<script src="https://gist.github.com/3877796.js?file=gistfile1.m" type="text/javascript"></script>


## 注意
Facebook へアプリを登録する際はネイティブiOSアプリを選択し、Bundle ID を自分のアプリに合わせて設定する。

また詳細設定は以下のようにする。
![](http://media.tumblr.com/tumblr_mbrs2rX2sb1qzpfj2.png)
