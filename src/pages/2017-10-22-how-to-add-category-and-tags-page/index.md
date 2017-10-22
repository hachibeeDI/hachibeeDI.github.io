---
title: "GatsbyへCategoryとタグ機能を追加する"
date: "2017-10-22T12:00:00Z"
path: "/how-to-add-category-and-tags-page"
category: Blog
tags:
  - Blog
  - Gatsby
  - JavaScript
---

## Gatsbyへカテゴリーとタグのページを追加する方法

さて、Gatsbyですが標準ではカテゴリーやタグ追加の機能は用意されていません。なのでDIYしていく必要があります。頑張りましょう。  
簡単です。

今回の記事の制作にあたってはかなりの部分を https://github.com/Vagr9K/gatsby-advanced-starter を参考にいたしましたよ。


### 新規ページの生成

まず追加したいテンプレートファイルを生成します。どこでもいいのですが、今回は`src/templates/category.js`とします。


```javascript
import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";

import config from "../data/site-config";


class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    return this.props.postEdges.map(postEdge => {
      return {
        path: `/entry${postEdge.node.frontmatter.path}`,
        tags: postEdge.node.frontmatter.tags,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      };
    });
  }

  render() {
    const postList = this.getPostList();
    return (
      <section>
        <h2>カテゴリー一覧</h2>

        <ul className="categories">
          postList.map(post =>
            <li key={post.title}>
              <Link to={post.path}>
                {post.title}
              </Link>
            </li>
          )}
        </ul>
      </section>
    );
  }
}


export default class CategoryTemplate extends React.Component {
  render() {
    const category = this.props.pathContext.category;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <section className="category-container">
        <Helmet
          title={`Posts in category "${category}" | ${config.siteTitle}`}
        />
        <PostListing postEdges={postEdges} />
      </section>
    );
  }
}


export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            path
          }
        }
      }
    }
  }
`
```

こんな感じでいいでしょう。

次に、ページ生成の設定をします。Gatsbyで新しくページを追加するには`gatsby-node.js`ファイルを編集する必要があります。

すでにcreatePagesないにはblog-postページ生成のための設定があるはずだとおもいますので、そこにcategoryページの設定をねじこむだけです。  
まずgraphqlのクエリのfrontmatter以下にcategoryを追加します。frontmatter以下はMarkdownファイルのヘッダ部分が入ります。これを取得するには特に設定は不要です。

createPageを呼び出すごとにページが生成されます。関数の引数については雰囲気でわかるとおもいます。  
BlogPostと違い、CategoryやtagはMarkdown間の重複がありえますので、一度Setに入れて重複を除去します。URLについてはハイフン区切りが推奨されるようなので`_.kebabCase`しておきましょう。


```javascript
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []

    const categoryPage = path.resolve("src/templates/category.js")

    resolve(
      graphql(
        `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                path
                category
              }
            }
          }
        }
      }
    `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const categorySet = new Set();
        result.data.allMarkdownRemark.edges.forEach(edge => {
          const {frontmatter} = edge.node

          createPage({
            path: `/entry${frontmatter.path}`,
            component: blogPost,
            context: {
              path: frontmatter.path,
            },
          })

          categorySet.add(frontmatter.category)
        })

        Array.from(categorySet).forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category
            }
          })
        })

      })
    )
  })
}
```


これでcategoryページが生成（tagページも同様のやり方で可能です）されたはずです。  
`npm run develop`して`/categories/${categoryName}`を開いてみましょう。


### Blogページを少しいじる

blog-postのテンプレートファイルを開きましょう。  
次にGraphQLのクエリにcategoryを追加しましょう。gatsby-node.jsの時と同じ要領ですね。

あとはブログ記事のカテゴリー（tagもね）を表示しつつ、一覧ページへのリンクも追加しておきましょう。これには通常のanchorタグではなく、Gatsbyが用意してくれているLinkタグを使います。`React-router`のLinkタグと同じような動きをします。

```html
  <div>Category: <Link to={`/categories/${_.kebabCase(frontmatter.category)}`}>{frontmatter.category}</Link></div>
```

じゃあこんな感じで。  
見た目は各自良い感じにいじりましょう。


## まとめ

どうだったでしょうか。プラグインの形では用意されていませんが、結構簡単に機能を追加できたかとおもいます。GatsbyはまだまだWordPressなどのCMSのようにお手軽に色々とできはしませんが、フロントエンドの知識を持っている人であれば自然な形で機能を追加していけたかとおもいます。  
全てを手作業でする必要がありますが、逆にマークアップのレベルから全て制御できるというメリットもあるかとおもいます。はてなブログのスタイルを作ったこともありましたが、他人の書いた大規模マークアップのスタイルを当てていくのって結構大変ですよね。

ちなみに、見ての通りこのブログはまだ初期状態からほとんどCSSをいじっておりません。  
次はCSS周りの設定について書きます予定であります。
