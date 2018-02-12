webpackJsonp([74075037689052],{406:function(n,a){n.exports={data:{site:{siteMetadata:{title:"Hatch tech blog",author:"Ogura Daiki"}},markdownRemark:{id:"/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/src/pages/2017-11-13-implement-next-and-previous-links-to-gatsby/index.md absPath of file >>> MarkdownRemark",html:'<h2>gatsby-nodeの修正</h2>\n<p>まずnodeの定義をします。</p>\n<p>GraphQLで前後の記事を持ってきます。</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token function">graphql</span><span class="token punctuation">(</span>\n  <span class="token template-string"><span class="token string">`\n    {\n      allMarkdownRemark(limit: 1000) {\n        edges {\n          node {\n            frontmatter {\n              path\n              category\n              tags\n            }\n          }\n          next {\n            frontmatter { title path }\n          }\n          prev: previous {\n            frontmatter { title path }\n          }\n        }\n      }\n    }\n  `</span></span>\n<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>次にentryページへ対象のobjectを渡します。</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>data<span class="token punctuation">.</span>allMarkdownRemark<span class="token punctuation">.</span>edges<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span>node<span class="token punctuation">,</span> next<span class="token punctuation">,</span> prev<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">{</span>frontmatter<span class="token punctuation">}</span> <span class="token operator">=</span> node\n\n  <span class="token function">createPage</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    path<span class="token punctuation">:</span> <span class="token template-string"><span class="token string">`/entry/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>frontmatter<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span>\n    component<span class="token punctuation">:</span> blogPost<span class="token punctuation">,</span>\n    context<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      id<span class="token punctuation">:</span> node<span class="token punctuation">.</span>id<span class="token punctuation">,</span>\n      path<span class="token punctuation">:</span> frontmatter<span class="token punctuation">.</span>path<span class="token punctuation">,</span>\n      next<span class="token punctuation">,</span>\n      prev<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<h2>Componentの編集</h2>\n<p>あとは適当にComponentを定義します。<code>props.pathContext</code>経由で取得できます。</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>next<span class="token punctuation">,</span> prev<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>pathContext\n</code></pre>\n      </div>\n<p>前後リンクへのComponentの実装サンプルです。</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">PostNav</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> prev<span class="token punctuation">,</span> next <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"post-nav"</span><span class="token operator">></span>\n    <span class="token punctuation">{</span>prev <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>\n      <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"post-nav__side"</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>span className<span class="token operator">=</span><span class="token string">"post-nav__label"</span><span class="token operator">></span>Previous Post<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>\n        <span class="token operator">&lt;</span>Link className<span class="token operator">=</span><span class="token string">"post-nav__link"</span> to<span class="token operator">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token string">`/entry/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>prev<span class="token punctuation">.</span>frontmatter<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">}</span><span class="token operator">></span>\n          <span class="token punctuation">{</span>prev<span class="token punctuation">.</span>frontmatter<span class="token punctuation">.</span>title<span class="token punctuation">}</span>\n        <span class="token operator">&lt;</span><span class="token operator">/</span>Link<span class="token operator">></span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n    <span class="token punctuation">)</span><span class="token punctuation">}</span>\n    <span class="token punctuation">{</span>next <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>\n      <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">"post-nav__side"</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>span className<span class="token operator">=</span><span class="token string">"post-nav__label"</span><span class="token operator">></span>Next Post<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>\n        <span class="token operator">&lt;</span>Link className<span class="token operator">=</span><span class="token string">"post-nav__link"</span> to<span class="token operator">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token string">`/entry/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>next<span class="token punctuation">.</span>frontmatter<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">}</span><span class="token operator">></span>\n          <span class="token punctuation">{</span>next<span class="token punctuation">.</span>frontmatter<span class="token punctuation">.</span>title<span class="token punctuation">}</span>\n        <span class="token operator">&lt;</span><span class="token operator">/</span>Link<span class="token operator">></span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n    <span class="token punctuation">)</span><span class="token punctuation">}</span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<h2>まとめ</h2>\n<p>雰囲気でやりましょう。<br>\n例によって細かい部分でうまくいかなかったりしたらこのブログのソースコードとかが参考になるかもです。</p>\n<p><a href="https://github.com/gatsbyjs/gatsby-starter-blog">gatsbyjs/gatsby-starter-blog</a>のデフォルトマークアップはあまりページネーションの設置に向いているようにおもえないのでそろそろ変えていく時期かもしれないですねー。</p>',frontmatter:{path:"implement-next-and-previous-links-to-gatsby",title:"Gatsbyに前後記事へのリンクを追加する",date:"November 13, 2017",category:"Gatsby",tags:["Blog","JavaScript","Gatsby"]}}},pathContext:{path:"implement-next-and-previous-links-to-gatsby",next:{frontmatter:{title:"現代的な補完システムであるLanguage Server ProtocolとJavaScript版の運用、そしてVimとの連動についての雑なまとめ",path:"how-to-get-javascript-intellisense-in-Vim"}},prev:{frontmatter:{title:"PythonにてFalseとして評価されるClassを作る",path:"falsy-class-in-Python"}}}}}});
//# sourceMappingURL=path---entry-implement-next-and-previous-links-to-gatsby-000f13bf1099cc3e9933.js.map