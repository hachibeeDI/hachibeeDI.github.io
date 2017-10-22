webpackJsonp([34090190811920],{"./node_modules/json-loader/index.js!./.cache/json/entry-how-to-add-category-and-tags-page.json":function(n,s){n.exports={data:{site:{siteMetadata:{title:"Hatch tech blog",author:"Ogura Daiki"}},markdownRemark:{id:"/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/src/pages/2017-10-22-how-to-add-category-and-tags-page/index.md absPath of file >>> MarkdownRemark",html:'<h2>Gatsbyへカテゴリーとタグのページを追加する方法</h2>\n<p>さて、Gatsbyですが標準ではカテゴリーやタグ追加の機能は用意されていません。なのでDIYしていく必要があります。頑張りましょう。<br>\n簡単です。</p>\n<p>今回の記事の制作にあたってはかなりの部分を <a href="https://github.com/Vagr9K/gatsby-advanced-starter">https://github.com/Vagr9K/gatsby-advanced-starter</a> を参考にいたしましたよ。</p>\n<h3>新規ページの生成</h3>\n<p>まず追加したいテンプレートファイルを生成します。どこでもいいのですが、今回は<code>src/templates/category.js</code>とします。</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Helmet <span class="token keyword">from</span> <span class="token string">"react-helmet"</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Link <span class="token keyword">from</span> <span class="token string">"gatsby-link"</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> config <span class="token keyword">from</span> <span class="token string">"../data/site-config"</span><span class="token punctuation">;</span>\n\n\n<span class="token keyword">class</span> <span class="token class-name">PostListing</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">getPostList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> postList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>postEdges<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>postEdge <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        path<span class="token punctuation">:</span> <span class="token template-string"><span class="token string">`/entry</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>postEdge<span class="token punctuation">.</span>node<span class="token punctuation">.</span>frontmatter<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span>\n        tags<span class="token punctuation">:</span> postEdge<span class="token punctuation">.</span>node<span class="token punctuation">.</span>frontmatter<span class="token punctuation">.</span>tags<span class="token punctuation">,</span>\n        title<span class="token punctuation">:</span> postEdge<span class="token punctuation">.</span>node<span class="token punctuation">.</span>frontmatter<span class="token punctuation">.</span>title<span class="token punctuation">,</span>\n        date<span class="token punctuation">:</span> postEdge<span class="token punctuation">.</span>node<span class="token punctuation">.</span>frontmatter<span class="token punctuation">.</span>date<span class="token punctuation">,</span>\n        excerpt<span class="token punctuation">:</span> postEdge<span class="token punctuation">.</span>node<span class="token punctuation">.</span>excerpt<span class="token punctuation">,</span>\n        timeToRead<span class="token punctuation">:</span> postEdge<span class="token punctuation">.</span>node<span class="token punctuation">.</span>timeToRead\n      <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> postList <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getPostList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token operator">&lt;</span>section<span class="token operator">></span>\n        <span class="token operator">&lt;</span>h2<span class="token operator">></span>カテゴリー一覧<span class="token operator">&lt;</span><span class="token operator">/</span>h2<span class="token operator">></span>\n\n        <span class="token operator">&lt;</span>ul className<span class="token operator">=</span><span class="token string">"categories"</span><span class="token operator">></span>\n          postList<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>post <span class="token operator">=></span>\n            <span class="token operator">&lt;</span>li key<span class="token operator">=</span><span class="token punctuation">{</span>post<span class="token punctuation">.</span>title<span class="token punctuation">}</span><span class="token operator">></span>\n              <span class="token operator">&lt;</span>Link to<span class="token operator">=</span><span class="token punctuation">{</span>post<span class="token punctuation">.</span>path<span class="token punctuation">}</span><span class="token operator">></span>\n                <span class="token punctuation">{</span>post<span class="token punctuation">.</span>title<span class="token punctuation">}</span>\n              <span class="token operator">&lt;</span><span class="token operator">/</span>Link<span class="token operator">></span>\n            <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">></span>\n          <span class="token punctuation">)</span><span class="token punctuation">}</span>\n        <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">></span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>section<span class="token operator">></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">CategoryTemplate</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> category <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>pathContext<span class="token punctuation">.</span>category<span class="token punctuation">;</span>\n    <span class="token keyword">const</span> postEdges <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>data<span class="token punctuation">.</span>allMarkdownRemark<span class="token punctuation">.</span>edges<span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token operator">&lt;</span>section className<span class="token operator">=</span><span class="token string">"category-container"</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>Helmet\n          title<span class="token operator">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token string">`Posts in category "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>category<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">" | </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>config<span class="token punctuation">.</span>siteTitle<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">}</span>\n        <span class="token operator">/</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>PostListing postEdges<span class="token operator">=</span><span class="token punctuation">{</span>postEdges<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>section<span class="token operator">></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> pageQuery <span class="token operator">=</span> graphql<span class="token template-string"><span class="token string">`\n  query CategoryPage($category: String) {\n    allMarkdownRemark(\n      limit: 1000\n      sort: { fields: [frontmatter___date], order: DESC }\n      filter: { frontmatter: { category: { eq: $category } } }\n    ) {\n      totalCount\n      edges {\n        node {\n          excerpt\n          timeToRead\n          frontmatter {\n            title\n            tags\n            date\n            path\n          }\n        }\n      }\n    }\n  }\n`</span></span>\n</code></pre>\n      </div>\n<p>こんな感じでいいでしょう。</p>\n<p>次に、ページ生成の設定をします。Gatsbyで新しくページを追加するには<code>gatsby-node.js</code>ファイルを編集する必要があります。</p>\n<p>すでにcreatePagesないにはblog-postページ生成のための設定があるはずだとおもいますので、そこにcategoryページの設定をねじこむだけです。<br>\nまずgraphqlのクエリのfrontmatter以下にcategoryを追加します。frontmatter以下はMarkdownファイルのヘッダ部分が入ります。これを取得するには特に設定は不要です。</p>\n<p>createPageを呼び出すごとにページが生成されます。関数の引数については雰囲気でわかるとおもいます。<br>\nBlogPostと違い、CategoryやtagはMarkdown間の重複がありえますので、一度Setに入れて重複を除去します。URLについてはハイフン区切りが推奨されるようなので<code>_.kebabCase</code>しておきましょう。</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>exports<span class="token punctuation">.</span>createPages <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> graphql<span class="token punctuation">,</span> boundActionCreators <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">{</span> createPage <span class="token punctuation">}</span> <span class="token operator">=</span> boundActionCreators\n\n  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> pages <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n\n    <span class="token keyword">const</span> categoryPage <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">"src/templates/category.js"</span><span class="token punctuation">)</span>\n\n    <span class="token function">resolve</span><span class="token punctuation">(</span>\n      <span class="token function">graphql</span><span class="token punctuation">(</span>\n        <span class="token template-string"><span class="token string">`\n      {\n        allMarkdownRemark(limit: 1000) {\n          edges {\n            node {\n              frontmatter {\n                path\n                category\n              }\n            }\n          }\n        }\n      }\n    `</span></span>\n      <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>result <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">.</span>errors<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>errors<span class="token punctuation">)</span>\n          <span class="token function">reject</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>errors<span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token comment" spellcheck="true">// Create blog posts pages.</span>\n        <span class="token keyword">const</span> categorySet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        result<span class="token punctuation">.</span>data<span class="token punctuation">.</span>allMarkdownRemark<span class="token punctuation">.</span>edges<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>edge <span class="token operator">=></span> <span class="token punctuation">{</span>\n          <span class="token keyword">const</span> <span class="token punctuation">{</span>frontmatter<span class="token punctuation">}</span> <span class="token operator">=</span> edge<span class="token punctuation">.</span>node\n\n          <span class="token function">createPage</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            path<span class="token punctuation">:</span> <span class="token template-string"><span class="token string">`/entry</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>frontmatter<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span>\n            component<span class="token punctuation">:</span> blogPost<span class="token punctuation">,</span>\n            context<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n              path<span class="token punctuation">:</span> frontmatter<span class="token punctuation">.</span>path<span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n          categorySet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>frontmatter<span class="token punctuation">.</span>category<span class="token punctuation">)</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n        Array<span class="token punctuation">.</span><span class="token keyword">from</span><span class="token punctuation">(</span>categorySet<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>category <span class="token operator">=></span> <span class="token punctuation">{</span>\n          <span class="token function">createPage</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            path<span class="token punctuation">:</span> <span class="token template-string"><span class="token string">`/categories/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>_<span class="token punctuation">.</span><span class="token function">kebabCase</span><span class="token punctuation">(</span>category<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/`</span></span><span class="token punctuation">,</span>\n            component<span class="token punctuation">:</span> categoryPage<span class="token punctuation">,</span>\n            context<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n              category\n            <span class="token punctuation">}</span>\n          <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>これでcategoryページが生成（tagページも同様のやり方で可能です）されたはずです。<br>\n<code>npm run develop</code>して<code>/categories/${categoryName}</code>を開いてみましょう。</p>\n<h3>Blogページを少しいじる</h3>\n<p>blog-postのテンプレートファイルを開きましょう。<br>\n次にGraphQLのクエリにcategoryを追加しましょう。gatsby-node.jsの時と同じ要領ですね。</p>\n<p>あとはブログ記事のカテゴリー（tagもね）を表示しつつ、一覧ページへのリンクも追加しておきましょう。これには通常のanchorタグではなく、Gatsbyが用意してくれているLinkタグを使います。<code>React-router</code>のLinkタグと同じような動きをします。</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>Category: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation">=</span>{`/categories/${_.kebabCase(frontmatter.category)}`}</span><span class="token punctuation">></span></span>{frontmatter.category}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Link</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n</code></pre>\n      </div>\n<p>じゃあこんな感じで。<br>\n見た目は各自良い感じにいじりましょう。</p>\n<h2>まとめ</h2>\n<p>どうだったでしょうか。プラグインの形では用意されていませんが、結構簡単に機能を追加できたかとおもいます。GatsbyはまだまだWordPressなどのCMSのようにお手軽に色々とできはしませんが、フロントエンドの知識を持っている人であれば自然な形で機能を追加していけたかとおもいます。<br>\n全てを手作業でする必要がありますが、逆にマークアップのレベルから全て制御できるというメリットもあるかとおもいます。はてなブログのスタイルを作ったこともありましたが、他人の書いた大規模マークアップのスタイルを当てていくのって結構大変ですよね。</p>\n<p>ちなみに、見ての通りこのブログはまだ初期状態からほとんどCSSをいじっておりません。<br>\n次はCSS周りの設定について書きます予定であります。</p>',frontmatter:{path:"/how-to-add-category-and-tags-page",title:"GatsbyへCategoryとタグ機能を追加する",date:"October 22, 2017",category:"Blog",tags:["Blog","Gatsby","JavaScript"]}}},pathContext:{path:"/how-to-add-category-and-tags-page"}}}});
//# sourceMappingURL=path---entry-how-to-add-category-and-tags-page-725d0cbbf7e0e6e30c8b.js.map