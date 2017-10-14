---
title: "はてなから技術系記事をこちらに移転させます"
date: "2017-10-14T12:00:00Z"
path: "/first-announcement/"
---

## 技術系ブログ記事をはてなブログから移転します

今まではこちらのはてなブログ [タオルケット体操](http://hachibeechan.hateblo.jp/) で色々とごっちゃにしながらブログを書いてきましたが、て遊びに書いているゲームのレビュー記事ばかりがアクセスを集めていて何が何だかな感じになってしまったことや、カスタマイズがクソ面倒臭いこと、そしてhttps対応がどうにも後手であったことなどがひっかかってきたため、これから技術記事はGitHub.ioを利用してホスティングしていこうかとおもいます。


### ブログジェネレーターにはGatsbyを利用しました

[gatsbyjs/gatsby](https://github.com/gatsbyjs/gatsby)

ReactとGraphQLベースで作られた、SPAとして動作するらしいナウなブログジェネレーターみたいです。  
早いっぽいみたいです。あとReactなんでカスタマイズとかがしやすそうなのが気に入りました。どうやらですが、Nodeのサーバーを使ってGraphQLベースでホスティングすることもできるし、GitHub Pagesで運用できるようindex.html一枚で動作するようにもできるみたいです。たぶんGraphQLのリクエストに一枚層を被せているんでしょうがまだそこまでソースコードは読んでいません。


## GatsbyとGitHub.ioのアカウントページでブログを公開するまでのやりかた

ブログジェネレーターとしてではなく、どちらかといえば汎用的なCMSとして開発されているようです。  
そういう意味でカスタマイズ性はかなり高い（他のジェネレーターを使ったことがないのでわかりませんが…）ようにみえます。その反面、システムとしては複雑で、エンジニア以外の人間が運用するのは無理っぽいですね。そして、まだまだ若いプロジェクトなのでドキュメントがほとんどありません。適宜GitHubのIssueで行われている議論や、最悪ソースコードを読んでやっていく必要があります。そういう意味でフロントエンドに詳しくない人がこれを使うのはやめておいた方がいいでしょう。

検索すると何人か導入記事を書いている人がいるのですが、「GitHub Pagesで使える！」とか書いておきながらそっちには一切言及せずにNetlifyを使ってホスティングしている釣り記事ばっかりで全く役に立たず、正直なところこれをデプロイするまでにだいぶ手間取ってしまいました。

前置きはこの辺で使い方です。

あ、ちなみにですがたぶんNetlifyでホスティングしたほうがCI連携とかもしやすくてたぶん楽だとおもいます。


0. ${アカウント名}.github.io なリポジトリを作成

  この辺については記事が無数にあるので詳しくは説明しません。

  同時にdevelopというブランチも作っておきましょう。

1. Starterをクローン

  [gatsbyjs/gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog)

  ブログを書くのが目的なのであればとりあえずスターターキットを使うのがいいでしょう。

2. リモートブランチを紐付け

  `git remote set-url origin git@github.com:$(your-account)/$(account-name).github.io.git`
  あとはこのdevelopブランチをpushしておきましょう。

3. ビルドスクリプトの改変

  package.jsonに `deploy` というコマンドが登録されていますが、これはgh-pageようでアカウントページようには使えないので新しいものを登録します。  
  `"build-gh-io": "gatsby build --prefix-paths",` とでもしておきましょう。

4. デプロイ

  `npm run build-gh-io` を走らせることで `public` というディレクトリが生成されるはずです。  
  ビルドが完了したら `public` ディレクトリに移動しましょう。そしたら中で `git init` して、こちらも先ほどと同様にリモートブランチを登録します。  
  あとは `git add -u; git commit` して、masterブランチとしてoriginにpushしましょう。

```bash
$ npm run build-gh-io
$ cd public
$ git init
$ git remote set-url origin git@github.com:$(your-account)/$(account-name).github.io.git
$ git add -u
$ git commit
$ git push origin master
```


おめでとうございます。これでデプロイは完了です。Kyleさんの顔写真とデフォルトのポストがいくつか表示されているはずです。


#### Bioの改変と記事の投稿

grepかなんかすればわかりますがbioは `src/components/Bio.js` にあります。適当に編集しましょう。  
記事は `src/pages/` 以下にあります。適当に投稿しましょう。

おめでとうございます。これでブログはあなたのものです。


#### その他

`static/` 以下にfaviconとrobots.txtがあるので必要に応じて適当に編集しておくといいでしょう。  
sitemap.xmlは……暇なときに調べておきます。


ではこのへんで。
