---
layout: post
title: Object 対応の switch を考える
date: 2012-10-24 01:10:00 GMT
tags: objective-c ios
---
NSString を switch 文で評価したいことはままあるのでどんな形が良いのか考えてみた。
NSDictionary のリテラルとBlocks使うとそれっぽく書けるんじゃないかと思って書いてみた。

<script src="https://gist.github.com/3877796.js?file=NSObject%2Bswitch.h"></script>

<script src="https://gist.github.com/3877796.js?file=NSObject%2Bswitch.m"></script>

<script src="https://gist.github.com/3877796.js?file=hot_to_switch.m"></script>
まあまあ、気に入った。
エラー処理もしていないし遅そうだなあ。
