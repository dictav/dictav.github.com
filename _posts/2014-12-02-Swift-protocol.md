---
layout: post
title: "Swift AC #2 - protocol"
date: 2014-12-02
tags: swift
---

Stackoverflow の日本語BETAが始まりました。
まだまだ質問は初歩的なものが多いように思いますが、どんどん面白いものが増えると良いなと思います。


## Swift

> Swift は Objective-C のシンタックスシュガーだ
> - 猫型蓄音機

極論だけど正しいな、と思いました。
Swift での iOS 開発は UIKit の知識がないとできないし、プラスでObjective-Cの知識もないとFoundation周りの扱いで困るんじゃないかな、と。

### protocol

Objective-C のprotocol はシンプルで使い易いのですが強制力がないので、プログラミングを楽にしてくれるものの(Xcodeやプログラマにヒントをあたえてくれる)、プログラミングにを加えてくれるものではありませんでした。

```swift
@protocol Namable
@property (readonly) NSString *name;
@end

id<Namable> obj = [NSObject new]; //combile warning
obj.name; // 実行時エラー
```

実装もしていないメソッド呼べるのきもいですね。ぼくはこのキモさが好きですけど :)

一方Swift では基本的には実装していないメソッドは呼べません。なのでprotocolは上記のようなヒントとしてではなくコンパイルエラーになります。

```swift
protocol Namable {
    var name: String {get}
}

class MyClass : Namable { // compile error
}
```

返り値としてprotocolを指定することもできます。

```swift
protocol Agable {
    var age: Int {get}
}

protocol Person : Namable,Agable {}

class A : Person {
    var name: String { return "A" }
    var age: Int { return 20 }
}

class B : Person {
    var name: String { return "B" }
    var age: Int { return 40 }
}

func CreatePerson(i: Int) -> Person {
    if i == 0 {
        return A()
    } else {
        return B()
    }
}

let person1 = CreatePerson(0)
person1.name // "A"
person1.age  // 20
let person2 = CreatePerson(1)
person2.name // "B"
person2.age  // 40
```

さらに、特定のprotocolに制約することもできます

```swift
let a: Namable = person1
a.name       // "A"
a.age // combile error
```

