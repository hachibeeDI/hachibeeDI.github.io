---
title: "Gatsbyでレイアウト全体やheadの内容をカスタマイズする方法"
date: "2017-10-30T12:00:00Z"
path: "customize-layout-gatsby-js"
category: Gatsby
tags:
  - Blog
  - Gatsby
  - JavaScript
---

今回の内容ですが、基本的に全部ここに書いてあります。  
https://www.gatsbyjs.org/docs/custom-html/

## 自作CSSの設置と読み込み

CSSの読み込みですが、Gatsby内部でstyle-loaderをサポートしていますので、他のJavaScriptと同じような形でimportすることができます。  
基本的なロードポイントは`src/layouts/index.js`ですので、そこで適当に`importt 'path/to/style.css'`するといいでしょう。


## headを編集して、SEO用のschemaやOGPの追加をしたい

### 1. React-helmetを使う

headの操作ですが、GatsbyはSPAなのでまずreact-helmetが基本になります。じゃないとOGPのリンクなどがずれてしまいますからね。

インストール方法は https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/ ですが、僕と同じスターターを使っている場合、最初からインストールされているとおもいます。


### 2. html.jsの編集

こちらは基本的には推奨されていません。殆どのサイトはdefaultで生成されるhtml.jsで事足りるはずーーとのことですが、パフォーマンスやSEOを求めていくと必要になることもあるかもしれません。

こちらは `src/html.js` に配置しておけば自動的に読み込まれます。  
一度ブログをビルドするとキャッシュが生成されますので、それをお手本に自作するといいでしょう。


```sh
$ cp .cache/default-html.js src/html.js
```

これで自作のhtml.jsが優先されるようになります。


## おまけ: Google analyticsやTwitterのシェアボタンのリンクなど

これら、代表的な外部スクリプはReactプラグイン、あるいはGatsbyのプラグインが提供されている可能性があります。

Google Analyticsは最初からインストールされていますので、`gatsby-config.js` を開き、  `gatsby-plugin-google-analytics` にtrackingIdを追加するだけで良いです。

Twitterも `gatsby-plugin-twitter` を追加すればscriptタグが追加されます。  
色々と探してみたり、自作したり、PRを送ってみたりしてもいいかもですね。


## まとめ

中身を読んだ方は気が付かれているかもしれませんが、デフォルトのHTMLはあまり出来が良いものではありません。CSSを抜きにしても、セマンティクスやSEOは一切考慮されていません。  
なのでそれなりに頑張ってブログを運営したい場合はそちらもやっていく必要があるでしょう。

僕もそれほどSEOに詳しいわけではないですが、基礎的な改良は加えていっているので興味があったらリポジトリーをウォッチしたり、いまここでDevToolを起動したりするといいかもしれません。
https://github.com/hachibeeDI/hachibeeDI.github.io
