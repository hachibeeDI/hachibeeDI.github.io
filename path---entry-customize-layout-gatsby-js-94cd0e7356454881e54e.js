webpackJsonp([0xb4cd88ae8617],{410:function(t,e){t.exports={data:{site:{siteMetadata:{title:"Hatch tech blog",author:"Ogura Daiki"}},markdownRemark:{id:"/Users/dogura/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/src/pages/2017-10-30-improve-SEO-gatsby-js/index.md absPath of file >>> MarkdownRemark",html:'<p>今回の内容ですが、基本的に全部ここに書いてあります。<br>\n<a href="https://www.gatsbyjs.org/docs/custom-html/">https://www.gatsbyjs.org/docs/custom-html/</a></p>\n<h2>自作CSSの設置と読み込み</h2>\n<p>CSSの読み込みですが、Gatsby内部でstyle-loaderをサポートしていますので、他のJavaScriptと同じような形でimportすることができます。<br>\n基本的なロードポイントは<code>src/layouts/index.js</code>ですので、そこで適当に<code>importt \'path/to/style.css\'</code>するといいでしょう。</p>\n<h2>headを編集して、SEO用のschemaやOGPの追加をしたい</h2>\n<h3>1. React-helmetを使う</h3>\n<p>headの操作ですが、GatsbyはSPAなのでまずreact-helmetが基本になります。じゃないとOGPのリンクなどがずれてしまいますからね。</p>\n<p>インストール方法は <a href="https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/">https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/</a> ですが、僕と同じスターターを使っている場合、最初からインストールされているとおもいます。</p>\n<h3>2. html.jsの編集</h3>\n<p>こちらは基本的には推奨されていません。殆どのサイトはdefaultで生成されるhtml.jsで事足りるはずーーとのことですが、パフォーマンスやSEOを求めていくと必要になることもあるかもしれません。</p>\n<p>こちらは <code>src/html.js</code> に配置しておけば自動的に読み込まれます。<br>\n一度ブログをビルドするとキャッシュが生成されますので、それをお手本に自作するといいでしょう。</p>\n<div class="gatsby-highlight">\n      <pre class="language-sh"><code>$ cp .cache/default-html.js src/html.js</code></pre>\n      </div>\n<p>これで自作のhtml.jsが優先されるようになります。</p>\n<h2>おまけ: Google analyticsやTwitterのシェアボタンのリンクなど</h2>\n<p>これら、代表的な外部スクリプはReactプラグイン、あるいはGatsbyのプラグインが提供されている可能性があります。</p>\n<p>Google Analyticsは最初からインストールされていますので、<code>gatsby-config.js</code> を開き、  <code>gatsby-plugin-google-analytics</code> にtrackingIdを追加するだけで良いです。</p>\n<p>Twitterも <code>gatsby-plugin-twitter</code> を追加すればscriptタグが追加されます。<br>\n色々と探してみたり、自作したり、PRを送ってみたりしてもいいかもですね。</p>\n<h2>まとめ</h2>\n<p>中身を読んだ方は気が付かれているかもしれませんが、デフォルトのHTMLはあまり出来が良いものではありません。CSSを抜きにしても、セマンティクスやSEOは一切考慮されていません。<br>\nなのでそれなりに頑張ってブログを運営したい場合はそちらもやっていく必要があるでしょう。</p>\n<p>僕もそれほどSEOに詳しいわけではないですが、基礎的な改良は加えていっているので興味があったらリポジトリーをウォッチしたり、いまここでDevToolを起動したりするといいかもしれません。\n<a href="https://github.com/hachibeeDI/hachibeeDI.github.io">https://github.com/hachibeeDI/hachibeeDI.github.io</a></p>',frontmatter:{path:"customize-layout-gatsby-js",title:"Gatsbyでレイアウト全体やheadの内容をカスタマイズする方法",date:"October 30, 2017",category:"Gatsby",tags:["Blog","Gatsby","JavaScript"]}}},pathContext:{path:"customize-layout-gatsby-js",next:{frontmatter:{title:"PythonにてFalseとして評価されるClassを作る",path:"falsy-class-in-Python"}},prev:{frontmatter:{title:"Reduxにおけるバリデーションの実装パターンとReducerの呼び出し遅延について（debounced-action-dispatcherを作りました）",path:"redux-debounced-action-dispatcher"}}}}}});
//# sourceMappingURL=path---entry-customize-layout-gatsby-js-94cd0e7356454881e54e.js.map