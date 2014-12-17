---
layout: post
title: "Swift AC #17 - Operators"
date: 2014-12-17
tags: swift operator
---

英語から日本語への翻訳ってどうやってやっているんでしょうね。
機械学習が普通なんでしょうか？
各言語を変換するための中間言語みたいなのを作ってそこにコンバートするような仕組みが翻訳にもできたら面白いなあなんて思います。
文脈から感情などのパラメーターを付与したり、話している人の声色から感情を読み取ってパラメーターにしたりとか。

## Operators

Swift には 48 個の Operators が定義されているようです。
Operators は left/right どちらのインスタンスに作用するか分類があるようです。

* infix
* prefix
* postfix

一覧を見てみます。

```swift
infix operator ~>
infix operator +=
infix operator ...
infix operator -=
infix operator &%
infix operator /=
infix operator &&
infix operator &*
infix operator &+
infix operator &-
infix operator &/
infix operator ===
infix operator ..<
infix operator ==
infix operator ^=
infix operator ??
infix operator ^
infix operator |
infix operator &=
infix operator %
infix operator &
infix operator *=
infix operator *
infix operator <
infix operator +
infix operator >>
infix operator -
infix operator /
infix operator <<=
infix operator ~=
infix operator >=
infix operator ||
infix operator <<
infix operator >>=
infix operator |=
infix operator !==
infix operator %=
infix operator !=
infix operator >
infix operator <=
prefix operator -
prefix operator ~
prefix operator --
prefix operator ++
prefix operator +
prefix operator !
postfix operator ++
postfix operator --
```

なんとなく分かりますか？
infix の `+` Operator を1つ取り上げてみます。

```swift
infix operator + {
    associativity left
    precedence 140
}

func +(lhs: Int, rhs: Int) -> Int
```

Operator の定義には２つのプロセスが必要です。

1. `[infix|prefix|postfix] operator` 指示子を使って宣言する
2. `func` 指示子で実装する。第一引数(lhs)が左辺で、第二引数(rhs)が右辺

`operator` 指示子には以下の３つを宣言できます。んですが、`associativity` が何なのかよく分かりませんでした。

* associativity *[left|right|none]*: ??? 
* precedence *[0 - 255]*: 優先度
* assignment: 値の変更


あと書いててきづいたんですが、


```swift
let a =1
```

これって compile error なんですね。 `prefix operator =` として理解されるようで、`=` は予約されているので使っちゃダメみたいです。

### 新しい Operator を作ってみる

優先度が足し算より弱い掛け算を作ってみます。
`+` opertor は precedence 140 なので 130 で作ります。


```swift
infix operator ++++ {
    associativity left 
    precedence 130
}

func ++++(x:Int, y:Int) -> Int {
    return x * y
}

var a = 1 + 2 * 3
var z = 1 + 2 ++++ 3
// a = 7, z = 9
```

### Functional Operator

もうちょっと便利なものを作ってみます。
と言っても、ネットを徘徊してたら見つけたものです。

```swift
// https://github.com/behrang/yaml.swift/blob/master/Operators.swift
infix operator |> { associativity left }
func |> <T, U> (x: T, f: T -> U) -> U {
    return f(x)
}
```

なんだから分かりますか？
右辺の型 `T -> U` なので T を受け取って U を返す Function です。
これを使えば Function を自然な形で繋げることができます。

```swift
"hello" |> print // "hello"
```

せっかくなのでいろいろ繋げてみます。

* `say` は String x をa回 `println` し、引数をそのまま返します。
* `shift` は String x を a 文字シフトさせ [Character] にして返します。
* `concat` は受け取った [Character] を String にして返します。

```swift
func say(x: String, a:Int) -> (String,Int) {
    for _ in 1...a {
        println(x)
    }
    return (x,a)
}

func shift(x: String, a: Int) -> [Character] {
    let arr = Array(x.utf8)
    var r = arr.map{ Character(UnicodeScalar($0+a)) }
    return  r
}

func concat(x: [Character]) -> String{
    return String(x)
}


("hoge", 5)
    |> say
    |> shift
    |> concat
    |> print

// hoge
// hoge
// hoge
// hoge
// hoge
// mtlj
```

なんか違う言語使ってるみたいでおもしろいでしょ？
