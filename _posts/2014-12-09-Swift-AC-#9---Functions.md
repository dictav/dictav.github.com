---
layout: post
title: "Swift AC #9 - Functions"
date: 2014-12-09
tags: swift
---

## Functions
Swiftの組み込み関数を列挙してみます

```
abs<T : SignedNumberType>(x: T) -> T
advance<T : ForwardIndexType>(start: T, n: T.Distance) -> T
advance<T : ForwardIndexType>(start: T, n: T.Distance, end: T) -> T
alignof<T>(_: T.Type) -> Int
alignofValue<T>(_: T) -> Int
assert(condition: @autoclosure () -> Bool, _ message: @autoclosure () -> String = default, file: StaticString = default, line: UWord = default)
contains<S : SequenceType where S.Generator.Element : Equatable>(seq: S, x: S.Generator.Element) -> Bool
contains<S : SequenceType, L : BooleanType>(seq: S, predicate: (S.Generator.Element) -> L) -> Bool
count<I : RandomAccessIndexType>(r: Range<I>) -> I.Distance
countElements<T : _CollectionType>(x: T) -> T.Index.Distance
debugPrint<T, TargetStream : OutputStreamType>(x: T, inout target: TargetStream)
debugPrint<T>(x: T)
debugPrintln<T, TargetStream : OutputStreamType>(x: T, inout target: TargetStream)
debugPrintln<T>(x: T)
distance<T : ForwardIndexType>(start: T, end: T) -> T.Distance
dropFirst<Seq : Sliceable>(s: Seq) -> Seq.SubSlice
dropLast<S : Sliceable where S.Index : BidirectionalIndexType>(s: S) -> S.SubSlice
dump<T>(x: T, name: String? = default, indent: Int = default, maxDepth: Int = default, maxItems: Int = default) -> T
dump<T, TargetStream : OutputStreamType>(x: T, inout targetStream: TargetStream, name: String? = default, indent: Int = default, maxDepth: Int = default, maxItems: Int = default) -> T
enumerate<Seq : SequenceType>(base: Seq) -> EnumerateSequence<Seq>
equal<S1 : SequenceType, S2 : SequenceType where S1.Generator.Element == S1.Generator.Element, S1.Generator.Element : Equatable>(a1: S1, a2: S2) -> Bool
equal<S1 : SequenceType, S2 : SequenceType where S1.Generator.Element == S1.Generator.Element>(a1: S1, a2: S2, isEquivalent: (S1.Generator.Element, S1.Generator.Element) -> Bool) -> Bool
extend<C : RangeReplaceableCollectionType, S : CollectionType where S.Generator.Element == S.Generator.Element>(inout x: C, newElements: S)
filter<S : SequenceType>(source: S, includeElement: (S.Generator.Element) -> Bool) -> [S.Generator.Element]
find<C : CollectionType where C.Generator.Element : Equatable>(domain: C, value: C.Generator.Element) -> C.Index?
first<C : CollectionType>(x: C) -> C.Generator.Element?
getVaList(args: [CVarArgType]) -> CVaListPointer
indices<C : CollectionType>(x: C) -> Range<C.Index>
insert<C : RangeReplaceableCollectionType>(inout x: C, newElement: C.Generator.Element, atIndex i: C.Index)
isEmpty<C : CollectionType>(x: C) -> Bool
join<C : ExtensibleCollectionType, S : SequenceType where C == C>(separator: C, elements: S) -> C
last<C : CollectionType where C.Index : BidirectionalIndexType>(x: C) -> C.Generator.Element?
lazy<S : CollectionType where S.Index : ForwardIndexType>(s: S) -> LazyForwardCollection<S>
lazy<S : CollectionType where S.Index : BidirectionalIndexType>(s: S) -> LazyBidirectionalCollection<S>
lazy<S : CollectionType where S.Index : RandomAccessIndexType>(s: S) -> LazyRandomAccessCollection<S>
lazy<S : SequenceType>(s: S) -> LazySequence<S>
lexicographicalCompare<S1 : SequenceType, S2 : SequenceType where S1.Generator.Element == S1.Generator.Element>(a1: S1, a2: S2, less: (S1.Generator.Element, S1.Generator.Element) -> Bool) -> Bool
lexicographicalCompare<S1 : SequenceType, S2 : SequenceType where S1.Generator.Element == S1.Generator.Element, S1.Generator.Element : Comparable>(a1: S1, a2: S2) -> Bool
map<T, U>(x: T?, f: (T) -> U) -> U?
map<C : CollectionType, T>(source: C, transform: (C.Generator.Element) -> T) -> [T]
map<S : SequenceType, T>(source: S, transform: (S.Generator.Element) -> T) -> [T]
max<T : Comparable>(x: T, y: T, z: T, rest: T...) -> T
max<T : Comparable>(x: T, y: T) -> T
maxElement<R : SequenceType where R.Generator.Element : Comparable>(elements: R) -> R.Generator.Element
min<T : Comparable>(x: T, y: T) -> T
min<T : Comparable>(x: T, y: T, z: T, rest: T...) -> T
minElement<R : SequenceType where R.Generator.Element : Comparable>(elements: R) -> R.Generator.Element
numericCast<T : _UnsignedIntegerType, U : _SignedIntegerType>(x: T) -> U
numericCast<T : _SignedIntegerType, U : _UnsignedIntegerType>(x: T) -> U
numericCast<T : _UnsignedIntegerType, U : _UnsignedIntegerType>(x: T) -> U
numericCast<T : _SignedIntegerType, U : _SignedIntegerType>(x: T) -> U
overlaps<I0 : IntervalType, I1 : IntervalType where I0.Bound == I0.Bound>(lhs: I0, rhs: I1) -> Bool
partition<C : MutableCollectionType where C.Index : RandomAccessIndexType>(inout elements: C, range: Range<C.Index>, isOrderedBefore: (C.Generator.Element, C.Generator.Element) -> Bool) -> C.Index
partition<C : MutableCollectionType where C.Index : RandomAccessIndexType, C.Generator.Element : Comparable>(inout elements: C, range: Range<C.Index>) -> C.Index
precondition(condition: @autoclosure () -> Bool, _ message: @autoclosure () -> String = default, file: StaticString = default, line: UWord = default)
prefix<S : Sliceable>(s: S, maxLength: Int) -> S.SubSlice
print<T>(object: T)
print<T, TargetStream : OutputStreamType>(object: T, inout target: TargetStream)
println()
println<T>(object: T)
println<T, TargetStream : OutputStreamType>(object: T, inout target: TargetStream)
reduce<S : SequenceType, U>(sequence: S, initial: U, combine: (U, S.Generator.Element) -> U) -> U
reflect<T>(x: T) -> MirrorType
removeAll<C : RangeReplaceableCollectionType>(inout x: C, keepCapacity: Bool = default)
removeAtIndex<C : RangeReplaceableCollectionType>(inout x: C, index: C.Index) -> C.Generator.Element
removeLast<C : RangeReplaceableCollectionType where C.Index : BidirectionalIndexType>(inout x: C) -> C.Generator.Element
removeRange<C : RangeReplaceableCollectionType>(inout x: C, subRange: Range<C.Index>)
reverse<C : CollectionType where C.Index : BidirectionalIndexType>(source: C) -> [C.Generator.Element]
sizeof<T>(_: T.Type) -> Int
sizeofValue<T>(_: T) -> Int
sort<T : Comparable>(inout array: ContiguousArray<T>)
sort<T : Comparable>(inout array: [T])
sort<C : MutableCollectionType where C.Index : RandomAccessIndexType, C.Generator.Element : Comparable>(inout collection: C)
sort<T>(inout array: ContiguousArray<T>, isOrderedBefore: (T, T) -> Bool)
sort<T>(inout array: [T], isOrderedBefore: (T, T) -> Bool)
sort<C : MutableCollectionType where C.Index : RandomAccessIndexType>(inout collection: C, isOrderedBefore: (C.Generator.Element, C.Generator.Element) -> Bool)
sorted<C : SequenceType where C.Generator.Element : Comparable>(source: C) -> [C.Generator.Element]
sorted<C : SequenceType>(source: C, isOrderedBefore: (C.Generator.Element, C.Generator.Element) -> Bool) -> [C.Generator.Element]
splice<C : RangeReplaceableCollectionType, S : CollectionType where S.Generator.Element == S.Generator.Element>(inout x: C, newElements: S, atIndex i: C.Index)
split<S : Sliceable, R : BooleanType>(elements: S, isSeparator: (S.Generator.Element) -> R, maxSplit: Int = default, allowEmptySlices: Bool = default) -> [S.SubSlice]
startsWith<S0 : SequenceType, S1 : SequenceType where S0.Generator.Element == S0.Generator.Element>(s: S0, prefix: S1, isEquivalent: (S0.Generator.Element, S0.Generator.Element) -> Bool) -> Bool
startsWith<S0 : SequenceType, S1 : SequenceType where S0.Generator.Element == S0.Generator.Element, S0.Generator.Element : Equatable>(s: S0, prefix: S1) -> Bool
stride<T : Strideable>(from start: T, through end: T, by stride: T.Stride) -> StrideThrough<T>
stride<T : Strideable>(from start: T, to end: T, by stride: T.Stride) -> StrideTo<T>
strideof<T>(_: T.Type) -> Int
strideofValue<T>(_: T) -> Int
suffix<S : Sliceable where S.Index : BidirectionalIndexType>(s: S, maxLength: Int) -> S.SubSlice
swap<T>(inout a: T, inout b: T)
toDebugString<T>(x: T) -> String
toString<T>(x: T) -> String
transcode<Input : GeneratorType, Output : SinkType, InputEncoding : UnicodeCodecType, OutputEncoding : UnicodeCodecType where InputEncoding.CodeUnit == InputEncoding.CodeUnit, OutputEncoding.CodeUnit == OutputEncoding.CodeUnit>(inputEncoding: InputEncoding.Type, outputEncoding: OutputEncoding.Type, input: Input, output: Output, #stopOnError: Bool) -> (Bool)
underestimateCount<T : SequenceType>(x: T) -> Int
unsafeAddressOf(object: AnyObject) -> UnsafePointer<Void>
unsafeBitCast<T, U>(x: T, _: U.Type) -> U
unsafeDowncast<T>(x: AnyObject) -> T
withExtendedLifetime<T, Result>(x: T, f: () -> Result) -> Result
withExtendedLifetime<T, Result>(x: T, f: (T) -> Result) -> Result
withUnsafeMutablePointer<T, Result>(inout arg: T, body: (UnsafeMutablePointer<T>) -> Result) -> Result
withUnsafeMutablePointers<A0, A1, A2, Result>(inout arg0: A0, inout arg1: A1, inout arg2: A2, body: (UnsafeMutablePointer<A0>, UnsafeMutablePointer<A1>, UnsafeMutablePointer<A2>) -> Result) -> Result
withUnsafeMutablePointers<A0, A1, Result>(inout arg0: A0, inout arg1: A1, body: (UnsafeMutablePointer<A0>, UnsafeMutablePointer<A1>) -> Result) -> Result
withUnsafePointer<T, Result>(inout arg: T, body: (UnsafePointer<T>) -> Result) -> Result
withUnsafePointers<A0, A1, Result>(inout arg0: A0, inout arg1: A1, body: (UnsafePointer<A0>, UnsafePointer<A1>) -> Result) -> Result
withUnsafePointers<A0, A1, A2, Result>(inout arg0: A0, inout arg1: A1, inout arg2: A2, body: (UnsafePointer<A0>, UnsafePointer<A1>, UnsafePointer<A2>) -> Result) -> Result
withVaList<R>(builder: VaListBuilder, f: (CVaListPointer) -> R) -> R
withVaList<R>(args: [CVarArgType], f: (CVaListPointer) -> R) -> R
```

