import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import _ from 'lodash'

import Bio from '../components/Bio'
import SEO from '../components/SEO'
import SNSShare from '../components/sns-share'
import { rhythm, scale } from '../utils/typography'


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const {frontmatter} = post;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <article role="main">
        <Helmet title={`${frontmatter.title} | ${siteTitle}`} />
        <SEO postNode={post} postPath={frontmatter.path} postSEO />
        <header>
          <h1 className="article-title">{frontmatter.title}</h1>
          <nav role="navigation">
            <div>Category: <Link to={`/categories/${_.kebabCase(frontmatter.category)}`}>{frontmatter.category}</Link></div>
            <div>
              {frontmatter.tags.map(t => (
                <span key={t} className="tags">{t}</span>
              ))}
            </div>
          </nav>

          <p
            style={{
              fontSize: '12px',
              display: 'block',
              marginBottom: rhythm(1),
            }}
          >
            {frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />

        <footer>
          <SNSShare title={frontmatter.title} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
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
