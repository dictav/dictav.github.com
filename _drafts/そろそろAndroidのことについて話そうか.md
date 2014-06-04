---
layout: post
title: そろそろAndroidのことについて話そうか
date: 2014-05-28
tags:
---

1ヶ月くらいAndroidアプリの開発をやっているのでそろそろまとめておこうと思います。

# 導入
* AndroidStudio
	* InteliJ IDEA
* Intel Hardware Accelerated Execution Manage (Intel HAXM) https://software.intel.com/en-us/android/articles/speeding-up-the-android-emulator-on-intel-architecture

# 開発
## kotlin

* クセの強い言語
* Javaコードのコピペが動かない

## Javaという言語への所感

久しぶりにJavaを使って、というかむしろIDE経由でJavaを触るのは初めてくらいなので所感を。

* IDEの文化が素晴らしい
* コードを解析できるのはいいね
* しっかりしている
* なんでもある
* getter/setter めんどくさい

### InteliJ IDEA 所感

* RubyMineなども触っているのだけど、InteliJ IDEA はすごく良いと思う。
* Idea Vim すごいデキが良くてびっくり
* VisualStudio/Xcodeに比べてUIが微妙
* TODOは地味に便利だからXcodeにも入れよう

## AndroidAnnotations

* onCreate 書かなくても良い
* @ViewById でインスタンス変数とidを結びつけられるのは良い
* @Background で
* MainActivity_ を読んで勉強できる
    * Activityの参照が全て _ 付きになるのはちょっと嫌だね

## lombok

* getter/setterをソースから消したい

## Test
いくらか動くようになってくるとテストがしたくなります。
### Espresso

* KIFとUI Automationの間くらいかな
* Simple
* ドキュメントを漁りにくい


