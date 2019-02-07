import React from 'react';
import Helmet from 'react-helmet';
import PostListing from '../components/post-listing';
import config from '../data/site-config';

export default class CategoryTemplate extends React.Component {
  render() {
    const {category} = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const title = `Posts in a category "${category}" | ${config.siteTitle}`;
    return (
      <section className="category-container">
        <Helmet title={title} />
        <PostListing title={title} postEdges={postEdges} />
      </section>
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(limit: 1000, sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {category: {eq: $category}}}) {
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
