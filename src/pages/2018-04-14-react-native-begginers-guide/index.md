---
title: "React Native 101 （ビギナー忘備録）"
date: "2018-04-14T12:00:00Z"
path: "react-native-begginers-guide"
category: MobileApp
tags:
  - React
  - ReactNative
---


## はじめに

Reactの知識でマルチプラットフォームなモバイルアプリが作れちゃうと有名なReactNativeの初心者ガイド by 初心者です。  
学習しながらの走り書きなので新しい知見とかがあったら適時アップデートします。


## Setup編

### 拡張子

`.jsx`は使えない。`.js`前提。  
めっちゃ頑張ればいじれそうだけどやる意味ないので諦めるべし。


### babel pluginsの導入

npm installしてから`.babelrc`に追加する。


### flow or TypeScript

どっちでもいいけど、

- `react-native init` で作られるコードがflowを前提にしてる

- ReactNativeのビルドプロセスはTypeScriptを対象にしていないので自前でワークフローを作る必要があってめんどくさい

- TypeScriptの仕様があんま好きじゃない（個人の意見です）

ので当分はflowでやっていけばいーんじゃない？ みたいなかんじ。


## View編

## 組み込みのDOM Componentは基本的に利用できない

基本的に `import {Text, View} from "react-native";` みたいにしてreact-nativeが用意しているcomponentを使うべし。

この制約によってたとえStatelessFunctionalComponentであってもWebとReactNativeで共用するのは不可能になった……けど、そもそもモバイルアプリとWebでViewを共用できるわけないだろいい加減にしろ！  
Presentationに関わらないHoCは流用できる。


## ListViewよりもFlatList

ListViewはnativeのAPIを直訳しましたみたいな感じでヤベーなとおもったらだいぶマシっぽいのがあった。それがFlatList。  
基本はこっち使おう。というかListViewはdeprecated。

https://facebook.github.io/react-native/docs/flatlist.html


## Applicaion構築編

### 永続化Storage

当たり前だけどNativeなので専用のlibが必要。
Reduxを使っている場合、middlewareを使ってStoreと連携するかActionCreatorで個別にハンドリングする（ダサい）かの二択になりそう。

- https://github.com/realm/realm-js
- https://github.com/lolatravel/realm-react-redux

RealmがそもそもMobileApp開発用のライブラリなのでSchema定義が必要なORMはJS開発においてどうなんだろう。Store連携もrealm-react-reduxのExampleをパッとみた感じだいぶ筋が悪いようにみえる。  
ただしパフォーマンスは良い……。

もう一個の選択肢はAsyncStorage

https://facebook.github.io/react-native/docs/asyncstorage.html

実装的にはFileIOで実現してるっぽい？  
Storeとの連携は https://github.com/rt2zz/redux-persist が推奨されてる雰囲気だけどどうなんでしょうね。

どちらにしろ一長一短ありそうなのでStorage連携部分は疎結合 as far as possible　やっていきましょうね。


### Routingがカオス

ぶっちゃけReactはWebでもreact-routerとかいうライブラリが幅を効かせているくらいにはカオス。

さて、Webとモバイルappはルーティングの考え方がそもそも違う。モバイルはSceneを積み上げたりなんだりというあれなので脳を切り替えないといけない。

- React Navigation

  （半）公式。  
  https://facebook.github.io/react-native/docs/navigation.html

- react-native-router-flux （略してRNRF）

  日本語でググると真っ先に出てくる。**どの辺がfluxなの？**  
  https://github.com/aksonov/react-native-router-flux

- react-router （native)

  react-routerはwebだけじゃなくてnative用のアダプターも用意されてる。  
  https://reacttraining.com/react-router/native/guides/philosophy


RNRFがたくさんヒットするのはたぶんWeb系からReact Nativeに降りてきた層が多いから。  
……react-routerのnativeプラグインじゃあかんの？

RNRFのメリットみえてこない。react-routerが信用できない気持ちはわかるけど……  
react-routerはすごい勢いでクソコードを量産するイメージがあるのであまり採用したくない。

勘だけどReact Navigationが一番良さそう。公式でおすすめしてるし。  
RNRFにしろバックエンドはNavigation使ってるからここで学習コストけちってもどうせ後でハマる。Learn onceはありえない。  
まぁ何を採用するにしてもいつでも捨てれるような書き方をするべきだとおもう。


## まとめ

Setupはめっちゃ楽。ただしいうほどLearn onceでゎなぃ。  
でもNativeもMobileAppは独特の環境構築やらお作用やらが色々ある上に毎年のようにアップデートされてしんどいイメージがあるのでそこがないだけでめっちゃ楽。見た目だけで色々と批判されがちなPHP StyleのJSXだけど、StoryboardとSwiftコードとイベントハンドラとのクソ分離っぷりとXCodeとかいうの絶望IDEのジェットストリームアタックを回避できるのは最高便利。

Webのノリで開発できるかというとそんなことはないんだけど、逆にそこを変に抽象化せずに「違うものはちげえんだよ」の精神でAPI提供しているところに好感がもてる。しばらくやっていきます。
