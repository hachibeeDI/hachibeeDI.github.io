import 'prismjs/themes/prism-okaidia.css'
import '../css/base.css'


import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'

import Footer from '../components/footer'
import { rhythm, scale } from '../utils/typography'


const blogTitle = 'Hatch tech blog'


class Template extends React.Component {
  render() {
    const { location, children } = this.props

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    let header
    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {blogTitle}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {blogTitle}
          </Link>
        </h3>
      )
    }

    return (
      <Container style={{
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)} 0 ${rhythm(3 / 4)}`,
        minHeight: '90vh'}
      }>
        <section>
          <header role="banner">
            {header}
          </header>

          {children()}

          <Footer />
        </section>
      </Container>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
