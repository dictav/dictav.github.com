---
layout: post
title: "Swift AC #6 - Memory Usage"
date: 2014-12-06
tags: swift memory usage
---

![](https://pbs.twimg.com/media/B4O9tRyCUAAOv3D.png)

新潟市はドカ雪が降りまして、一夜にして冬らしい景観になりました。
雪は嫌いじゃないんですが、寒いのは嫌。

## Struct と Class のリソース
Struct は value で Class は reference と言われますが、では実際にリソースはどのように消費されるのでしょうか？
気になったので計測してみました。

## Instruments.app

![](https://pbs.twimg.com/media/B4O9zECCcAI4ctu.png)
Instruments.app を使えばメモリアロケーションなどリソースの消費を見ることができます。
他にもAutomationでE2Eテストできたりして面白いのです。

### 計測結果

Struct と Class を大量に作った時の値を比較してみる以下のようになりました

|type  |Category            |	Persistent Bytes|	# Persistent|	# Transient	|Total Bytes	| # Total	|
|struct|All Heap Allocations|	327.91 KB	      |430	        |1265	        |9.77 MB	    |1695|
|class |All Heap Allocations|	326.17 KB	      |417	        |53	          |344.95 KB	  |470	|

## Memory Usage
Instruments.app 使えば良いのですが、Swift Advent Calendar を名乗っているので Swift からアクセスします。

```
memoryUsage() -> mach_vm_size_t {
    var info = UnsafeMutablePointer<mach_task_basic_info>.alloc(sizeof(mach_task_basic_info))
    var info_t = UnsafeMutablePointer<integer_t>(info)
    var count = mach_msg_type_number_t(
        sizeof(mach_task_basic_info) / sizeof(integer_t)
    )
    
    task_info(mach_task_self_, UInt32(MACH_TASK_BASIC_INFO), info_t, &count)
    let size = info.memory.resident_size
    info.destroy()
    return size
}
```

## CPU Usage

CPU 負荷にもアクセスします

```
func cpuUsage() -> time_value_t{
    var info = UnsafeMutablePointer<task_thread_times_info>.alloc(sizeof(task_thread_times_info))
    var info_t = UnsafeMutablePointer<integer_t>(info)
    var count = mach_msg_type_number_t(
        sizeof(task_thread_times_info) / sizeof(integer_t)
    )
    
    task_info(mach_task_self_, UInt32(TASK_THREAD_TIMES_INFO), info_t, &count)
    let userTime = info.memory.user_time
    info.destroy()
    return userTime
}
```

## 計測

```swift
var str = "dictav"
var src = Person(name: str, age: 33)
var srcCls = PersonClass(name: str, age: 33)

var (_,lastMemory,_) = memoryUsage()
var lastMSec = cpuUsage().microseconds

var sTotalMemoryUsage = 0
var sTotalCPUUsage = 0
var cTotalMemoryUsage = 0
var cTotalCPUUsage = 0
let loopCount = 100
let μs : integer_t = 1000000

for var n = 0; n <= loopCount; n++ {
var array : [Person] = []
var clsarray :[PersonClass] = []
    //class
    for var i = 0; i < 1000; i++ { clsarray.append(srcCls) }
    let (_,cm,_) = memoryUsage()
    let ccu = cpuUsage()
    let cms = ccu.seconds * μs + cpuUsage().microseconds
    if n > 0 {
        cTotalMemoryUsage += (cm - lastMemory)
        cTotalCPUUsage += (cms - lastMSec)
    }
    lastMemory = cm
    lastMSec = cms
    
    //struct
    for var i = 0; i < 1000; i++ { array.append(src) }
    let (_,sm,_) = memoryUsage()
    let scu = cpuUsage()
    let sms = scu.seconds * μs + cpuUsage().microseconds
    if n > 0 {
        sTotalMemoryUsage += (sm - lastMemory)
        sTotalCPUUsage += (sms - lastMSec)
    }
    lastMemory = sm
    lastMSec = sms
}

println("total")
println("struct: \(sTotalMemoryUsage)kBytes \(sTotalCPUUsage)μs")
println("class : \(cTotalMemoryUsage)kBytes \(cTotalCPUUsage)μs")

println("average")
println("struct: \(Float(sTotalMemoryUsage)/Float(loopCount))kBytes \(sTotalCPUUsage/loopCount)μs")
println("class : \(Float(cTotalMemoryUsage)/Float(loopCount))kBytes \(cTotalCPUUsage/loopCount)μs")
```

### 結果

```
total
struct: 348kBytes 692172μs
class : 48kBytes 703877μs
average
struct: 3.48kBytes 6921μs
class : 0.48kBytes 7038μs
```

## まとめ
今回一応計測はできて、期待したような結果は得られたけど、値について考察する時間とれなかった
