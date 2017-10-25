import React from "react";
import Link from "gatsby-link";


class PostListing extends React.Component {
  getPostList() {
    return this.props.postEdges.map(({node}) => ({
        path: `/entry${node.frontmatter.path}`,
        tags: node.frontmatter.tags,
        // cover: node.frontmatter.cover,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        excerpt: node.excerpt,
        timeToRead: node.timeToRead
      })
    )
  }

  render() {
    return (
      <section>
        <h2>カテゴリー一覧</h2>

        <ul className="categories">
          {this.getPostList().map(post =>
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

export default PostListing;
