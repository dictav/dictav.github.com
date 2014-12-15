---
layout: post
title: "Swift AC #5 - Types"
date: 2014-12-05
tags: swift
---

新潟市中央区は雪が降りました。吹雪いてます。寒いです。

## Type
SwiftにはStruct と Class という type があります。
Struct は Value でGoのようにメソッドを定義することができます。
Class は Reference で他の言語でよく見られるようなものです。

```swift
struct Person {
  var name: String
  var age: Int

  func hello() {
    println("Hi, my name is \(name)")
  }
}

let p = Person(name: "dictav", age: 33)
p.hello() //=> Hi, my name is dictav
```


```swift
class PersonClass {
  var name: String
  var age: Int

  init(name: String, age: Int) {
    self.name = name
    self.age = age
  }

  func hello() {
    println("Hi, my name is \(name)")
  }
}

let pc = PersonClass(name: "dictav", age: 33)
pc.hello() //=> Hi, my name is dictav
```

## どちらを使えばいいのか？
そもそもなぜ２つあるのか、という疑問があります。
Swiftの組み込みTypeは全て（？）Structで定義されています。また、 "The Swift Programming Language" には次のように書かれています。

>“As a general guideline, consider creating a structure when one or more of these conditions apply:
>
>The structure’s primary purpose is to encapsulate a few relatively simple data values.
>It is reasonable to expect that the encapsulated values will be copied rather than referenced when you assign or pass around an instance of that structure.
>Any properties stored by the structure are themselves value types, which would also be expected to be copied rather than referenced.
>The structure does not need to inherit properties or behavior from another existing type.
>”
>
>抜粋：: Apple Inc. “The Swift Programming Language”。 iBooks. https://itun.es/jp/jEUH0.l

これ以外の場合、特にデータモデルのような物は Class を使うべきとしています。

例えば UITableViewDataSource を実装するような場合を考えてみます。
`var sources: [MyClass]` のようなデータソースを用意しそれを必要なタイミングで呼び出します。

```swift
func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
	let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath)
	let mc = sources[indexPath.row]
	cell.textView.text = mc.text
	return cell
}
```

`let mc = sources[indexPath.row]` の部分で Struct であれば毎回 allocate されるのに対して、Class であれば参照されるだけなので無駄な allocation は発生しないです。

のはずなので、次回は検証してみます。