`countElements()` とか興味深いです。Array には `count` property がありますが、`countElement()` でも要素数を得ることができます。NSArray に寄せたのかなーと思いますけど、シンプルさには欠けますね。

`toString()` も、Printable protocol で `description` メソッドを定義しているのに、`toString()` とは関係ないし。

```
let a = [1,2,3,4,5]
a.count          //=> 5
countElements(a) //=> 5
a.description    //=> "[1,2,3,4,5]"
toString(a)      //=> "[1,2,3,4,5]"

struct hoge: Printable {
    var description: String { return "hoge" }
}
toString(hoge())  //=> "__lldb_expr_644.hoge"
```

## ドキュメントはどこ？

上のリストは Xcode 上で Cmd+click するとでてくるファイルから抜き出したのだけど、これの実態ってどこにあるのだろう？

`/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/swift/iphoneos`

この辺の .swiftdoc とかそれっぽいけど、開き方が分からなかった。
とりあえず全部 import しちゃえば見れるのだけど。

```
import AssetsLibrary
import CoreData
import CoreGraphics
import CoreImage
import Darwin
import Dispatch
import Foundation
import GameKit
import NotificationCenter
import ObjectiveC
import SceneKit
import Security
import SpriteKit
import StdlibUnittest
import Swift
import UIKit
import WebKit
```
