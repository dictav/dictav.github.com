以下の２つのサイトを<del>まるパクリ</del>参考にして RSS を取得して表示する WordPress の Widget を作った。

- [WordPressのウィジェットを自作するためのTips](http://kachibito.net/wordpress/custom/how-to-add-your-widget.html)
- [RSSなどのxmlファイルを静的なHTMLに表示させる方法あれこれ（2012.9.4追記）](http://memo.ark-under.net/memo/366)

ソースコードはこちら。これを functions.php の中に貼付けると、ウィジェットから選択できる。
<style></style>
<script src="https://gist.github.com/3877796.js?file=word_press_widget.php"></script>

ウィジェットではタイトルと Feed URL を登録可能。
テーマの functions.php に書き込むとアップデートで消えちゃうので気が向いたら plugin にしよう。
でも、RSS のプラグイン腐る程あるから作るの微妙だね。
