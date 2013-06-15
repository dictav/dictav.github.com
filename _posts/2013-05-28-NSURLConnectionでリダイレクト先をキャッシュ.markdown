---
layout: post
title: NSURLConnectionでリダイレクト先をキャッシュ
date: 2013-05-28 06:17:18 GMT
tags: 
---
# その前に=Blog にGist を貼付ける=

Blog にGistを貼付けるにはGistのURLの最後に.jsを付けてscriptタグで読み込めばオーケー。

    <script src="https://gist.github.com/dictav/3877796.js?file=how_to_cache_redirect_url.mm"></script>


## 一部

Gistに複数のファイルを登録している時はどうするか？
file=を付けて読み出せばオーケー。

    <script src="https://gist.github.com/dictav/3877796.js?file=how_to_cache_redirect_url.mm"></script>



# NSURLConnectionでリダイレクト先をキャッシュ

NSURLConnectionでキャッシュしたいんだけどリダイレクト先のURLは分からないよ！ということがあります。
`https://graph.facebook.com/dictav/picture`
などが良い例です。

そんな時は NSURLCache を使って自分でキャッシュします。
sendする前に判定式でも入れれば無駄な読み込みはないですね。
ちなみに、NSURLRequestReloadIgnoringLocalCacheData を使っている理由はリダイレクト時のリクエストとオリジナルのリクエスト、両方でキャッシュしちゃうと無駄かなーと思ったからです。


<script src="https://gist.github.com/dictav/3877796.js?file=how_to_cache_redirect_url.mm"></script>

