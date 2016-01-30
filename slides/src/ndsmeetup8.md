class: center middle

<style>
.hoge img {
width: 200px;
height: 200px;
}
</style>

JavaScript 今昔物語
====================

2015.11.14 Sat. NDS meetup 8 - JavaScript Day! -

.right[@dictav]
.center[powered by remarkjs (gnab/remark)]

---

remarkjs が思いの外素晴らしかった
================================

* HTML + CSS + Markdown だけで作れる
* Gist + GistDeck で公開できる
* Github Pages で公開できる
* 好みで Jekyll との組み合わせも簡単！
* [markdown + remark.js + gh-pages でプレゼン資料を公開する](http://qiita.com/harasou/items/1fa3cca6ac1ef175c876)

---

.left-column[

自己紹介

* dictav (Github/Twitter/Facebook)

* 34歳、新婚ほやほや（2015/09/15 入籍)

* モバイルプログラマ
    * iOS がメインターゲット
    * 時々 Android も触る程度には
    * tvOS/watchOS も触りたい
    * 仕事で Swift/Objective-C/ .small[Java(Android)]
    * 趣味で Go/Ruby/JavaScript
]

.right-column.hoge[
![](https://pbs.twimg.com/profile_images/443322643479924738/8LHmA5Ux.jpeg)
]

---
class: center middle

来月から東京へ行くことになりました
=================================

--

**単身でね**
========

---
---

class: center middle

JavaScript 今昔物語
====================

---
class: center middle

今は昔、Netscape Navigator というブラウザありけり
==============================================

---
class: center middle

![](http://www.guidebookgallery.org/pics/splashes/netscape/4.04-communicator.png)
http://www.guidebookgallery.org/splashes/netscape

---
class: center middle

ブラウザが有料だった時代
========================

* [Netscape Navigator 3.0日本語版発売 - PC Watch](http://pc.watch.impress.co.jp/docs/article/961105/netscape.htm)

--

* 1990年代前半の絶対王者

--

* 驚異の90%シェア

--

* **1995年にJavaScriptを登場** 

--

* 1996年 Netscape Navigator 2.0 でリリース

---

Internet Explorer
================

* 1995年に Windows95用に公開された

--

* 1996年に Internet Explorer 3.0 と共に JScript をリリース
* 先行していた JavaScript と互換性なく人気は薄かった

---


ブラウザ戦争
=======

--

* Netscape Navigator VS. Internet Explorer

--

* NN と IE の機能追加合戦
    * マルチメディア
    * Flash
    * ActiveX
    * etc...

--

* Internet Explorer が OS に標準搭載されることで終止符
    * 当時、 Windows95 は圧倒的なシェアを誇った

--

* 様々な技術が開発された

---

DOM (Document Object Model)
===========================

* 1998年10月W3C によって勧告された
    * `getElementById()` など
* Internet Explorer の DOM を踏襲している
* HTML要素へのアクセスAPIが定められた

---

DHTML
=====

* すごいダイナミックなHTML

--

    * 文字を動かせた！
    * 文字の色を変えれた！
    * 画像を動かせた！
* 当時は特定のブラウザ専用に書いていた
* DOM の標準化によりブラウザを問わずひとつの記述で書けるようになった
* ブラウザでゲームを作る猛者もいた

---


XMLHttpRequest
=====

* 1999年のInternet Explorer 5が初出
* 2001年に Mozilla、2004年に Apple がそれぞれ実装
    * Apple Safari のリリースは 2003年

--

* 2005年の Google Maps の登場と Ajax の名前で一躍有名に

---

標準化へ
=======

* [W3C (World Wide Web Consortium)](http://www.w3.org)
* [Ecma International](http://www.ecma-international.org)
* [WHATWG (Web Hypertext Application Technology Working Group)](https://whatwg.org)

※ECMA はかつて European Computer Manufacturers Association の略だったが、今は世界の標準化団体なので単に名称として使われており、Ecma と小文字で書くのが正式

--

* 1999年12月に ECMAScript3 が公開された

---

JavaScript2.0
=============

* 次世代 JavaScript の提案

--

* 1回目 2000年-2003年頃
* 旧Netscape と Microsoft の意見がまとまらず打ち切り
  * 旧Netscape のアイデア => ActionScript
  * Microsoft のアイデア => JScript 

---

JavaScript2.0
=============

* 2回目 2007年-2008年頃
* Microsoft, Yahoo! の保守派の ECMAScript 3.1
* Adobe, Mozilla, Opera, Google の改革派の ECMAScript 4
    * Python のような文法の提案まであった

--

* 2008/08/18 [JavaScript 2.0はECMAScript 3.1ベースに、ECMAScript 4は譲歩 - MyNavi](http://news.mynavi.jp/news/2008/08/18/027/)
* 野心的な ECMAScript4 は廃止された
* ECMAScript Harmony が発足

---

JavaScript の非互換性
=====================

* 2000年以降、多くのメジャーブラウザが生まれた
    * FireFox (2002年9月23日)
    * Safari ( 2003年1月7日 )
    * Opera (2008年9月2日)

--

* 各ブラウザ間の非互換性はとにかく酷かった
* 互換性を吸収するようなライブラリが多く生まれた
    * Prototype (2005年2月リリース)
    * MooTools (2006年9月リリース)
    * jQuery (2006年1月リリース)
    * YUI (2005年リリース）
    * Dojo Toolkit (2004年リリース）
* [Comparison of JavaScript frameworks](https://en.wikipedia.org/wiki/Comparison_of_JavaScript_frameworks)

---

ECMAScript 5th edition
=====================

* 2009年12月15日、10年ぶりのアップデート
* [ECMAScript 5 compatibility table](http://kangax.github.io/compat-table/es5/)
* 現在はほとんどの主要ブラウザが対応している
* 最も一般的に使用されているバージョン
* たくさんのフレームワークが作られた
    * AngularJS (2009年リリース)
    * Backbone.js (2010年リリース)
    * KnockoutJS (2010年リリース)
    * React (2013年リリース)

--

* Android/iOS の台頭によりモバイルアプリフレームワークも作られた
    * Titanium Mobile
    * Cordova/PhoneGap
    * Ionic (Cordova)

---

ECMAScript 6th edition
======================

* 2015年6月17日公開
* [ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/)
* クラス、モジュール、アロー関数、Promise など多数の変更
* 現在、最も対応状況が進んでいる Edge13 でも 84%
* [Babel](https://babeljs.io) を使うのが一般的
* さっそく作られているフレームワーク
    * aurelia
    * AngularJS 2.0

--

* すでに ECMAScript7 の策定は進められている
* [ECMAScript 7 compatibility table](http://kangax.github.io/compat-table/es7/)

---

まとめ
=====

* 仕様策定に政治はつきもの

--

* 仕様策定の流れができた？ECMAScript7 もそう遠くない？

--

* ブラウザとJavaScriptはまだまだ進化します
* 恐れず、嫌がらず、どんどん新しい技術に触れていきましょう
