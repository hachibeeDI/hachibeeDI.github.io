import React from 'react';
import Link from 'gatsby-link';

export default function PostListing({title, postEdges}) {
  const posts = postEdges.map(({node}) => ({
    path: `/entry/${node.frontmatter.path}`,
    tags: node.frontmatter.tags,
    // cover: node.frontmatter.cover,
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    excerpt: node.excerpt,
    timeToRead: node.timeToRead,
  }));

  return (
    <section>
      <h2>{title}</h2>

      <ul className="categories">
        {posts.map(post => (
          <li key={post.title}>
            <Link to={post.path}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
