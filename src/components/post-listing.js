import React from "react";
import Link from "gatsby-link";


class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    return this.props.postEdges.map(postEdge => {
      return {
        path: `/entry${postEdge.node.frontmatter.path}`,
        tags: postEdge.node.frontmatter.tags,
        // cover: postEdge.node.frontmatter.cover,
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
          {/* Your post list here. */
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

export default PostListing;
