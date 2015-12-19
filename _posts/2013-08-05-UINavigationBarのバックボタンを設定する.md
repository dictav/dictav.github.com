UINavigationBar のバックボタンに画像を入れようと思ったら思ったよりも面倒だったのでメモ。

UIViewController にて `self.navigationItem.backButtonItem` でバックボタンにアクセスできる。`self.navigationItem.backButtonItem.title = @"back back"`のようにすれば、バック時の文字を変更できる。

これを画像にしたかったら `self.navigationItem.backButtonItem.image = image` とすれば画像を挿入できる。とても簡単。ここまでは。
このようにした場合、いつも使われている左が角張った戻るボタンの中に画像が表示される。ぼくがやりたいのはこのボタン全体を画像に変えたいのだ。

## UIButton を使う

UIBarButtonItemにはcustomViewというプロパティがあり、UIBarButtonItem の中に UIButton を入れる事で思ったような形になってくれる。超クール、、じゃない！
わざわざ target と action を設定してメソッド書くなんてぜんぜんクールじゃない！
他にないの？

## -[UIBarButtonItem setBackButtonBackgroundImage:forState:barMetrics:]

もっとマシな方法はないのか、と探していたらあった。もののずばりだ。

```
[self.navigationItem.backButtonItem setBackButtonBackgroundImage:image
                                                        forState:UIControlStateNormal
                                                      barMetriocs:UIBarMetricsDefault]
```

### 落とし穴は２つ
１つ目は背景を設定しているだけなのでデフォルトでは前のビューのタイトルが表示される。これはこれで便利だけど、今回はボタンを表示だけさせたい。
対処法はベタに空白文字列を１文字入れることにした。

２つ目は背景画像が伸びる事。もともと前のビューのタイトルを表示するものなので、適切なサイズに背景画像を広げる仕様になっている。円なら綺麗に楕円になる。これでは困るので、表示したい画像の幅+αの画像を作り、必要ない部分は透過させることで対処。真ん中の部分が伸びるので、２倍より少し大きめに。

## UIAppearance 登場

上の方法でも良いのだけど毎ビューこれを設定するのはめんどう。もっとクールにならないの？と思ったら、iOS5からは UIAppearance が使える。
これはアプリ内の全体のデザインを統一するのに使う。

```
[UIBarButtonItem appearance] setBackButtonBackgroundImage:image
                                                 forState:UIControlStateNormal
				               barMetrics:UIBarMetricsDefault];
```

こんなコードを AppDelegate にでも書いておけば、それ以降のバックボタンは全部設定した画像になるはずだ。
