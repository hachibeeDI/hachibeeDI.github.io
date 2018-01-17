---
title: "Pythonのasync関数を扱いやすくする方法"
date: "2018-01-16T12:00:00Z"
path: "make-Pthons-async-easy"
category: Python
tags:
  - Python
  - async/await
---

## Pythonのasync関数を扱いやすくするライブラリの紹介

（最後に追記があります）

最新のPythonでは、JavaScriptのようにasync関数を使うことができるようになっています。しかしあまり普及しているようにはみえません。  
コミュニティの性質上いまだにPython2がのさばっていることや、JavaScriptのように非同期前提の設計にAPIが（まだ）なっていないなどの理由があるんじゃあないかと推測していますが、もう１つAPIが<s>古臭い</s>少々複雑であるというのも少なからず影響しているかとおもいます。

https://docs.python.org/3.6/library/asyncio-task.html

こちらがasync周りのドキュメントになっていますが、これだけ読んでも基本的な使い方ですらピンとくる人はなかなか少ないんじゃないかとおもいます。  
少なくともJavaScriptからやってきてこれを読んだ人は面喰らうのではないでしょうか。

ちなみに僕は何度も読んで理解したつもりにはなるのですが、暫く経つと何もわからなくなってしまいます。  
この記事も失われつつある記憶にすがりつつ書いてます。よろしくお願いします。


## CoroutineとFuture

まずPythonの非同期処理において我々ユーザーが扱うことになるのが、CoroutineとFuture（Promiseみたいなものです）というオブジェクトです。またイベントループも我々の手で明示的に作成する必要があります。  
（Taskというものもあるのですがややこしくなるので割愛します）

JavaScriptではasync関数がPromiseを返しますが、Pythonで帰ってくるのはあくまでCoroutineで、Futureではありません。  
また、Coroutine実行のスケジューリングなどもユーザーが自分の手でやる必要があります。これによって汎用性が増し、最適化の余地も広がる（たぶん）のですが、反面かなり読むのがしんどいコードが出来上がります。つーかこんなAPI覚えんの無理だよ！！！ 秒で忘れるわ！！

というわけで簡単なラッパーライブラリを作りました。


## Python asyncio toolkit for Humans™ ことfutures-shell

ほんとはfuturifyって名前にしたかったんですが使われてました。futuristも使われてました。僕の貧弱なボキャブラリーでは他に良い名前が思い浮かびませんでした。  
ちなみに煽り文はrequestsからインスパイアされました。あれもurllibという非人間的APIを使いやすくラップしたものでしたね。

Pythonのasync関数はボイラープレートコードが多いです。例えばasync関数から計算結果を取り出すためのコードは公式ドキュメントですと

```python

import asyncio

async def slow_operation(future):
    await asyncio.sleep(1)
    future.set_result('Future is done!')

loop = asyncio.get_event_loop()
future = asyncio.Future()
asyncio.ensure_future(slow_operation(future))
loop.run_until_complete(future)
print(future.result())
loop.close()

```

というようになってます。

引数でfuture渡してsetter経由で計算結果セット…なんて毎回やりたい作業じゃないはずです。そもそもこれだとasync関数からawaitで呼ぶときとイベントループ外から呼ぶときで方式変わっちゃって汎用性低くね？ やばくね？

というわけでこれです。[hachibeeDI/futures-shell](https://github.com/hachibeeDI/futures-shell)


```python

>>> from asyncio import get_event_loop, sleep
>>> from futures_shell import (
...     futurify,
...     unwrap,
... )

>>> @futurify
... async def slow_txt_return(txt):
...     await sleep(2)
...     return f'{txt} is done!'


>>> loop = get_event_loop()
>>> txt_result = unwrap(loop, slow_txt_return('Future'))
>>> print(txt_result)
Future is Done!

```

ワースゴーイ！ シンプルー！

`futurify` をデコレーターにつけることで自動的にasync関数がFutureを返すようになります。ちなみにですが、普通の同期関数につけることも可能で、その場合はその関数の結果がFutureに入ります。


## まとめ

ドキュメントを雑に読んで思いつきで実装したライブラリなので実用性皆無だとおもいますが、やたら登場する役者が多い上に低レイヤな解説に終始している公式の説明を理解するためのお供にどうでしょうか。

https://github.com/aio-libs みたいなものも登場しているので、徐々にですがPythonでも非同期関係のAPIが充実していくといいですね！ おしまい。


## 追記

もう一度ドキュメントを読み返していたら、実は僕のしょうもないラッパーなしでももうちょっと簡単に書けることが判明。  
実は `ensure_future` はcoroutineを渡された場合、Future(Task)化したオブジェクトを返り値に持ち、 `run_until_complete` はFutureの中身をunwrapするようです。

つまり最初に提示した公式のexampleは以下のように書き換えることが可能です


```python

import asyncio


async def slow_operation():
    await asyncio.sleep(1)
    return 'Future is done!'


loop = asyncio.get_event_loop()
result = asyncio.ensure_future(slow_operation())
unwraped_result = loop.run_until_complete(result)
print(unwraped_result)
loop.close()

```

……これでいいじゃん。さよなら僕の1時間。

もちろん僕の読み方が雑（特に英文を読むときはかなり酷い）なのもあるのですが、正直公式の例は間違ってはいないし丁寧でありつつも非効率的な書き方を助長するようになっているような気がしてなりません……。  
実際、世の中のasync関連の解説の多くがensure_futureとrun_until_completeが返り値を持つことに触れてません。

うーん、わかりやすさよりも正しさや詳細さを優先するということなのでしょうか……。  
今後、静的型検査の機能が公式にマージされたら各関数の型が明示されるようになってドキュメントもわかりやすくなるかもしれませんね。以上追記でした。

