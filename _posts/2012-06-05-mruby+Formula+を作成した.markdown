---
layout: post
title: mruby Formula を作成した
date: 2012-06-05 07:30:00 GMT
tags: 
---
[mruby][] のコンパイルはとても簡単で、make コマンド一発なんだけど、[homebrew][] で管理したかったので Formula を作成した。

## Formula の作り方
まず Formula 化したいソースの URL を調べる。ここではは http://example.com/hoge-1.0.tar.gz とする。
この URL を引数にbrew create コマンドをでひな形を作る。
	$ brew create http://example.com/hoge-1.0.tar.gz

/usr/local/Library/Formula の中に hoge.rb ファイルができる。
	$ brew edit hoge

version を追加し、install が実装してあればとりあえず動く。
md5 はあった方が良いが、なくても良い。
配布元のファイルが毎日更新されている様な mruby の場合はない方がいいか。
開発がもうちょっと安定したら追加しよう。

<http://github.com/dictav/homebrew-dictav>


## Formula を配布する
作成した Formula は自分だけで使わずに公開しよう。[GitHub][] に公開すれば brew コマンドから簡単にインストールできる。
公開のやり方は簡単で、homebrew-hugahuga というリポジトリを作成し、作った Formula ファイルを push するだけだ。
あとは、以下の様なやり方で brew からインストールできる。

	$ brew tap dictav/hugahuga
	$ brew install mruby

もちろん、作り込んで本家に pull リクエストを投げるのも良いと思うけど、今回はごくごくミニマムに。

## mruby を利用する
mruby の関連ファイルは /usr/local/{bin,include,lib} にインストールされるようにした。
mruby にはツールとして mruby, mirb, mrbc が付属している。


## C 言語に組み込む
mruby は C などの他の言語に組み込んで使う事ができる。その使いかは以下のようになる。
<script src="https://gist.github.com/620095.js?file=mruby_compile_sample.c"></script>


[mruby]: http://www.mruby.org/
[homebrew]: http://mxcl.github.com/homebrew/ "homebrew"
[GitHub]: http://github.com/

