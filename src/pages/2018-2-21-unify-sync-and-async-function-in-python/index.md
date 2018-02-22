---
title: "Pythonで同期関数と非同期関数を統一的に扱う"
date: "2018-02-21T12:00:00Z"
path: "unify-sync-and-async-function-in-python"
category: Python
tags:
  - Python
  - Async
---


## Blockingな関数をasync化する方法

`EventLoop.run_in_executor` を使いましょう（結論）。  
https://docs.python.org/3/library/asyncio-eventloop.html

関数と引数を渡すとExecutorのコンテクストで実行してAwaitable(coroutine)を返してくれます。  
第一引数のexecutorは省略可能で、その場合は実行環境に応じたものが自動的に使われます。ThreadベースとProcessベースで性質が違いますので要求に応じて使い分けましょう。  
Executorにもよりますが引数はシリアライズ可能なものに限ります。名前付き引数はpartialで事前にbindしておく必要があります。

なおWindows環境特有の問題としてKeyboardInterruptをうまく扱えないみたいな問題があるようなのですがWindowsでプログラをミングすることがないので特に確かめたりとかはしてしません。  
参考: => https://gist.github.com/lambdalisue/05d5654bd1ec04992ad316d50924137c


## サンプル

おざなりですんません。  
チラシの裏レベルの書きなぐりですがいろいろなパターンの実装があります。手元で実行してみるとわかりやすいかとおもいます。

https://gist.github.com/hachibeeDI/f38bc0496fc9e29ddb3f45c08b88432d

```python

import asyncio
from time import sleep, time


def blocker(txt):
    sleep(3)
    return 'aaa' + txt


def async_sample(loop):
    start = time()
    results = loop.run_until_complete(asyncio.gather(
        loop.run_in_executor(None, blocker, '1'),
        loop.run_in_executor(None, blocker, '2'),
        loop.run_in_executor(None, blocker, '3'),
    ))
    time_took = time() - start

    print('time took', time_took)
    print(results)


async def async_sample2(loop):
    start = time()
    f1 = loop.run_in_executor(None, blocker, '1')
    f2 = loop.run_in_executor(None, blocker, '2')
    f3 = loop.run_in_executor(None, blocker, '3')

    print([
        await f1,
        await f2,
        await f3,
    ])
    time_took = time() - start
    print('time took', time_took)


def sync_sample():
    sync_start = time()
    sync_results = [
        blocker('1'),
        blocker('2'),
        blocker('3'),
    ]
    sync_time_took = time() - sync_start
    print(sync_time_took)
    print(sync_results)


from functools import partial


def promisify(loop, executor=None):

    def _promisified(func):

        def __inner(*a, **kw):
            return loop.run_in_executor(executor, partial(func, *a, *kw))

        return __inner

    return _promisified


loop = asyncio.get_event_loop()


@promisify(loop)
def promisified_blocker(txt):
    sleep(3)
    return 'aaa' + txt


async def promisify_sample():
    start = time()
    # f1 = promisified_blocker('1')
    # f2 = promisified_blocker('2')
    # f3 = promisified_blocker('3')
    # print([
    #     await f1,
    #     await f2,
    #     await f3,
    # ])
    print(await asyncio.gather(
        promisified_blocker('1'),
        promisified_blocker('2'),
        promisified_blocker('3'),
    ))
    time_took = time() - start
    print('time took', time_took)


if __name__ == '__main__':
    # async_sample(loop)
    # print('-' * 10)
    # loop.run_until_complete(async_sample2(loop))
    # print('-' * 10)
    # sync_sample()
    #

    loop.run_until_complete(promisify_sample())

    loop.close()

```


3秒の同期的スリープ関数を三回実行するサンプルでも、executor越しで実行すると並列に行われている様子が観察できるかとおもいます。

`run_in_executor` はcoroutineを返しますので、async関数内であれば結果をawaitで待つことも可能です。

何故かPythonの非同期関係のサンプルは副作用ベースで記述されているものばかりで返り値を持てないのかなとおもってしまわなくもなくはなくないですがちゃんと持てます。


## まとめ

asyncを使いはじめると既存の関数も同様のインターフェースで統一的に並列実行したくなることがかなりあるかとおもいます。  
そういうときに便利だとおもいます。

ただし適当に使っても高速化するかどうかは微妙なのでボトルネックに対して使うこと、そしてネックになっているのがIOなのかCPUなのかを検証してから使うようにするといいんじゃないかなーとおもいました。

終了。
