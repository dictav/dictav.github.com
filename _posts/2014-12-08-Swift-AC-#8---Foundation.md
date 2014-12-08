---
layout: post
title: Swift AC #8 - Foundation
date: 2014-12-08
tags: swift foundation
---

晴れただけで幸せになれ土地、新潟からお伝えします。
スマブラやろうと思って BlackMagic UltraStudio mini Recorder のファームウェアをアップデートしたら失敗して、大事なハードが死んだかもしれません。辛い。

## Foundation
Swiftの組み込みのStructが多数定義されており、Objective-C の Foundation と相互に変換できるような工夫がされています。
しかしながら、Foundation のクラスと Swift のタイプは別物です。
Swiftで開発するからには強い静的型付けのある Swift の組み込みTypeを使いたいところですが、Cocoa/UIKit は Objective-C の Foundation に強く依存したフレームワークであり、意識しないでいると NSArray などの Objective-C のクラスを使うことになると思います。
ある程度意識しなくても開発できるところは素晴らしいと思うのですが。

## Base Class
Objective-C では Base Class として NSObject がありましたが、Swiftにはありません。
また Objective-C では返り値が１つの Class に定まらないときは id を用いた `- (id)something` のようなメソッドがたくさんあります。
Objective-C からのコンバートなども考えると以下のことには注意したほうが良さそうです。

* [ObjC] NSObject: Objective-C のBase Class。すべてのクラスは NSObject を継承している
* [ObjC] id: void *。扱う変数や返り値、引数などが特定のクラスに限定できないときに使われる
* [Swift] AnyObject: `@objc protocol AnyObject {}`。Objective-C の Class を扱うときに使う。Objective-C の id に相当すると思われる。
* [Swift] AnyClass: `typealias AnyClass = AnyObject.Type`
* [Swift] Any: `typealias Any = protocol<>`。Any型。

## Other types

Swift の Collection には以下のようなものがあります。

* Array
* Slice
* Dictionary
* NSArray
* NSDictionary
* NSSet

文字列に関するTypeには以下のようなものがあります。

* String
* NSString
* CChar:   `typealias CChar = Int8`

数字に関するTypeには以下のようなものがあります。

* Int
* Float
* Double
* NSNumber

## まとめ
Objective-C は C 依存の type があり、NSString などの独自のクラスがあるため慣れないうちは意味がわからないことが多かったです。Swiftはさらにその上に被さっているものなので、C 依存、Objective-C 依存が少なからず存在します。
Swiftでプログラミングするときは、自分が扱っているものが C のものなのか、Objective-C のものなのか、Swift 独自のものなのか意識することも大事だと思います。
