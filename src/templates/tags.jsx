import React from 'react';
import Helmet from 'react-helmet';
import PostListing from '../components/post-listing';
import config from '../data/site-config';

export default class TagTemplate extends React.Component {
  render() {
    const {tag} = this.props.pathContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const title = `Posts contain a tag "${tag}"`;
    return (
      <section className="tag-container">
        <Helmet title={`${title} | ${config.siteTitle}`} />
        <PostListing title={title} postEdges={postEdges} />
      </section>
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(limit: 1000, sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {tags: {eq: $tag}}}) {
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
`;
