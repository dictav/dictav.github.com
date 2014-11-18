---
layout: post
title: Appleの新言語Swift
published: false
tags:
---
Appleから新言語が発表された。
 https://itunes.apple.com/jp/book/swift-programming-language/id881256329?l=en&mt=11

# 文法

```
```

# スコープ
# Collection
* type safety
* leterals
* reference or value

# Class & Structure & Enumeration
他の言語にはあまりないことだと思うのだけど、クラスと構造体の両方を持っていて、どちらにもメソッド（関数）を定義する事が出来る。

``` swift
class Hoge {
	var name = ""
	func hi() {
		println("Hi, I'm \(self.name)")
	}
}
struct Piyo {
	var name = ""
	func hi() {
		println("Hi, I'm \(self.name)")
	}
}
```

## Exception

# Library
組み込みのString,Array,Dictionary,Numberなどはうまく Foundation をラッピングしていて bridge できる。とは言うけど。

```
let nsarray = ["nsarray",1,2,3]
let anyObjects : AnyObject[] = ["any objects", 1, 2, 3]
let anyList : Any[] = ["anyList", 1, 2, 3]
```

配列系が３つもあるのはどうなんでしょうね？
ちなみに、`nsarray`は文字通りnsarrayで、`enumerateObjectsUsingBlock:` が呼べますし、for文も使う事が出来ます。

```
for v in nsarray {
	println(v)
}
for (index,v) in anyList {
	println(index,v)
}
```

# Logger

# package management
# ARC
# Thread safety
# Objective-C
