import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import { rhythm } from '../utils/typography'


class BlogIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <section>
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />

        <Bio />
        {posts
          .filter(post => post.node.path !== '/404/')
          .map(post => {
            const title = get(post, 'node.frontmatter.title') || post.node.path;
            return (
              <div key={post.node.frontmatter.path}>
                <h3 style={{marginBottom: rhythm(1 / 4)}}>
                  <Link style={{ boxShadow: 'none' }} to={`/entry${post.node.frontmatter.path}`}>
                    {post.node.frontmatter.title}
                  </Link>
                </h3>
                <small>{post.node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
              </div>
            )
          })
        }
      </section>
    )
  }
}
//
// BlogIndex.propTypes = {
//   route: React.PropTypes.object,
// }

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
