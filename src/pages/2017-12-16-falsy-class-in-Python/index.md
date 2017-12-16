---
title: "PythonにてFalseとして評価されるClassを作る"
date: "2017-12-16T12:00:00Z"
path: "falsy-class-in-Python"
category: Python
tags:
  - Python
  - MetaProgramming
---

Pythonを書いていて、クラス自体をbool文脈の中でFalseとして扱うための方法です。

知っての通り、Pythonでは`None`, `空文字`, `0`以外の全てのオブジェクトはbool文脈の中ではTrueと等価の扱いを受けます。  
しかし、自作クラスのインスタンスなどをFalseとして評価させたいというようなケースに対応するために、専用の`__`メソッドが存在します。

Python2では`__nonzero__`。  
Python3では`__bool__`を実装することで動作をカスタマイズできます。  
上記メソッドが実装されていない場合は、`__len__`も呼び出されます。


さて、上の方法だけでもインスタンスの動作をカスタマイズすることは出来ますが、``クラス自身``の評価結果を変えることは出来ません。
他にそんなことをしたい人がいるのかどうかは疑問ですが、そんなことをしたくなることも時にはあるので仕方がありません。


まず最初に思いつくのは、クラス自身に該当のメソッドを持たせることです。その為にクラスメソッドを使う方法です。


```python

class A(object):
    @classmethod
    def __nonzero__(self):
        return False

    @classmethod
    def __bool__(self):
        return False

A.__bool__()  # => False
bool(A)  # => True

```

例のように、これはうまくいきません。  
`A.__bool__()`がFalseを返してんだからいいじゃねえかと思いますが、理由はよくわかりません。classmethodは厳密にはクラスメンバであって、クラス自体のインスタンスメソッドではない（ややこしい）からなんでしょうかね?  
あるいはclassmethodはディスクリプタ様のネイティブコードで実装されているみたいなので、`bool`まわりの最適化で微妙に直感的じゃない動作をしてるんじゃあないかとか想像してますが、めんどくさくてそこまで追ってないのでわかりません。


仕方がないので正攻法でいきましょう。  
クラスにメソッドを実装することで、生成したインスタンスに動作が備わるわけですから、クラス自体のクラスにメソッドを付与してあげればいい気がします。

しかし、`A.__class__.__bool__ = __bool__`、これはうまくいきません。  
クラスのクラス、つまり`type`オブジェクトは組み込みのオブジェクトなので、Pythonではかなりダーティな事をしない限り拡張する事は出来ません。

ということで、回りくどくなりましたがクラスのクラス、つまりメタクラスを自作のクラスですげ替えれば良いわけです。

```python

class FailableKlass(type):
    def __init__(cls, name, bases, dct):
        super(FailableKlass, cls).__init__(name, bases, dct)
    def __nonzero__(self):
        return False
    def __bool__(self):
        return False


from six import add_metaclass


@add_metaclass(FailableKlass)
class A(object): pass

A.__bool__()  # => False
bool(A)  # => False
```


やりましたね。  
いつもに増して誰得ですが、なんか参考になったりとか系のことがあるといいですね。
