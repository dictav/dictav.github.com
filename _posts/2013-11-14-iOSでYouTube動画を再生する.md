---
layout: post
title: iOSでYouTube動画を再生する
date: 2013-11-14
tags: mailgun
---

iOSで動画を再生したい場合、以下の３つの方法が思い浮かぶ。

1. UIWebView
2. MPMoviePlayerController
3. AVPlayer

1 はとても簡単で、html書いて中でYouTube再生するようなコーディングすればいい。
ただ、１と２では再生時にフルスクリーン再生するようなデザインしかできない（はず）なので、UIの中に動画再生の仕組みを入れたい場合は3でやる必要がある。

# YouTubeのURL
2や3において、次のようなYouTubeのURL `http://www.youtube.com/watch?v=70-k4JO4bTs` を再生することはできない。そこでこれを使う

[HCYoutubeParser](https://github.com/hellozimi/HCYoutubeParser)

>HCYoutubeParser is a class which lets you get the iOS compatible video url from YouTube so you don't need to use a UIWebView or open the YouTube Application.
>
>Warning: This is not approved by the ToC of YouTube. Use at own risk.

*保証外ね！本気だす人はちゃんとストリーミングするべし*

これさえあれば簡単にMPMoviePlayerControllerやAVPlayerで再生できるURLがゲットできるので、あとはよしなに。


```
NSDictionary *dict = [HCYoutubeParser h264videosWithYoutubeURL:srcURL];
NSURL *url = [NSURL URLWithString:dict[@"medium"]];
AVPlayer *player = [AVPlayer playerWithURL:url];
```



