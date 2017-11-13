---
title: "Gatsbyに前後記事へのリンクを追加する"
date: "2017-11-13T12:00:00Z"
path: "implement-next-and-previous-links-to-gatsby"
category: Gatsby
tags:
  - Blog
  - JavaScript
  - Gatsby
---


## gatsby-nodeの修正

まずnodeの定義をします。

GraphQLで前後の記事を持ってきます。

```javascript
graphql(
  `
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              path
              category
              tags
            }
          }
          next {
            frontmatter { title path }
          }
          prev: previous {
            frontmatter { title path }
          }
        }
      }
    }
  `
)
```

次にentryページへ対象のobjectを渡します。

```javascript
data.allMarkdownRemark.edges.forEach(({node, next, prev}) => {
  const {frontmatter} = node

  createPage({
    path: `/entry/${frontmatter.path}`,
    component: blogPost,
    context: {
      id: node.id,
      path: frontmatter.path,
      next,
      prev,
    },
  })
})
```


## Componentの編集


あとは適当にComponentを定義します。`props.pathContext`経由で取得できます。

```javascript
const {next, prev} = this.props.pathContext
```

前後リンクへのComponentの実装サンプルです。

```javascript
const PostNav = ({ prev, next }) => (
  <div className="post-nav">
    {prev && (
      <div className="post-nav__side">
        <span className="post-nav__label">Previous Post</span>
        <Link className="post-nav__link" to={`/entry/${prev.frontmatter.path}`}>
          {prev.frontmatter.title}
        </Link>
      </div>
    )}
    {next && (
      <div className="post-nav__side">
        <span className="post-nav__label">Next Post</span>
        <Link className="post-nav__link" to={`/entry/${next.frontmatter.path}`}>
          {next.frontmatter.title}
        </Link>
      </div>
    )}
  </div>
)
```


## まとめ


雰囲気でやりましょう。  
例によって細かい部分でうまくいかなかったりしたらこのブログのソースコードとかが参考になるかもです。

[gatsbyjs/gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog)のデフォルトマークアップはあまりページネーションの設置に向いているようにおもえないのでそろそろ変えていく時期かもしれないですねー。
