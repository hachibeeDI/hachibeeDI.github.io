import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

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
      <div>
        <Helmet title={`${frontmatter.title} | ${siteTitle}`} />
        <SEO postNode={post} postPath={frontmatter.path} postSEO />
        <h1 className="article-title">{frontmatter.title}</h1>
        <div>Category: {frontmatter.category}</div>
        <div>
          {frontmatter.tags.map(t => (
            <span key={t} className="tags">{t}</span>
          ))}
        </div>
        <p
          style={{
            fontSize: '12px',
            display: 'block',
            marginBottom: rhythm(1),
          }}
        >
          {frontmatter.date}
        </p>
        <article dangerouslySetInnerHTML={{ __html: post.html }} />

        <SNSShare title={frontmatter.title} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
      </div>
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
