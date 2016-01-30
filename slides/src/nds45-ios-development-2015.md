class: center middle

<style>
.hoge img {
width: 200px;
height: 200px;
}
</style>

iOS の開発をやってみた
====================

2015.12.05 Sat. NDS 45 - 2015年 僕が私がやったこと報告会　〜そして2016年へ〜 -

.right[@dictav]
.center[powered by remarkjs (gnab/remark)]

---

.left-column[

自己紹介

* dictav (Github/Twitter/Facebook)
* 34歳、新婚ほやほや（2015/09/15 入籍)
* 2015/12/01 から東京の某社で勤務中
* モバイルプログラマ
    * iOS がメインターゲット
    * 時々 Android も触る程度には
    * tvOS/watchOS も触りたい
    * 仕事で Swift/Objective-C
    * 趣味で Go/Ruby/JavaScript
]

.right-column.hoge[
![](https://pbs.twimg.com/profile_images/443322643479924738/8LHmA5Ux.jpeg)
]

---

iOS 開発 2015
=============

* ATS
* IPv6
* WebView の fetch/promise のサポート
* watchOS 2.0
* tvOS 1.0

--


* Xcode7
* Swift 2.0


---
class: center middle

Swift 2.0
============

> Swift is a new programming language for iOS and OS X apps that builds on the best of C and Objective-C, without the constraints of C compatibility. 
> Excerpt From: Apple Inc. “The Swift Programming Language.
> iBooks. https://itun.es/jp/jEUH0.l

Swift 公式: https://developer.apple.com/swift/

---
class: center middle

Swift Open Source

Swift 3.0

---
class: center middle

<div style="font-size:4em;"> Swift Open Source </div>
<div style="font-size:4em;"> Swift 3.0 </div>

---
AGENDA
======

* Swift とは
* Swift Open Source の紹介
* Swift 3.0

---
class: center middle

Swift
============


> Swift is a general-purpose programming language built using a modern approach to safety, performance, and software design patterns.

Swift 公式: https://swift.org/

---
class: left top

Swift
======

* 型推論
* 安全に書ける
* 簡潔に書ける
* map/flatMap/filter が便利

---

安全に書ける
===========

```
// Objective-C
@implementation MyViewController {
  NSMutableString *name;
}

-(void) viewVillAppear:(Bool)animated
{
  [super viewVillAppear:animated];
  [name appendString:@"さん"];
  NSLog(@"%@", name);
}
@end
```

---

安全に書ける
===========

```
class MyViewController: UIViewController {
  var name: String?

  override func viewVillAppear(animated: Bool) {
    super.viewVillAppear(animated)

    name? += "さん"
    print(name)
  }
}
```

---

安全に書ける
===========

```
class MyViewController: UIViewController {
  var name: String?

  override func viewVillAppear(animated: Bool) {
    super.viewVillAppear(animated)

    if let n = name {
      print(n + "さん")
    }
  }
}
```

---

安全に書ける
===========

```
class MyViewController: UIViewController {
  var name: String?

  override func viewVillAppear(animated: Bool) {
    super.viewVillAppear(animated)

    guard let n = name else {
      return
    }

    print(n + "さん")
  }
}
```

---

安全に書ける
===========

```
// Objective-C
@implementation MyViewController2
- (void) prepareForSegue:(UIStoryboardSegue*)segue  sender:(id)sender
{
  [sender setName: @"dictav"];
}
@end
```

---

安全に書ける
===========

```
// Objective-C
@implementation MyViewController2
- (void) prepareForSegue:(UIStoryboardSegue*)segue  sender:(id)sender
{
  MyViewController *vc = (MyViewController*)sender;
  vc.name = "dictav";
}
@end
```

---

安全に書ける
===========

```
// Objective-C
@implementation MyViewController2
- (void) prepareForSegue:(UIStoryboardSegue*)segue  sender:(id)sender
{
  if ([sender isKindOf: [MyViewController class]]) {
    MyViewController *vc = (MyViewController*)sender;
    vc.name = @"dictav";
  }
}
@end
```

---

安全に書ける
===========

```
class MyViewController2: UIViewController {
  override func prepareForSegue(_ segue: UIStoryboardSegue, sender: AnyObject?) {
    if let vc = sender as? MyViewController {
      vc.name = "dictav"
    }
  }
}
```

---

簡潔に書ける
===========

```
// Objective-C
NSDictionary *json = ...;
NSString *name;
NSNumber *age;

if ([json[@"name"] isKindOf: [NSString class]]) {
  name = json[@"name"];
}

if ([json[@"age"] isKindOf: [NSNumber class]]) {
  age  = json[@"age"];
}

if (name == nil || age == nil) {
  return
}

self.name = name;
self.age = age;
```

---

簡潔に書ける
===========

```
let json: [String:AnyObject] = ...;
guard let name = json["name"] as? String, age = json["age"] as? Int else {
    return
}

self.name = name
self.age = age
```

---

map/flatMap/filter が便利
========================

```
var _array = [Int]()
for i in 1...100 {
  _array.append(i)
}
let array = _array
```

---

map/flatMap/filter が便利
========================

```
let array = (1...100).map { $0 }
```

---

map/flatMap/filter が便利
========================

```
let array = [[1,2,3],[4,5,6]]
let array2 = array.flatMap{$0}
print(array2) //=> [1,2,3,4,5,6]
```

---

map/flatMap/filter が便利
========================

```
let array = [[1,2,3],[4,5,6]]
let array2 = array.flatMap{$0}.map{$0+1}
print(array2) //=> [2,3,4,5,6,7]
```

---

map/flatMap/filter が便利
========================

```
let array = [[1,2,3],[4,5,6]]
let array2 = array.flatMap{$0}.map{$0+1}.filter{$0 > 4}
print(array2) //=> [5,6,7]
```

---

map/flatMap/filter が便利
========================

```
let array = [1,2,3,nil,5,6] // [Int?]
let array2 = array.flatMap{$0}
print(array2) //=> [1,2,3,5,6]
```

---

map/flatMap/filter が便利
========================

```
func sqrtInt(i: Int) -> Int?

(1...100).map(sqrtInt)      // [Int?]
(1...100).flatMap{sqrtInt}  // [Int]
````

---
class: middle center

Swift Open Source
================

---

Swift Open Source
================

* 2015/12/03 公開
* Swift.org https://swift.org/
* GitHub https://github.com/apple
* Apache License: https://swift.org/LICENSE.txt
  * Runtime Library Exception: https://swift.org/community/#license
* https://realm.io/jp/news/swift-opensource/

---

Linux Port
==========

* Ubuntu用のバイナリ https://swift.org/download/
* docker https://hub.docker.com/r/swiftlang/swift/
* 2015/12/05 現在、まだスタンダードライブラリも完全ではない

---

Swift GitHub Repositories
================

1. apple/swift[C++,Swift]
    * https://github.com/apple/swift
2. apple/swift-package-manager[Swift,Python]
    * https://github.com/apple/swift-package-manager
3. apple/swift-corelibs-foundation[C,C++]
    * https://github.com/apple/swift-corelibs-foundation
4. apple/swift-3-api-guidelines-review:
    * https://github.com/apple/swift-3-api-guidelines-review
5. apple/swift-evolution:
    * https://github.com/apple/swift-evolution

---

Swift Package Manager
===================

* CocoaPods: https://cocoapods.org
* Carthage: https://github.com/Carthage/Carthage
* Package Manager: https://swift.org/package-manager/#example-usage

```
import PackageDescription
let package = Package(
    name: "DeckOfPlayingCards",
    targets: [],
    dependencies: [
      .Package(url: "https://github.com/apple/example-package-fisheryates.git", majorVersion: 1),
      .Package(url: "https://github.com/apple/example-package-playingcard.git", majorVersion: 1),
    ]
)
```

--

* iOS/watchOS/tvOS のプロダクションに使えない?

---

Swift 3.0
===========

* API Design Guidelines:
    * https://swift.org/documentation/api-design-guidelines.html
* apple/swift-evolution:
    * https://github.com/apple/swift-evolution
* 公開は 2016 年秋

---

API Design Guidelines
=====================

* Swift はいろんな言語から影響を受けているので、そのAPI (メソッド名など) も混ざっている
* APIの名詞・動詞などの使い方を統一しよう
* APIは明瞭にしよう
* 冗長な記述は削除しよう
* etc...

---

Better Translation of Objective-C APIs Into Swift
==========

```
let contentString = listItemView
                    .stringValue
                    .stringByTrimmingCharactersInSet(
                        NSCharacterSet.whitespaceAndNewlineCharacterSet()
                    )
```

--

```
let content = listItem.stringValue.trimming(.whitespaceAndNewlines)
```


---

まとめ
======

* Swift がオープンソースで公開されました
* Apache ライセンスです
* Linux で動かせます
    * 今日帰ってすぐに始められるDockerで立ち上げてみてください!
* Swift 3.0

---

おまけ
======

* 新しい会社ではPMみたいなことをやります

--

* iOS アプリには触りません :p

--

* golang でサーバー書いたり、JS でフロント書いたりします

--

* gRPC やろうかなと思ってます

---
class: middle center

ご清聴ありがとうございました
===========================

