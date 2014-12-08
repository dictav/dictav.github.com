---
layout: post
title: Swift AC #7 - Type Identity
date: 2014-12-07
tags: swift type identity
---

スマブラ買いました。新潟スマブラNightをやりたいので、興味ありそうな人に声をかけさせていただくかと思いますのでよろしくお願いします。

## Type Identity

```
if a == b {
  println("Same")
}
```

２つのオブジェクトが **同じもの** どうかを調べるのは簡単なことのようで難しいです。class のような reference タイプであれば __参照先が同じ__ であることと __２つのオブジェクトが同じ状態にある__ という２通りの意味を考えることができます。

## ===, !==

２つのオブジェクトが同じものを参照しているかどうかは `===` と `!==` を使ってしらべることができます。Class に対して使われますが Struct に対しては使えません。Structは reference ではないですからね。

## NSObject での同一性

Objective-C では Root クラスとして NSObject が存在します。NSObject では `- (BOOL)isEqual:(id)object` というメソッドが定義されており、オブジェクトの同一性を定義します。また、`-(NSComparisonResult)compare:` メソッドを定義すれば sort などの際に使われます。 Swift で NSObject のサブクラスを作成する場合、当然この流儀に合わせなければいけません。具体的には iOS/Mac アプリを開発している場合は意識する必要があります。

```
class MyObject : NSObject {
    override func isEqual(object: AnyObject?) -> Bool {
        return true
    }
}
class MyObject2: NSObject {
    
}

let o1 = MyObject()
let o2 = MyObject2()
o1 == o2 // => true
o2 == o1 // => false
```

この他にも `hash` property にも注意する必要があり、[Cocoa Core Competencies](https://developer.apple.com/library/mac/documentation/General/Conceptual/DevPedia-CocoaCore/ObjectComparison.html) には以下のように書いてあります。

> If isEqual: determines that two objects are equal, they must have the same hash value.

さらに Swift において Dictionary の key には `hashValue` property というものが使われるのでこれにも注意が必要です。
ただ、Playgroundで試した限りでは上記のように `isEqual:` メソッドだけを定義した状態でも同じキーとして扱われているようでした。そもそも、システムで一意の値をユーザが定義するのって難しいよなあ


```
var dict: [NSObject : String] = [:]
dict[o1] = "hoge"
dict[o2] = "huga"
dict //=> [{MyObject2}: "huga"]
```

## Equatable, Hashable, Comparable
NSObject ではないClassでは `Equatable`, `Hashable`, `Comparable` protocol に注目する必要があります。

```
protocol Equatable {
    func ==(lhs: Self, rhs: Self) -> Bool
}
```

```
protocol Hashable : Equatable {
    var hashValue: Int { get }
}
```

```
protocol Comparable : _Comparable, Equatable {
    func <(lhs: Self, rhs: Self) -> Bool
    func <=(lhs: Self, rhs: Self) -> Bool
    func >=(lhs: Self, rhs: Self) -> Bool
    func >(lhs: Self, rhs: Self) -> Bool
}
```

これらを全部定義するとこんな感じ。

```
class MyClass: Hashable, Comparable {
    var hashValue: Int { return 1 }
}
func ==(lhs: MyClass, rhs: MyClass) -> Bool {
    return true
}

func <(lhs: MyClass, rhs: MyClass) -> Bool {
    return true
}

func <=(lhs: MyClass, rhs: MyClass) -> Bool {
    return true
}
func >=(lhs: MyClass, rhs: MyClass) -> Bool {
    return true
}
func >(lhs: MyClass, rhs: MyClass) -> Bool {
    return true
}
```

全部 `true` 返しているので全く使えないですが。メソッドとして定義するのではなくて関数として定義するというのはなかなか不思議なきもします。現在は文法的に許されていないからなのか、方針なのかどっちなんだろう。
