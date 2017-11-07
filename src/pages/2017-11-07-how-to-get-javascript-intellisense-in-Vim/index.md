---
title: "現在的な補完システムであるLanguage Server ProtocolとJavaScript版の運用、そしてVimとの連動についての雑なまとめ"
date: "2017-11-07T12:00:00Z"
path: "/how-to-get-javascript-intellisense-in-Vim"
category: Vim
tags:
  - JavaScript
  - Vim
---


こちらは[旧ブログ](http://hachibeechan.hateblo.jp)で書いた内容を微妙に修正したものですが、基本的に状況や知識や当時のものに基づいています。  
ツールの状況に変化があったら随時修正、追記しています。


## 結論

諦めが肝心（とりわけVimmer）

NeoVimユーザーならdeoplete用のternソースが今のところ（2017年7月執筆当時）安定していますよ。[hachibeeDI/deoplete-ternjs](https://github.com/hachibeeDI/deoplete-ternjs/tree/local-node_modules)



## 今に至るJavaScript補完プロジェクト（オープンソース）の流れ

Salsa移行の流れについては今日何時間か雑にドキュメントやリポジトリを読んだだけなので間違ってたらすまない。

0. Ternjs

  僕が知ってる一番古いomni completionプロジェクト。acornに移行したりしてるのでES.nextの補完もちゃんとできる。  
  DeopleteのSourceが壊れているのを修正している中で、もっと新しいプロジェクトないのかなと色々ググってた過程で発見したことを忘れないように書き留めておくのがこの日記の主旨だったりする。ちなみに動くように修正したブランチはこちら（[https://github.com/hachibeeDI/deoplete-ternjs/tree/local-node_modules](https://github.com/hachibeeDI/deoplete-ternjs/tree/local-node_modules)）だけどやる気を失っている。


1. Project Salsa

  TypeScriptがJSの上位互換であることを利用して、JavaScriptの補完もやっちまおーぜ！ というプロジェクト（たぶん）。  
  オープンソースだよと謳っているものの、VSCode以外から利用することを一切考慮していない雰囲気がすごかったので却下。あとMSが作ったけど時期的な問題もあってLanguage Server Protocolには準拠していないっぽい。そして現状がどうなっているのかもわからない。

2. Language Server Protocol

  MSがいいはじめたもので、言語の補完サーバの通信プロトコルを標準化しようぜという取り組み。JSON-RPCでやりとりするらしい。すでにいくつかの言語の補完サーバは準拠したインターフェースを提供している（Rustとか）し、各種エディタにClientの実装が存在している。補完なしで動的言語を書いてる期間が長くなりすぎて意識が低くなっていたので今日存在を認識した。  
  長くてめんどいので以下LSP。

3. javascript-typescript-langserver ([sourcegraph/javascript-typescript-langserver](https://github.com/sourcegraph/javascript-typescript-langserver))

  LSP準拠のJSとTSの補完サーバ実装。たぶんおそらくMSのSalsaとは関係ない実装。一応動くのは確認した。


そしてその他、プロプライエタリな実装や特定のIDEに依存した実装が存在している。



## 各種実装とVimの状況について

### Ternjs

Vimであれば枯れた実装のtern_for_vimなどが存在する。

NeoVIm勢であれば暗黒の力を利用することができるのでdeoplete.nvimとdeopleteのSource（[carlitux/deoplete-ternjs](https://github.com/carlitux/deoplete-ternjs)）を組み合わせれば動く。が、前述したように僕の環境では動かなかったのでforkを作った。

が、調子にのって色々とリファクタリングをしまくっていたらdiffがでかくなりすぎてPRを送りにくい気持ちになってしまったのでどうしよう。あと補完に数秒かかるので普通に使い物にならない（たぶんternそのもののissue）。  
さらに労力をかけるのであればLSP実装の方が明らかに将来性があるので気持ちが萎えている。


### Salsa

Sublimeの実装があるので頑張ればVimからも使えそうだが、明らかに汎用で使うことを意図した実装ではなかったので却下。


### LSP実装（javascript-typescript-langserver）

たぶんSourcegraphが一番大手？
NeoVimで利用したい場合はこれとクライアントの実装（[autozimu/LanguageClient-neovim](https://github.com/autozimu/LanguageClient-neovim)）を組み合わせれば良い。

だがリポジトリを見て分かる通り、READMEに全くやる気がなく、使い方が初見では全くわからないようになっている。  
簡単に解説するが、javascript-typescript-langserverをインストールすると、`javascript-typescript-langserver`と`javascript-typescript-stdio`の二つのコマンドが`$(npm bin)`に入る。前者がHTTPで通信して、後者は標準入出力で通信する。neovimのLanguageClientは標準入出力を使うので`javascript-typescript-stdio`を設定する。

次に、こちらはSalsaと同じ方針で実装されており、TypeScriptを利用してJavaScriptの補完を行うことになる。つまり各種設定などもTypeScript流に行う必要がある。  
ちなみに筆者はTypeScriptは出始めに少しプロジェクトで使ったくらいなので現在のことは全くわからなかった。今日調べてわかったが、まともに型情報を揃えるのはクソだるそうだということだけがわかった。


#### javascript-typescript-langserverの.tern-projectにあたる設定

TypeScriptのコンパイル設定はtsconfig.jsonで行う。またjsconfig.jsonというものも存在しており、こちらを読み込む場合はjsAllowというオプションがtrueになった状態でコンパイラが起動する。LSPもコンパイラと同様の設定ファイルを利用する。  
LSPに設定を食わせる方法だが、READMEには一切言及がない。実装をチラ読みした感じ、javascript-typescript-langserverはプロセスが立ち上がったカレントに存在するjsconfig.jsonを勝手に読み込むんじゃないかという雰囲気を感じる。systemdとかを使ってずっと立ち上げておく方法については謎である。

さて、TypeScriptが補完を出すためには型情報が必要である。  
筆者がTypeScriptを書いている頃にはtsdというのが存在しており、そしてそれが色々と問題を抱えていたためにdtsmというものが開発されていたが、どうやらそれらはobsoleteとなっているようだ。  
どうやら`typings`というのが現状主流らしい………が、うまく動かねえ。どういうことだと色々探していたらtypingsも最近obsoleteとなり、今はnpmから`@types`の接頭をつけてインストールするようだ。落ち着け、俺はJavaScriptの補完がしたいだけなんだ……。

ともかく、tsconfig.jsonもjsconfig.jsonも`@types`を使った型定義であれば特別なことは何もせずにデフォルトでよしなにしてくれるようになっている。今日1日でずいぶんTypeScriptのことをキャッチアップしてしまった。

さてここでまた問題が発生した。  
以下のようなソースコードの補完を試みた場合、Reactの型情報は読み込まれているもののES Modulesで宣言している変数にその型がついた状態にならない。

```javascript
import React from 'react';

React.|  // <- Componentsなどのキーワードが補完されない。他でRea…などと入力すれば型情報自体がロードされているのは確認できる。
```

補完サーバのバグ、あるいはNeoVim側のclientプラグインのバグ……というかそもそもinputpatterns設定されてないんじゃね……？ とここまで考えてきたところで全てがめんどくさくなってきてしまった。  
そもそもウチのプロジェクトはWebpackを使ったダーティなモジュール構成になっているのでTypeScriptのパーサがちゃんと理解できるとはおもえない。Webpackきらい。


## まとめ

正直JavaScriptの補完ってバッファやキャッシュ越しの補完で十分だよね。JSX記法でComponentのpropsを補完してくれるのはうらやましいけど、JavaScriptで書く限りはpropsに型がつかないのでその恩恵も得られない。  
VSCodeを使って、あるいはプロジェクトがTypeScriptで書かれているならともかく、Vimやその他エディタで頑張ってJavaScriptのインテリセンスを設定しようとするのは時間が余っている人以外にはおすすめできない。

だけど、Language Server Protocol（LSP）自体はすごく正しくて、そして未来のあるプロジェクトだとおもうので今後も熱い視線を送ったり支援したりしましょうね。


以上です。

