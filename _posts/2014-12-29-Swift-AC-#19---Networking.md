---
layout: post
title: "Swift AC #19 - Networking"
date: 2014-12-29
tags: swift, networking
---

## Networking
近年のプログラミング言語はネットワークに簡単に接続できることがとても重要です。Apple からは Core Foundation[^CF][^CF2] の一部として CFNetwork[^CFN] が公開されています。
さらに Foundation という Core Foundation のラッパーも提供されており、Objective-C や Swift から利用することができます。ただ、残念ながらこちらは公開されていません。

> GNUstep[^GS][^GSB] というオープンソースのプロジェクトもあるが言語の組み込みライブラリとして扱うには不安が残る。やはり、せめて Foundation までは公開してもらって、Swift が Linux などのプラットフォームに移植されることを期待したい。

### NSURLConnection

``` swift
import Foundation

let  url = NSURL(string: "http://www.dictav.info/")!
let request = NSURLRequest(URL: url)
var res: NSURLResponse?
var err: NSError?
let data = NSURLConnection.sendSynchronousRequest(request, returningResponse: &res, error: &err)
if data?.bytes == nil {
    println("Response: \(res), Error: \(err)")
    exit(1)
}

glet chars = UnsafePointer<CChar>(data!.bytes)
let str = String.fromCString(chars)!

println(str)
```


### NSURLSession

``` swift
import Foundation

let url = NSURL(string: "http://www.dictav.info/")!
let conf = NSURLSessionConfiguration.defaultSessionConfiguration()
let session = NSURLSession(configuration: conf)
let task = session.downloadTaskWithURL(url){ (fileURL, res, err) -> Void in
    println(fileURL)
}
task.resume()

NSThread.sleepForTimeInterval(3)
```


### NSURLCache

NSURL 周りのキャッシュを行ってくれるのが NSURLCache。NSCache とは別物なので注意。インスタンスを作成するわけだけど、個別に NSURLRequest などに設定するのではなくて `NSURLCache.setSharedURLCache()` メソッドで設定することで NSURLConnection、NSURLSession や WebView などで使われる。
HTTP status code 200 以外 (?) の値が返された場合にはキャッシングは行われない。

キャッシュされたResponse が使われるかどうかは NSURLRequestCachePolicy に従う。default の Policy は .UserProtocolCachePolicy。

``` swift
enum NSURLRequestCachePolicy : UInt {
    
    case UseProtocolCachePolicy
    
    case ReloadIgnoringLocalCacheData
    case ReloadIgnoringLocalAndRemoteCacheData // Unimplemented
    
    case ReturnCacheDataElseLoad
    case ReturnCacheDataDontLoad
    
    case ReloadRevalidatingCacheData // Unimplemented
}
```

.ReturnCacheDataDontLoad 以外であれば、ある request に対するキャッシュが存在してた場合は通信は行わずキャッシュの内容を返す。Policyによって通信を行う条件が異なり、例えば .UserProtocolCachePolicy は HTTP Header `Last-Modified` の有無によっても通信を行うかどうかが変わる。

上記の理由により、例えば 304 などの status code を期待した場合にもキャッシュが存在した場合にはキャッシュが利用され、`NSHTTPURLResponse` は status code 200 を返す。

#### NSCachedURLResponse

キャッシュされた response を個別に取り出すこともできるが、キャッシュがある時だけ処理を行いたいのであれば .ReturnCacheDataDontLoad という Policy もあるので、使うときはよく注意したほうが良い。

``` swift
let cachedRes = cache.cachedResponseForRequest(request)
let data = cachedRes?.data
let res = cachedRes?.response
```

### NSStream

取り急ぎ簡単に NSStream。

``` swift
#! /usr/bin/env swift
import Foundation

var inp :NSInputStream?
var out :NSOutputStream?

NSStream.getStreamsToHostWithName("localhost", port: 6379, inputStream: &inp, outputStream: &out)

let inputStream = inp!
let outputStream = out!
inputStream.open()
outputStream.open()

let data = "keys *\n".dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: false)
let buffer = UnsafePointer<UInt8>(data!.bytes)
let len = outputStream.write(buffer, maxLength: data!.length)
println("write: \(len)")

NSThread.setThreadPriority(0.1)

var readByte :UInt8 = 0
while inputStream.hasBytesAvailable {
    let len = inputStream.read(&readByte, maxLength: 512)
    let data = NSData(bytes: &readByte, length: len)
    let chars = UnsafePointer<CChar>(data.bytes)
    let str = String.fromCString(chars)!
    
    println(str)
}

out?.close()
inp?.close()
```

### 参考

[^CF]: OS X 10.9.5 Source CF-855.17
    : <http://www.opensource.apple.com/source/CF/CF-855.17/>

[^CF2]:
    opensource-apple/CF
    : <https://github.com/opensource-apple/CF>

[^CFN]: CFNetwork Programming Guide
    : <https://developer.apple.com/library/mac/documentation/Networking/Conceptual/CFNetwork/Introduction/Introduction.html>

[^GS]: GNUstep
    : <http://gnustep.org/>

[^GSB]: GNUstep Base
    : <http://www.gnustep.org/resources/documentation/Developer/Base/Reference/index.html>
