import 'prismjs/themes/prism-okaidia.css';
import '../css/main.sass';

import React from 'react';
import Link from 'gatsby-link';

import Footer from '../components/footer';

export default class Template extends React.PureComponent {
  render() {
    const {location, children, data} = this.props;

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
            {data.site.siteMetadata.title}
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
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
            {data.site.siteMetadata.title}
          </Link>
        </h3>
      );
    }

    return (
      <section className="container">
        <header className="main-header" role="banner">
          <div className="main-header__inner">{header}</div>
        </header>
        <div className="main-section">{children()}</div>

        <Footer categories={data.categoryPages.edges} tags={data.tagPages.edges} />
      </section>
    );
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
};

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }

    tagPages: allSitePage(filter: {path: {regex: "^/tags/.+/"}}) {
      edges {
        node {
          id
          path
          context {
            category
          }
        }
      }
    }
    categoryPages: allSitePage(filter: {path: {regex: "^/categories/.+/"}}) {
      edges {
        node {
          id
          path
          context {
            category
          }
        }
      }
    }
  }
`;
