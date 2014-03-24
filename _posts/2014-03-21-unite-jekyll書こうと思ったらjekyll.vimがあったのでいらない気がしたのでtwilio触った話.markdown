---
layout: post
title: "unite-jekyll書こうと思ったらjekyll.vimがあったのでいらない気がしたのでtwilio触った話"
tags: twilio vim
---

[momonga.vim #3](http://partake.in/events/52a7b249-5183-4f1a-9e4f-22c1f0e436a5) に行ってきました。
予想以上にみんなもくもくしていて、すごくもくもくでした。


当初、jekyllを便利に使える unite source を書こうと思ったのですが、jekyll.vim が便利そうだったのでやる気をなくし、[XVim](https://www.google.co.jp/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0CCoQFjAA&url=https%3A%2F%2Fgithub.com%2FJugglerShu%2FXVim&ei=OdgrU83OGYW9kQWQ-4DgDQ&usg=AFQjCNGvknT-Chp31HaERR4Lwx5SQf4aaQ&sig2=jVt95pZAnyDurOpDz-pMag&bvm=bv.62922401,d.dGI) のビルドなどしてました。がんばってXcode5.1 でもビルドが通るようにしたのですが、うまく動かず、半泣きになってインターネット眺めていたら「developブランチならビルド動く」とのことだったのでビルドしてインストールしました。べんり。
ついでに ARC 対応のコードに書き換えてみたのですが、やたら落ちるのでそっと閉じたりしました。

# お昼食べたい
12時を回ってお昼な感じになったのですが、20人弱を収容できる場所があるかどうかという議論になりました。

thincaさん「電話して聞いてみなよ」

 **さすがVimmerな集いだな！電話もVimからするのか！！**

と思ったのですが、流石にその準備はなかったようで、ちょうど良いので作ることにしました。

# Vimで電話したい

昨年くらいから日本でもわいわい言われるようになったWebサービスに [twilio](http://twilio.com/) というのがあります。Web経由で電話をかけたり、受けたりすることができます。

準備するのは下記のような簡単な XML だけでオーケー。あとは REST API を叩くだけです。

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
	<Say language="ja-jp" voice="man">びむぅぅぅぅ</Say>
</Response>
```

## [TwiML](https://www.twilio.com/docs/api/twiml): the Twilio Markup Language
上のXMLは TwiML と呼ばれます。言葉を話させたり、音楽を流したり、フックして電話をかけたりSMS送ったりもできます。べんり。

自分でサーバーを立ち上げることで単純な応答だけでなく、さまざまなことができるようになりますが、簡単な処理でよければ [twimlbn](http://twimlbin.com/) のようなTwilML をホストしてくれるサービスを使うのが良いです。

## お金払う？
アカウントを作成すればトライアル版でも自分の電話番号へは電話することができます。
お金を払えば好きな番号へ自由にかけれるようになります。ミニマムで$20支払ってチャージし、その中から通話代が差し引かれるイメージです。電話をかけるのにも受けるのにも番号が必要ですが、1つ$1/monthで利用できます。

## Call

TwiML がホストされていれば `curl` で電話をかけれれます。

``` sh
$ curl -X POST 'https://api.twilio.com/2010-04-01/Accounts/[AccountSID]/Calls.json' \
--data-urlencode 'To=[ToNumber]'  \
--data-urlencode 'From=[FromNumber]'  \
-d 'Url=[TwilMLURL]'  \
-d 'Method=GET'  \
-d 'FallbackMethod=GET'  \
-d 'StatusCallbackMethod=GET'  \
-d 'Record=false' \
-u [AccountSID]:[AuthToken]
```

`[AccountSID]` と `[AuthToken]` はアカウント作成するともらえます。Dashboardで確認できます。
`[TwilMLURL]` は上でホストした TwilML の URL です。

`[ToNumber]` は相手の電話番号、[FromNumber] は twilio で取得した番号です。電話番号は +81012345678 のような国際番号を含みます。日本の番号は +81 から始まり、090xxxxxxxx の頭の 0 を抜いてくっつけます (+8190xxxxxxxx)。

> 国際電話
>
> twilioでは日本の番号（+81）ではない、海外の番号を取得することもできます。
> ただし、+81以外は日本の番号からかけると国際電話になるので注意。 
> ぼくは試しにイタリアの番号を取得してかけてみましたが、050plusからかけたら2秒くらいで20円くらいかかりました（ホワイトプランだと200円だぜ、どや by 050plus）

## プラギンしたい

とりあえず最低限の機能ができたので、見よう見まねでプラギン化してみました。
エラー処理とか入れてないからかなり中途半端。


https://github.com/dictav/twiliocall-vim


# もっと電話したい
ネタで作ったソフトウェアですが、うまく使えば意外に便利で、これから先のコミュニケーション手段の１つとして面白いんじゃないでしょうか？
現在は相手の番号やメッセージは全て直打ちなので、アドレス帳機能や、テンプレート、イエローページとの連携ができるようするともっと良いかもしれません。
ただ、それなら外部コマンドで実装した方が良かったかなあ。

気が向いたら。
