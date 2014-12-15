---
layout: post
title: "Swift AC #12 - Tuples"
date: 2014-12-15
tags:
---

最近 [Rocket](https://github.com/coreos/rocket) の存在を知りました。Rocket は Docker のような Application Container です。Docker がどんどん肥大化し、Platform へと変化していることを受けて CoreOS が独自にアプリケーションコンテナを開発することを決めたみたいですね。Dockerのサポートは続けるようです。https://coreos.com/blog/rocket/

## Tuples
Swift には Tuples があります。

> “Tuples group multiple values into a single compound value. ”
>
> Excerpt From: Apple Inc. “The Swift Programming Language.” iBooks. https://itun.es/jp/jEUH0.l

```swift
// Excerpt From: Apple Inc. “The Swift Programming Language”。 iBooks. https://itun.es/jp/jEUH0.l

let http404Error = (404, "Not Found")
// http404Error is of type (Int, String), and equals (404, "Not Found")
```


Swiftの Tuple には添え字を使うことができます。
Structure みたい。

``` swift
// swift
var error : (code:Int, message:String)
error = (404, "Not Found")
error.code    // 404
error.message // "Not Found"
```

添え字をつけなかった場合は数字で参照できます。

``` swift
var error = (404, "Not Found")
error.0    // 404
error.1    // "Not Found"
```

### Functions

Functions の戻り値は全て Tuple です。`() -> Void` という表記は `() -> ()` と読み替えることができます。戻り値は *空のTuple* です。
なので、以下は文法エラーにはなりません。warningは出ます。

```swift
func returnVoid() -> Void {
  "hi"
}

let rtn = returnVoid() // (0 elements)
```

さて、では引数はどうでしょうか？

```swift
func f(a:Int, b:Int) -> Int {
    return a+b
}

let arg = (1,2)
f(arg) // 3
```

なるほど、関数は Tuple を受け渡しするもののようです。

### 比較

Tuples を比較したいこともあると思いますが、残念ながら普通にはできません。

```swift
let a = (1,2)
let b = (1,2)
if a == b {  // compile error
  println("same")
}
```

`Equatable` を定義してやる必要があります。

```swift
func ==(lhs: (Int,Int), rhs:(Int,Int)) -> Bool {
    return lhs.0 == rhs.0 && lhs.1 == rhs.1
}

if b == a {
    println("same")
}
// "same"
```

`Comparable` なんかも定義してやればでますが、まあ普通は Structures 使いますよね。

Tuples は一時的に使うものかなーという気がします。例えばある scope の中で座標を評価して処理を振り分けたいなどの時に使うと良いのかな。

```swift
let point = (1,2)
switch point {
case (0,0):
    println("the origin")
case let (x,y) where x < 3 && y < 3:
    println("x: \(x), y: \(y)")
default:
    println("out of bounds")
}
// "x: 1, y: 2"
```

Swift の `switch` 文は `where` が使えたりしてなかなか便利です。

