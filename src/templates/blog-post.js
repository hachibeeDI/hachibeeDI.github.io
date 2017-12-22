import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import _ from 'lodash';

import Bio from '../components/Bio';
import SEO from '../components/SEO';
import SNSShare from '../components/sns-share';
import {siteUrl} from '../data/site-config';


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
);


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const {frontmatter} = post;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    const {next, prev} = this.props.pathContext

    return (
      <article className="main-article" role="main">
        <Helmet title={`${frontmatter.title} | ${siteTitle}`} />
        <SEO postNode={post} postPath={frontmatter.path} postSEO />
        <header>
          <h1 className="article-title">{frontmatter.title}</h1>
          <nav role="navigation">
            <div>Category: <Link to={`/categories/${_.kebabCase(frontmatter.category)}`}>{frontmatter.category}</Link></div>
            <div>
              {frontmatter.tags.map(t => (
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
            {frontmatter.date}
          </p>
        </header>
        <section
          className="markdown-section"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer>
          <SNSShare title={frontmatter.title} link={`${siteUrl}entry/${frontmatter.path}`} />
          <hr
            style={{
              marginBottom: '26px',
            }}
          />
          <PostNav prev={prev} next={next} />
          <Bio />
        </footer>
      </article>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
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
`
