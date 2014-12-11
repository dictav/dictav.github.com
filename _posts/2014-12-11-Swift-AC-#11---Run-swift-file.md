---
layout: post
title: "Swift AC #11 - Run swift file"
date: 2014-12-11
tags: swift
---

## Run swift file

Xcode6 からだったかな？ `/usr/bin/swift` コマンドが追加され、`xcrun swift` とかしなくてよくなりました。(あ、Yosemite以前は違うかも)

そんなわけで `swift hello.swift` とすれば実行できてしまうわけです。

```
//hello.swift
println("hello")
```

もちろん、shebang (#!) での実行も可能です。

```
#! /usr/bin/env swift
println("hello")
```

めでたしめでたし、と思っていたのですが、なんか出力が変です。

## Printable

Swift には Printable protocol というのがありまして、これを実装すると `println` などのコマンドで良きに足らってくれます。

> 正確に言うと Streamable, Printable, DebugPrintable の順番で実装状況を調べてくれて、実装してあるものを出力に利用してくれるみたい

ということで [Apple のサンプル](https://developer.apple.com/library/ios/documentation/General/Reference/SwiftStandardLibraryReference/Printable.html) をパクって実装してみます。

```
#! /usr/bin/env swift
struct MyType: Printable {
    var name = "Untitled"
    var description: String {
        return "MyType: \(name)"
    }
}
 
let value = MyType()
println("Created a \(value)")
// prints "Created a MyType: Untitled
```
実行結果は

> Created a main.MyType

なぜ。。。
これは Playground でも似たような結果になります。Playgroundって LLDB なんだなーって分かります。

> Created a __lldb_expr_99.MyType
> # ちなみに、`lldb --repl` とすると swift の REPL が走ります :)

Xcode でプロジェクト作って実行するとこうはならないので、なんでかなーと考えているんですがわかりません。
とりあえず思ったような出力にしたいので script を書きました。

```
#! /bin/sh
if [ $# -ne 1 ]; then
  echo 'Usage: run <swift_file>'
  exit
fi
lib=/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/swift_static/macosx
swift -frontend -c -o a.o $1 
clang -L$lib -lswiftRuntime -lc++ -framework Foundation a.o
a.out

rm *.o
rm a.out
```

`clang` で実行ファイル作るとできるとか微妙だなー
