mruby を iPhone で動かないかなーとビルドしてみているのだけど、うまくいかないメモ

## mruby 入手
[ここ](https://github.com/mruby/mruby) から入手する。

	$ git clone https://github.com/mruby/mruby.git

## iOS Simulator 向けにビルド
iOS Simulator では x86\_64 向けのバイナリはリンクできないので i386 で作成する（ぼくの環境依存かも）。

	$ make CC="clang -arch i386" LL="clang -arch i386"

ARM向けにもビルドする場合は i386 の mrbc と libmruby.a をよけておく。

	$ cp bin/mrbc bin/mrbc.i386
	$ cp lib/libmruby.a lib/libmruby.i386.a

## ARM （実機）向けにビルド
iPhone 実機で動かすためには ARM 向けにビルドする。

	$ make clean
	$ make \
		CC="clang -arch armv7 -I /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS5.1.sdk/usr/include" \
		LL="clang -arch armv7"

mrbc の中にエラーで止まるので、先に作った i386 向けの mrbc をコピーして再度 make。		

	$ cp bin/mrbc.i386 bin/mrbc
	$ make

## まとめ
シミュレーター向けは普通に動いている。

<img src="https://p.twimg.com/Au2svf9CEAMx6DC.jpg">

実機向けはエラーで止まる。パースで失敗しているっぽい。ソース見るかな。

	Thread 0 Crashed:
	0   MRubyTest                     	0x00044526 parser_yylex (.parse.y:108)
	1   MRubyTest                     	0x0004238e yyparse (.parse.y:4634)
	2   MRubyTest                     	0x0004403e mrb_parser_parse (.parse.y:4656)
	3   MRubyTest                     	0x00044162 mrb_parse_string (.parse.y:4754)

