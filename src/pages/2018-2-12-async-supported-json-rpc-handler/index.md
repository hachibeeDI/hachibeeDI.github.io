---
title: "Python製のJSON-RPCサーバーをAsyncに対応させた"
date: "2018-02-12T12:00:00Z"
path: "async-supported-json-rpc-handler"
category: Python
tags:
  - Python
  - JSON-RPC
  - Async
---

## 自作のJSON_-RPCサーバーをPython3のasync/await関数をサポートするように改良しました

これです。  
[hachibeeDI/py-json-rpc](https://github.com/hachibeeDI/py-json-rpc)

結構まえに書いた [REST APIに消耗したらJSON RPCを試そう](http://hachibeechan.hateblo.jp/entry/try-json-rpc-great-good) という記事で紹介してたアレですが、ちょっと前になんとなく非同期関数をサポートするように改修しました。  
記事を書いた当初はぶっちゃけはやんねーだろとタカをくくっていたGraphQLはアプリバックエンド用途で順調に流行りつつあり、それ以外のRPC的な領分ではgRPCが使われているような雰囲気をバリバリに感じている昨今ですが……。

JSON-RPCに限ったことではないですが、Pythonはasyncが導入されてから日が浅い……わけではないんですけども、いまだにold Pythonにこだわり続けるアホがたくさんいるせいで全く使われている気配がありません。  
（いちおう [aio-libs](https://github.com/aio-libs) のようなプロジェクトは存在していますが……）  

そのせいでせっかく導入されたいけてる新機能を試す機会がありません。またPythonのasyncやcoroutineの仕様やインターフェースがやたらと複雑なせいでドキュメントをチラ見するだけでは全く使いこなせる気配がありません。マジ無理。  
そういう意味で、セルフ教材的な意味合いを込めて実装した次第であります。

実用上のメリットとしましては、JSON-RPCの仕様に含まれているバッチ処理の高速化がのぞめます。  
例えばスクレイピングをしてくるような、呼び出しに3秒かかる関数が複数ある場合、 `aiohttp` などのライブラリを使ったasync関数をpy-json-rpcのレジスターに登録すれば、バッチ処理で複数呼んでも（コア数などによって制限はありますけど）3秒+αで呼び出しが完了します。やったね！  
調べてないですが、たぶんPythonでは非同期の並列処理に対応している唯一のJSON-RPCハンドラーなんじゃないんでしょうか。しらんけど。

恐らくPython2であってもsubprocessやthreadを利用することでバッチ処理の並列化は可能なんじゃないかとおもいますが、どちらも実装が複雑化してしまうリスクがありますし、とりわけPythonのthreadはオーバーヘッドが大きすぎるため通常の呼び出しにも影響をあたえる可能性があります。しかしasync/awaitならそういった問題は生じません（たぶん）。


## サンプル

```python

loop = asyncio.get_event_loop()
app = Registrator(loop=loop)


@app.register
async def plus_rpc(x, y):
    return x + y


@app.register
async def minus(x, y):
    return x - y


@app.register
async def heavy_request(a):
    print(f'start heavy request... {a}sec')
    await asyncio.sleep(a)
    print('end heavy request...')
    return 'home page!'


def test_plain():
    """
    登録した関数はPython内部からふつうによびだすこともできるよ！
    """
    result = asyncio.ensure_future(plus_rpc(1, 2))
    result = loop.run_until_complete(result)
    assert result == 3, result


def test_positional_rpc_call():
    rpc_result = app.dispatch({
        'jsonrpc': '2.0',
        'method': 'plus_rpc',
        'params': [1, 2],
        'id': 111,
    })
    assert rpc_result.get('result') == 3, rpc_result

```

はい。もちろんasync以外の関数も登録できますくわしくはREADMEとかテストコードで。  
クライアントリッチなWebアプリが普通になっている現代でサーバーサイドMVCは明らかに不要で、リモートから呼び出しできる関数として公開しておくのが一番だとおもうんですけどどうでしょうか？ 結局RESTはモヤッとした思想だけが存在してるだけで現実世界に適用できるものではありませんでしたし、GraphQLはリソースをひっぱってくるためのDSL（頑張れば魔改造はできそうですが……）なので、例えばマッシュアップした機能を提供するサーバーの用途にはそぐわないわけです。  
そういう意味でJSON-RPCはパパッとなんかを作るには最適なんじゃあないかなーどうなのかなー。  
Pythonの型定義からJSONSchemaや最近話題のprotobufの定義からエンドポイントに対応する `.d.ts` を生成したりしたら大規模アプリでも一気にはかどりそうかなーとも考えたのですが、Pythonでそれをやっていくと手軽さが失われるのでイマイチかもですね。


## まとめ

みなさんはやく3にあげてはやくおねがいしますはやくはやくいそいではやく。

2020年にはサポートが切れるうえにもはや言語仕様的にも使うメリットが何も存在しない処理系を使い続ける人たちは二度とFAXとかエクセル方眼紙をバカにしてはいけない。Unicodeまわりの変更が云々とか言っている人たちはそもそもPython2時点での仕様も理解できていなくて危険なのでなおさら3に移行したほうがいい。

コアのロジックは200行くらいなのでPythonのasyncがどういう感じのものなのかを理解したい人にもいいかもしれないですね。  
突貫工事でasync対応したので読みやすさは保証しません。あとロギングも一切していないのでやんないとですね。

以上。
