webpackJsonp([0xacb67d2a2db0],{513:function(e,t){e.exports={data:{site:{siteMetadata:{title:"Hatch tech blog",author:"Ogura Daiki"}},markdownRemark:{id:"/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/src/pages/2017-11-07-how-to-get-javascript-intellisense-in-Vim/index.md absPath of file >>> MarkdownRemark",html:'<p>こちらは<a href="http://hachibeechan.hateblo.jp">旧ブログ</a>で書いた内容を微妙に修正したものですが、基本的に状況や知識や当時のものに基づいています。<br>\nツールの状況に変化があったら随時修正、追記しています。</p>\n<h2>結論</h2>\n<p>諦めが肝心（とりわけVimmer）</p>\n<p>NeoVimユーザーならdeoplete用のternソースが今のところ（2017年7月執筆当時）安定していますよ。<a href="https://github.com/hachibeeDI/deoplete-ternjs/tree/local-node_modules">hachibeeDI/deoplete-ternjs</a></p>\n<h2>今に至るJavaScript補完プロジェクト（オープンソース）の流れ</h2>\n<p>Salsa移行の流れについては今日何時間か雑にドキュメントやリポジトリを読んだだけなので間違ってたらすまない。</p>\n<ol start="0">\n<li>Ternjs</li>\n</ol>\n<p>  僕が知ってる一番古いomni completionプロジェクト。acornに移行したりしてるのでES.nextの補完もちゃんとできる。<br>\nDeopleteのSourceが壊れているのを修正している中で、もっと新しいプロジェクトないのかなと色々ググってた過程で発見したことを忘れないように書き留めておくのがこの日記の主旨だったりする。ちなみに動くように修正したブランチはこちら（<a href="https://github.com/hachibeeDI/deoplete-ternjs/tree/local-node_modules">https://github.com/hachibeeDI/deoplete-ternjs/tree/local-node_modules</a>）だけどやる気を失っている。</p>\n<ol>\n<li>Project Salsa</li>\n</ol>\n<p>  TypeScriptがJSの上位互換であることを利用して、JavaScriptの補完もやっちまおーぜ！ というプロジェクト（たぶん）。<br>\nオープンソースだよと謳っているものの、VSCode以外から利用することを一切考慮していない雰囲気がすごかったので却下。あとMSが作ったけど時期的な問題もあってLanguage Server Protocolには準拠していないっぽい。そして現状がどうなっているのかもわからない。</p>\n<ol start="2">\n<li>Language Server Protocol</li>\n</ol>\n<p>  MSがいいはじめたもので、言語の補完サーバの通信プロトコルを標準化しようぜという取り組み。JSON-RPCでやりとりするらしい。すでにいくつかの言語の補完サーバは準拠したインターフェースを提供している（Rustとか）し、各種エディタにClientの実装が存在している。補完なしで動的言語を書いてる期間が長くなりすぎて意識が低くなっていたので今日存在を認識した。<br>\n長くてめんどいので以下LSP。</p>\n<ol start="3">\n<li>javascript-typescript-langserver (<a href="https://github.com/sourcegraph/javascript-typescript-langserver">sourcegraph/javascript-typescript-langserver</a>)</li>\n</ol>\n<p>  LSP準拠のJSとTSの補完サーバ実装。たぶんおそらくMSのSalsaとは関係ない実装。一応動くのは確認した。</p>\n<p>そしてその他、プロプライエタリな実装や特定のIDEに依存した実装が存在している。</p>\n<h2>各種実装とVimの状況について</h2>\n<h3>Ternjs</h3>\n<p>Vimであれば枯れた実装のtern<em>for</em>vimなどが存在する。</p>\n<p>NeoVIm勢であれば暗黒の力を利用することができるのでdeoplete.nvimとdeopleteのSource（<a href="https://github.com/carlitux/deoplete-ternjs">carlitux/deoplete-ternjs</a>）を組み合わせれば動く。が、前述したように僕の環境では動かなかったのでforkを作った。</p>\n<p>が、調子にのって色々とリファクタリングをしまくっていたらdiffがでかくなりすぎてPRを送りにくい気持ちになってしまったのでどうしよう。あと補完に数秒かかるので普通に使い物にならない（たぶんternそのもののissue）。<br>\nさらに労力をかけるのであればLSP実装の方が明らかに将来性があるので気持ちが萎えている。</p>\n<h3>Salsa</h3>\n<p>Sublimeの実装があるので頑張ればVimからも使えそうだが、明らかに汎用で使うことを意図した実装ではなかったので却下。</p>\n<h3>LSP実装（javascript-typescript-langserver）</h3>\n<p>たぶんSourcegraphが一番大手？\nNeoVimで利用したい場合はこれとクライアントの実装（<a href="https://github.com/autozimu/LanguageClient-neovim">autozimu/LanguageClient-neovim</a>）を組み合わせれば良い。</p>\n<p>だがリポジトリを見て分かる通り、READMEに全くやる気がなく、使い方が初見では全くわからないようになっている。<br>\n簡単に解説するが、javascript-typescript-langserverをインストールすると、<code>javascript-typescript-langserver</code>と<code>javascript-typescript-stdio</code>の二つのコマンドが<code>$(npm bin)</code>に入る。前者がHTTPで通信して、後者は標準入出力で通信する。neovimのLanguageClientは標準入出力を使うので<code>javascript-typescript-stdio</code>を設定する。</p>\n<p>次に、こちらはSalsaと同じ方針で実装されており、TypeScriptを利用してJavaScriptの補完を行うことになる。つまり各種設定などもTypeScript流に行う必要がある。<br>\nちなみに筆者はTypeScriptは出始めに少しプロジェクトで使ったくらいなので現在のことは全くわからなかった。今日調べてわかったが、まともに型情報を揃えるのはクソだるそうだということだけがわかった。</p>\n<h4>javascript-typescript-langserverの.tern-projectにあたる設定</h4>\n<p>TypeScriptのコンパイル設定はtsconfig.jsonで行う。またjsconfig.jsonというものも存在しており、こちらを読み込む場合はjsAllowというオプションがtrueになった状態でコンパイラが起動する。LSPもコンパイラと同様の設定ファイルを利用する。<br>\nLSPに設定を食わせる方法だが、READMEには一切言及がない。実装をチラ読みした感じ、javascript-typescript-langserverはプロセスが立ち上がったカレントに存在するjsconfig.jsonを勝手に読み込むんじゃないかという雰囲気を感じる。systemdとかを使ってずっと立ち上げておく方法については謎である。</p>\n<p>さて、TypeScriptが補完を出すためには型情報が必要である。<br>\n筆者がTypeScriptを書いている頃にはtsdというのが存在しており、そしてそれが色々と問題を抱えていたためにdtsmというものが開発されていたが、どうやらそれらはobsoleteとなっているようだ。<br>\nどうやら<code>typings</code>というのが現状主流らしい………が、うまく動かねえ。どういうことだと色々探していたらtypingsも最近obsoleteとなり、今はnpmから<code>@types</code>の接頭をつけてインストールするようだ。落ち着け、俺はJavaScriptの補完がしたいだけなんだ……。</p>\n<p>ともかく、tsconfig.jsonもjsconfig.jsonも<code>@types</code>を使った型定義であれば特別なことは何もせずにデフォルトでよしなにしてくれるようになっている。今日1日でずいぶんTypeScriptのことをキャッチアップしてしまった。</p>\n<p>さてここでまた問題が発生した。<br>\n以下のようなソースコードの補完を試みた場合、Reactの型情報は読み込まれているもののES Modulesで宣言している変数にその型がついた状態にならない。</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n\nReact<span class="token punctuation">.</span><span class="token operator">|</span>  <span class="token comment" spellcheck="true">// &lt;- Componentsなどのキーワードが補完されない。他でRea…などと入力すれば型情報自体がロードされているのは確認できる。</span>\n</code></pre>\n      </div>\n<p>補完サーバのバグ、あるいはNeoVim側のclientプラグインのバグ……というかそもそもinputpatterns設定されてないんじゃね……？ とここまで考えてきたところで全てがめんどくさくなってきてしまった。<br>\nそもそもウチのプロジェクトはWebpackを使ったダーティなモジュール構成になっているのでTypeScriptのパーサがちゃんと理解できるとはおもえない。Webpackきらい。</p>\n<h2>まとめ</h2>\n<p>正直JavaScriptの補完ってバッファやキャッシュ越しの補完で十分だよね。JSX記法でComponentのpropsを補完してくれるのはうらやましいけど、JavaScriptで書く限りはpropsに型がつかないのでその恩恵も得られない。<br>\nVSCodeを使って、あるいはプロジェクトがTypeScriptで書かれているならともかく、Vimやその他エディタで頑張ってJavaScriptのインテリセンスを設定しようとするのは時間が余っている人以外にはおすすめできない。</p>\n<p>だけど、Language Server Protocol（LSP）自体はすごく正しくて、そして未来のあるプロジェクトだとおもうので今後も熱い視線を送ったり支援したりしましょうね。</p>\n<p>以上です。</p>',frontmatter:{path:"how-to-get-javascript-intellisense-in-Vim",title:"現代的な補完システムであるLanguage Server ProtocolとJavaScript版の運用、そしてVimとの連動についての雑なまとめ",date:"November 07, 2017",category:"Vim",tags:["JavaScript","Vim"]}}},pathContext:{path:"how-to-get-javascript-intellisense-in-Vim",next:{frontmatter:{title:"Gatsbyに前後記事へのリンクを追加する",path:"implement-next-and-previous-links-to-gatsby"}},prev:{frontmatter:{title:"Reduxにおけるバリデーションの実装パターンとReducerの呼び出し遅延について（debounced-action-dispatcherを作りました）",path:"redux-debounced-action-dispatcher"}}}}}});
//# sourceMappingURL=path---entry-how-to-get-javascript-intellisense-in-vim-eddea42e67ab59ad0e23.js.map