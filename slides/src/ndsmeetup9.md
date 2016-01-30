class: center middle

<style>
.hoge img {
width: 200px;
height: 200px;
}
</style>

Thrift
====================

2016.01.30 Sat. NDS meetup 9

.right[@dictav]
.center[powered by remarkjs (gnab/remark)]

---

.left-column[

自己紹介

* dictav (Github/Twitter/Facebook)

* 34歳

* モバイルプログラマ
    * iOS がメインターゲット
    * 時々 Android も触る程度には
    * tvOS/watchOS も触りたい
    * 仕事で Swift/Objective-C/ .small[Java(Android)]
    * 趣味で Go/Ruby/JavaScript
]

.right-column.hoge[
![](https://pbs.twimg.com/profile_images/443322643479924738/8LHmA5Ux.jpeg)
]

---

class: left top 

Apache Thrift
--------------

> Apache Thrift（アパッチ スリフト）は、「スケーラブルな言語間サービス開発」のためにFacebookにて開発されたRPCフレームワークである。これはソフトウェアスタックとコード生成エンジンを組み合わせることで、C++、C#、Java、Perl、Python、PHP、Erlang、Rubyなどの言語間にて効率的かつシームレスに動作するサービスを開発することを可能とする。

.right-column[
[https://ja.wikipedia.org/wiki/Apache_Thrift](https://ja.wikipedia.org/wiki/Apache_Thrift)
]

---

Apache Thrift
--------------

* https://thrift.apache.org
* RPC
  * JSON-RPC
  * XML-RPC
* コード生成エンジン
* IDL を記述

---

Apache Thrift Concept
--------------

```
+-------------------------------------------+
| Server                                    |
| (single-threaded, event-driven etc)       |
+-------------------------------------------+
| Processor                                 |
| (compiler generated)                      |
+-------------------------------------------+
| Protocol                                  |
| (JSON, compact etc)                       |
+-------------------------------------------+
| Transport                                 |
| (raw TCP, HTTP etc)                       |
+-------------------------------------------+
```

---

Thrift interface description language
-------------------------------------
* https://thrift.apache.org/docs/idl
* Thrift Types
  * Services
  * Exceptions
  * Structs
  * Types

```
FieldType       ::=  Identifier | BaseType | ContainerType
DefinitionType  ::=  BaseType | ContainerType
BaseType        ::=  'bool' | 'byte' | 'i16' | 'i32' | 'i64'
                     | 'double' | 'string' | 'binary' | 'slist'
ContainerType   ::=  MapType | SetType | ListType
MapType         ::=  'map' CppType? '<' FieldType ',' FieldType '>'
SetType         ::=  'set' CppType? '<' FieldType '>'
ListType        ::=  'list' '<' FieldType '>' CppType?
```

---


Thrift interface description language
-------------------------------------

``` thrift
namespace go myservice

struct MyStruct {
  1: string name
  2: i16 age
}

service MyService {
  MyStruct getStruct(1: i32 key)
}

exception MyException {
  1: i32 code,
  2: string message
}

service MySpecialService extends MyService {
  string ping(),
  string hello(1: MyStruct item) throws (1:MyException excep)
}
```

---

Generate Thrift File into source code 
-------------------------------------

```
thrift --gen <language> <Thrift filename>
```

```
$ thrift --gen go myservice.thrift
$ thrift --gen cocoa myservice.thrift
```

### Generate option

```
$ thrift -r --gen go:package_prefix=github.com/dictav/thrift_learning/go/gen-go/ tutorial.thrift
```

---

Generate Thrift File into source code 
-------------------------------------

### Go

```
$ tree gen-go
gen-go
└── myservice
    ├── constants.go
    ├── my_service-remote
    │   └── my_service-remote.go
    ├── my_special_service-remote
    │   └── my_special_service-remote.go
    ├── myservice.go
    ├── myspecialservice.go
    └── ttypes.go
```

---

Generate Thrift File into source code 
-------------------------------------

### Cocoa

```
$ tree gen-cocoa
gen-cocoa
├── myservice.h
└── myservice.m
```

---

Generate Thrift File into source code 
-------------------------------------

### IDL

``` thrift
service MyService {
  MyStruct getStruct(1: i32 key)
}

service MySpecialService extends MyService {
  string ping(),
  string hello(1: MyStruct item) throws (1:MyException excep)
}
```

### Generated Go codek

``` go
type MyService interface {
	GetStruct(key int32) (r *MyStruct, err error)
}

type MySpecialService interface {
	MyService
	Ping() (r string, err error)
	Hello(item *MyStruct) (r string, err error)
}
```

---

class: center middle

実装
====

---
class: left top 

Implement Server 
-------------------------------------

``` go
package main

import (
  "package/path/myservice"
)

type MyServiceHandler struct {}
func NewMyServiceHandler (*MyServiceHandler) {
  return &MyServiceHandler{}
}

func (h *MyServiceHandler) GetStruct(key int32) (r *MyStruct, err error) {
  //...
}
//...
```

---

Implement Server
-------------------------------------

```
package main

import (
	"git.apache.org/thrift.git/lib/go/thrift"
)

func main() {
	transport, err := thrift.NewTServerSocket(addr)

	if err != nil {
		panic(err.Error())
	}

	handler := NewMyServiceHandler()
	processor := tutorial.NewMyServiceProcessor(handler)
	server := thrift.NewTSimpleServer4(processor, transport, transportFactory, protocolFactory)

	println("Starting the simple server... on ", addr)
	server.Serve()
}
```

---

Implement Client 
-------------------------------------

* Client は呼び出すだけ

--

![](images/has_many_errors.png)

---

class: center middle

<style> .terarena{ font-size: 100pt; } </style>
.terarena[てられな]
=======


---

class: left top 

なぜこうなった？
--------------

* Objective-C は近年、Swift の影響で大幅な API の回収が行われているようです
  * Error 処理周り
  * Null の扱い
  * ジェネリクス
* thrift のチームの Cocoa へのコミットが活発でない？？
  * ライブラリは修正されているようだけど、ジェネレーターは？？
  * バージョンの問題？？

---

別の実装でお茶を濁す
-------------------

* Thrift はブラウザでも動く！
* ~~JSON−RPCでよくね？~~

---

class: center middle

DEMO
=======

---

class: left top 

その他のRPC
----------------------------

### [gRPC](http://www.grpc.io)
* フルスタックなRPC
* http2 など先端の技術をベースにしている
* IDL に Protocol Buffer を利用している(default)
* まだベータ

### [MessagePack-RPC](http://msgpack.org)
* シンプルなRPC
* Thrift 互換のIDL
* 対応言語が少ない？(cpp/java/ruby)

### [CAP'N PROTO](https://capnproto.org/index.html)
* Protocol Buffer の作者の人が作った Next Protocol Buffer (たぶん)
* RPC もサポートしている
* RPC までサポートしている言語はあまり多くない
* 速くて小さい

---

RPC じゃなきゃだめですか？
----------------------------

### [FlatBuffers](http://google.github.io/flatbuffers/index.html)

* 2014年にGoogleがオープンソース化
* プロトコルのみ
* 速くて小さい
* IDL がある

### [Open API Initiative](https://openapis.org)

* 2015/11 Open API Initiative が結成
* The Linux Foundation, Microsoft, Google, IBM, etc...
* Swagger がベース

---

Swagger
-------

![](images/swagger-editor1.png)

---

Swagger
-------

![](images/swagger-editor2.png)

---

まとめ
-----

* Thrift は実績がある良いRPC
* 言語によってバラツキがあるので、利用するときは注意
* コードジェネレーションがトレンドな気がする
* IDLにせよ API Spec にせよ、サーバーとクライアントで共有できる定義が必要

---

class: center middle

ご清聴ありがとうございました
=======
