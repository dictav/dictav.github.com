## Enumerations

Enumerations は `enum` を使って *keyword* と *members* を定義します。また Structures や Classes のようにメソッドを定義することもできますし、`extension` することもできます。

```swift
enum Animal {
    case Dog, Cat, Bear
}
extension Animal: Printable {
    var description: String {
        switch self {
        case .Dog:
            return "Dog"
        case .Cat:
            return "Cat"
        case .Bear:
            return "Bear"
        }
    }
}

println(Animal.Dog) // "Dog"
```

`switch` や `if` などの比較では Animal 型として比較するので、C のように値を比較するより安全です。
そもそも、標準の enum は値を持ちません。値を持たせるにはそれを指定（継承?）します。ただし、値として指定できる型は literal 表記ができるものに限られるようです。
また、値にアクセスするには `rawValue` property を使います。

```swift
enum Animal: String {
    case Dog = "Dog"
    case Cat = "Cat"
    case Bear = "Bear"
}

println(Animal.Dog.rawValue)

```

### Tuples
Enumerations では Tuples と組み合わせて特定のデータ構造について処理を振り分けたりするのに使うことができます。なかなか良い例が思い浮かびませんが、次のような感じでどうでしょうか？

```swift
enum Participant {
    case Speaker(name:String, title:String)
    case Listener(name:String, fees:Int)
}

func entry(participant: Participant) {
    switch participant {
    case let .Speaker(name, title):
        println("\(name) is a speaker")
    case let .Listener(name, fees) where fees > 5000:
        println("\(name) is a sponsor")
    case let .Listener(name, _):
        println("\(name) is a listner")
    }
}

let a = Participant.Listener(name: "dictav", fees: 10000)
entry(a)
// dictav is a sponsor
```

このように、個別にTypeを作るほどじゃないけど、みたいな時にも Enumerations + Tuples は使えそうです。
Enumerations, Tuples, Structures, Classes と沢山の Types の種類があるので上手に使い分けていきたい。
