import React from 'react';
import Link from 'gatsby-link';


export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <h4 className="footer__title">
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to="/"
          >
            Hatch tech blog
          </Link>
        </h4>
        <div className="copyright">
          Copyright © 2017. Ogura Daiki
        </div>
      </div>
    </footer>
  );
}

