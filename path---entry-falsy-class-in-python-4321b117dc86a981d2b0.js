webpackJsonp([36935884228497],{407:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Hatch tech blog",author:"Ogura Daiki"}},markdownRemark:{id:"/Users/dogura/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/src/pages/2017-12-16-falsy-class-in-Python/index.md absPath of file >>> MarkdownRemark",html:'<p>Pythonを書いていて、クラス自体をbool文脈の中でFalseとして扱うための方法です。</p>\n<p>知っての通り、Pythonでは<code>None</code>, <code>空文字</code>, <code>0</code>以外の全てのオブジェクトはbool文脈の中ではTrueと等価の扱いを受けます。<br>\nしかし、自作クラスのインスタンスなどをFalseとして評価させたいというようなケースに対応するために、専用の<code>__</code>メソッドが存在します。</p>\n<p>Python2では<code>__nonzero__</code>。<br>\nPython3では<code>__bool__</code>を実装することで動作をカスタマイズできます。<br>\n上記メソッドが実装されていない場合は、<code>__len__</code>も呼び出されます。</p>\n<p>さて、上の方法だけでもインスタンスの動作をカスタマイズすることは出来ますが、<code>クラス自身</code>の評価結果を変えることは出来ません。\n他にそんなことをしたい人がいるのかどうかは疑問ですが、そんなことをしたくなることも時にはあるので仕方がありません。</p>\n<p>まず最初に思いつくのは、クラス自身に該当のメソッドを持たせることです。その為にクラスメソッドを使う方法です。</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n    @<span class="token builtin">classmethod</span>\n    <span class="token keyword">def</span> <span class="token function">__nonzero__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">return</span> <span class="token boolean">False</span>\n\n    @<span class="token builtin">classmethod</span>\n    <span class="token keyword">def</span> <span class="token function">__bool__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">return</span> <span class="token boolean">False</span>\n\nA<span class="token punctuation">.</span>__bool__<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># => False</span>\n<span class="token builtin">bool</span><span class="token punctuation">(</span>A<span class="token punctuation">)</span>  <span class="token comment"># => True</span>\n</code></pre>\n      </div>\n<p>例のように、これはうまくいきません。<br>\n<code>A.__bool__()</code>がFalseを返してんだからいいじゃねえかと思いますが、理由はよくわかりません。classmethodは厳密にはクラスメンバであって、クラス自体のインスタンスメソッドではない（ややこしい）からなんでしょうかね?<br>\nあるいはclassmethodはディスクリプタ様のネイティブコードで実装されているみたいなので、<code>bool</code>まわりの最適化で微妙に直感的じゃない動作をしてるんじゃあないかとか想像してますが、めんどくさくてそこまで追ってないのでわかりません。</p>\n<p>仕方がないので正攻法でいきましょう。<br>\nクラスにメソッドを実装することで、生成したインスタンスに動作が備わるわけですから、クラス自体のクラスにメソッドを付与してあげればいい気がします。</p>\n<p>しかし、<code>A.__class__.__bool__ = __bool__</code>、これはうまくいきません。<br>\nクラスのクラス、つまり<code>type</code>オブジェクトは組み込みのオブジェクトなので、Pythonではかなりダーティな事をしない限り拡張する事は出来ません。</p>\n<p>ということで、回りくどくなりましたがクラスのクラス、つまりメタクラスを自作のクラスですげ替えれば良いわけです。</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">FailableKlass</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> name<span class="token punctuation">,</span> bases<span class="token punctuation">,</span> dct<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token builtin">super</span><span class="token punctuation">(</span>FailableKlass<span class="token punctuation">,</span> cls<span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span>name<span class="token punctuation">,</span> bases<span class="token punctuation">,</span> dct<span class="token punctuation">)</span>\n    <span class="token keyword">def</span> <span class="token function">__nonzero__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">return</span> <span class="token boolean">False</span>\n    <span class="token keyword">def</span> <span class="token function">__bool__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token keyword">return</span> <span class="token boolean">False</span>\n\n\n<span class="token keyword">from</span> six <span class="token keyword">import</span> add_metaclass\n\n\n@add_metaclass<span class="token punctuation">(</span>FailableKlass<span class="token punctuation">)</span>\n<span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">pass</span>\n\nA<span class="token punctuation">.</span>__bool__<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># => False</span>\n<span class="token builtin">bool</span><span class="token punctuation">(</span>A<span class="token punctuation">)</span>  <span class="token comment"># => False</span>\n</code></pre>\n      </div>\n<p>やりましたね。<br>\nいつもに増して誰得ですが、なんか参考になったりとか系のことがあるといいですね。</p>',frontmatter:{path:"falsy-class-in-Python",title:"PythonにてFalseとして評価されるClassを作る",date:"December 16, 2017",category:"Python",tags:["Python","MetaProgramming"]}}},pathContext:{path:"falsy-class-in-Python",next:{frontmatter:{title:"現代的な補完システムであるLanguage Server ProtocolとJavaScript版の運用、そしてVimとの連動についての雑なまとめ",path:"how-to-get-javascript-intellisense-in-Vim"}},prev:{frontmatter:{title:"Gatsbyでレイアウト全体やheadの内容をカスタマイズする方法",path:"customize-layout-gatsby-js"}}}}}});
//# sourceMappingURL=path---entry-falsy-class-in-python-4321b117dc86a981d2b0.js.map