---
layout: post
title: "Swift AC #14 - Optional"
date: 2014-12-15
tags:
---

友人の結婚式に出席してきたんですが、同年代というのは面白いですね。ロックマンの死ぬシーンで「トゥイントゥイン」言って盛り上がれるのなんてぼくらの年代くらいじゃないですか？

## Optional
 Swift は変数にnilを入れることを許容しません。

```swift
var str:String = nil // compile error
```

nil を扱いたい場合は Optional 型を使います。Optional は Enumration で定義されています。

```swift
enum Optional<T> : Reflectable, NilLiteralConvertible {
    case None
    case Some(T)
}
```

この Optional で型を wrap することで `nil` を扱うことができます。というか、Swift の nil は Optional<T>.None です。これで、ヌルポで悲しい思いをすることも格段に減らすことができます。

```swift
var str: Optional<String> = nil
switch str {
case .None:
    println("nil")
case let .Some(a):
    println(a)
}
// "nil"
```

Optional には別の記方として `?` を使った書き方があります。`Optional<T>` は冗長なので通常はこちらを使います。

```swift
var str: String? = nil
```

### Unwrap

Optional<String> 型と String 型は全くの違うものなので、String 型のメソッドを呼び出すことはできません。

```swift
var str: String? = "hello"
str.hasPrefix("hell")  // compile error
```

case 文を使って取り出しても良いのですが、Swift には `if` と `let` を組み合わせることでもっと簡単に Optional 型を Unwrap することができます。

```swift
var str: String? = "hello"
if let s = str {
  s.hasPrefix("hell")  // true
}
```

`if let` は Optional 型が .None でない時に処理を実行するものですが、強制的に Unwrap することもできます。

```swift
var str: String? = "hello"
str!.hasPrefix("hell")  // true
```

Optional型で受け取るけど .Some であることが自明である場合に使うのが良いと思います。もし、誤って .None であった場合には runtime error になります。
ぼくは .None だと後の処理ができない場合などにあえて `!` を付けて runtime error を発生させたい場合などにも使います。デバッグに良いかと思います。

### Optional Chaining
Optionalは連鎖させることができます。Optional型をUnwrapしてさらにそのpropertyがOptional型だった、さらにさらに．．．のような場合、`!` で切り抜けるのは絶望的ですし、かといって `if let` で Unwrap し続けるのは心が折れます。


```swift
class A { var b:B? = B() }
class B { var c:C? = C() }
class C { var d:D? = D() }
class D { var e:String? = "E!" }

let a:A? = A()
if let b = a?.b {
    if let c = b.c {
        if let d = c.d {
            if let e = d.e {
                println(e)
            }
        }
    }
}
// "E!"
```

そこで `?` を使って Optional 型を連鎖させる方法があります。
以下は a, b, c, d の順に評価していき、.None であった場合にはそこで .None を返して処理を中断します。
例えば c が .None であった場合には d, e は評価されず、左辺の e 変数に .None が代入されます。

```swift
var a : A?
if let e = a?.b?.c?.d?.e {
    println(e)
} else {
    println("nil")
}
// "E!"
```

## まとめ

そもそも、`nil` が入り込むようなコードにしなければ良いと思うんですが、*Cocoa* は結構 `nil` を返すんですよね。。。
