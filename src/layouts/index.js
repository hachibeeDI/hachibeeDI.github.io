import 'prismjs/themes/prism-okaidia.css';
import '../css/main.sass';


import React from 'react';
import Link from 'gatsby-link';

import Footer from '../components/footer';


const blogTitle = 'Hatch tech blog'


class Template extends React.Component {
  render() {
    const { location, children } = this.props;

    let rootPath = `/`;
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = `${__PATH_PREFIX__}/`;
    }

    let header;
    if (location.pathname === rootPath) {
      header = (
        <h1 className="blog-title">
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to="/"
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
            margin: 0,
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
      <section className="container">
        <header className="main-header" role="banner">
          <div className="main-header__inner">
            {header}
          </div>
        </header>
        <div className="main-section">

          {children()}

        </div>

        <Footer />
      </section>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
