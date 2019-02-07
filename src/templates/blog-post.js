import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import _ from 'lodash';
import {graphql} from 'gatsby';

import Bio from '../components/Bio';
import SEO from '../components/SEO';
import SNSShare from '../components/sns-share';
import {siteUrl} from '../data/site-config';

const PostNav = ({prev, next}) => (
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
);

class BlogPostTemplate extends React.PureComponent {
  render() {
    const {pageContext} = this.props;
    const post = this.props.data.markdownRemark;

    return (
      <article className="main-article" role="main">
        <Helmet title={`${pageContext.title} | ${this.props.data.site.siteMetadata.title}`} />
        <SEO postNode={post} postPath={pageContext.path} postSEO />
        <header>
          <h1 className="article-title">{pageContext.title}</h1>
          <nav role="navigation">
            <div>
              Category: <Link to={`/categories/${_.kebabCase(pageContext.category)}`}>{pageContext.category}</Link>
            </div>
            <div>
              {pageContext.tags.map(t => (
                <Link key={t} className="tags" to={`/tags/${_.kebabCase(t)}`}>
                  <span>{t}</span>
                </Link>
              ))}
            </div>
          </nav>

          <p
            style={{
              fontSize: '12px',
              display: 'block',
              marginBottom: '26px',
            }}
          >
            {pageContext.date}
          </p>
        </header>
        <section className="markdown-section" dangerouslySetInnerHTML={{__html: post.html}} />

        <footer>
          <SNSShare title={pageContext.title} link={`${siteUrl}entry/${pageContext.path}`} />
          <hr
            style={{
              marginBottom: '26px',
            }}
          />
          <PostNav prev={pageContext.prev} next={pageContext.next} />
          <Bio />
        </footer>
      </article>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query($articlePath: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: {path: {eq: $articlePath}}) {
      id
      html
      frontmatter {
        path
        title
        date(formatString: "MMMM DD, YYYY")
        category
        tags
      }
    }
  }
`;
