---
title: "Reduxにおけるバリデーションの実装パターンとReducerの呼び出し遅延について（debounced-action-dispatcherを作りました）"
date: "2017-10-31T23:00:00Z"
path: "redux-debounced-action-dispatcher"
category: FrontEnd
cover: https://cdn-ak.f.st-hatena.com/images/fotolife/h/hachibeechan/20170714/20170714180530.png
tags:
  - JavaScript
  - React
  - Redux
---



アイデアです。  
ちなみにredux-observableやredux-sagaを導入している場合はそちらで解決したほうが良いんじゃないかとおもいます。


## MVXアプリケーションのバリデーションとパフォーマンス問題

Reduxを使っていなかったとしても、Reactを使って素朴にアプリケーションを開発しているとある程度以上の規模になって発生するのがバリデーションのパフォーマンスではなかろうか。

最初は一つのinputに対応するプロパティの正当性を素朴に判断するだけだったのが、ある程度の規模になった時点で同一モデルの他のプロパティも一緒に合わせてみなければいけなくなったり、あるいは他のモデルの面倒もみないといけなくなったり。
そのうちに、あちこちに散らばっていたバリデーションのロジックを一箇所に集めたくなる。それが終わったら次はパフォーマンスの問題だ。Facebookのアプリケーションなどを使ったことがある人はわかるだろうが、textboxで一文字入力するたびに画面がプチフリーズするうえ、ボタンを連打しようものならしばらくブラウザが固まってしまう。Facebookのアレはバリデーションの問題だけではないのだろうが、無関係でもないだろうとおもう。ともあれ、ユーザーの連続入力が終わるまでバリデーションを待機して別に悪いことはないだろう。

ここで問題になるのは、一体どこの関数呼び出しをdebounceするかという問題だ。

"純粋"関数縛りがあるのでreducerはなし。となるとActionCreatorかCallbackということになるが、ただでさえThunkやなんかのせいでカオスになりがちなActionCreatorにこれ以上余計なボイラープレートを噛ませたくない。
Callbackだが、例えばActionCreatorが常にPromiseを返すようにして終了を監視するようにすればあるいはバリデーションの非同期な呼び出しは可能かもしれないが、明らかに責務の範囲外で筋悪な実装のようにおもえる。

やはりActionをObserveしているReducerが、Storeへ引き起こす変更を検知してバリデーションを行うべきなのではないか。ですよね？



## そこでMiddleware（redux-debounced-action-dispatcher）

実はReduxの各層においてActionをObserveしているのはReducerだけではない。もうひとつMiddlewareでも同様のことが可能だ。
(ReduxのこれはMiddlewareというにはなんでもかんでも実装可能すぎてどうなんだろうという気持ちがないでもない)

というわけで作ってみた。  
[hachibeeDI/redux-debounced-action-dispatcher](https://github.com/hachibeeDI/redux-debounced-action-dispatcher)


サンプルにあるように、`TRIGGER_ACTIONS`にバリデーション（あるいはLocalStrageにキャッシュするとか）のキーとなるようなActionを宣言して、`DEBOUNCED_ACTION_TYPE`にそれを受けて発行させたいActionを宣言刷るだけというような使い方になる。

```javascript
import createDebounceMiddlewareGenerator from 'redux-debounced-action-dispatcher';


const TRIGGER_ACTIONS = [
  'HOGE_CHANGED',
  'FOO_CHANGED'
];

const VALIDATION_DEBOUNCE_TIME = 500;

export const DEBOUNCED_ACTION_TYPE = 'VALIDATE_ALL_DATA';

const debouncedValidationDispatcher = createDebounceMiddlewareGenerator(
  TRIGGER_ACTIONS,
  DEBOUNCED_ACTION_TYPE,
  VALIDATION_DEBOUNCE_TIME,
);

const store = createStore(
  todoApp,
  applyMiddleware(debouncedValidationDispatcher)
);
```

使いこなせるメンバーで構成されているならばredux-observableやredux-sagaなどが導入するEpicなんかで解決すればいいだろうが、これら2つのMiddlewareはそれなりに難解で、かつオーバーキルな印象がある。

僕の作ったMiddlewareの利点は簡単なことだ。  
逆に欠点はそもそもredux-actionsなしではカオスになりがちなActionの管理が、`TRIGGER_ACTIONS`が膨れ上がるとさらに意味不明になってしまうことだ。これは例えば正規表現のサポートを実装して、各アプリケーション内で厳格な命名規約を導入すれば防げるかもしれない。やる気が出たらやるかもしれない。


## まとめ

ReduxでSPAのエラー情報の管理を一体どうやっているのかの話をあまり見かけないので僕なりの考えを書いてみた。

たぶんもっといい方法があるだろうとはおもうので教えてくださいお願いします。

今ブログを書きながらふと思いついたが、そもそもエラー情報をReduxのStoreで管理するのはやめて、例えばreselect （https://github.com/reactjs/reselect） を使うようにするなんてのもありかもしれない。その場合、debounceは不可能になるがmemorizeしてくれるのでパフォーマンスへの影響も多少軽減できるのではないか。

まとまりがないけどもこちらからは以上です。
