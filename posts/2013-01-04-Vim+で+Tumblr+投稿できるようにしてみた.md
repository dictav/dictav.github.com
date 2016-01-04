発端は unite.vim が素敵なので何か unite-source を作ってみようということでした。

ちょうど「最近、Blogの更新してないなー」なんて思っていたので、Vim から[Tumblr](http://tumblr.com/) の更新できたらいいなーと。

## Tumblr投稿用のWeb API を作る
OAuthは良いんですけど、一応、GitHubに公開を目指しているのでconsumer_key や api_key をアプリに埋め込むのは気が引けました。
各々にKeyを取得してもらうのもなんだかなーという感じです。

だったら、OAuth周りはWebに逃がして、そっちと通信する VimScript を書こうかなと。

で、サーバー側がこれ [http://tumblr-app.herokuapp.com](http://tumblr-app.herokuapp.com)

アクセスすると token と　ブログ一覧をくれるので、tokenと扱いたいブログをメモる。
end-point はこんな感じ

- GET /_token_/_blog_name_/posts
- GET /_token_/_blog_name_/_id_

token が分かれば閲覧は自由。
書き込み時には都度認証を行うようにしている。

- POST /_blog_name_/new
- POST /_blog_name_/_id_/update

まだ作りかけだけども、とりあえず動いてこうしてブログが書けるようになった。

VimScript側はまた次回。

