import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import { rhythm } from '../utils/typography'


function Card({title, path, excerpt, date}) {
  return (
    <section className="article-card">
      <h3 className="article-card__title">
        <Link style={{ boxShadow: 'none' }} to={`/entry/${path}`}>
          {title}
        </Link>
      </h3>
      <small>{date}</small>
      <p className="article-card__excerpt" dangerouslySetInnerHTML={{ __html: excerpt }} />
    </section>
  )
}


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
            const {
              node: {
                frontmatter: {
                  title,
                  path,
                  date
                },
                excerpt
              }
            } = post;
            return (<Card key={path} title={title} path={path} excerpt={excerpt} date={date} />)
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
