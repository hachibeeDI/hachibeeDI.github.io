// const crypto = require('crypto');

const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const select = require('unist-util-select');
const fs = require('fs-extra');

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage, createNode} = boundActionCreators;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');
    const categoryPage = path.resolve('src/templates/category.js');
    const tagPage = path.resolve('src/templates/tags.jsx');

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(limit: 1000) {
              edges {
                node {
                  frontmatter {
                    title
                    path
                    category
                    tags
                    date
                  }
                }
                next {
                  frontmatter {
                    title
                    path
                  }
                }
                prev: previous {
                  frontmatter {
                    title
                    path
                  }
                }
              }
            }
          }
        `
      ).then(({errors, data}) => {
        if (errors) {
          console.log(errors);
          return reject(errors);
        }

        // Create blog posts pages.
        const categories = new Set();
        const tags = new Set();
        data.allMarkdownRemark.edges.forEach(({node, next, prev}) => {
          const {frontmatter} = node;

          const context = {...frontmatter, id: node.id, articlePath: frontmatter.path, next, prev};
          // because `path` is received by Gatsby
          delete context.path;

          createPage({
            path: `/entry/${frontmatter.path}`,
            articlePath: frontmatter.path,
            component: blogPost,
            context,
          });

          categories.add(frontmatter.category);
          frontmatter.tags.forEach(tags.add.bind(tags));
        });

        Array.from(categories).forEach(category =>
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category,
            },
          })
        );

        Array.from(tags).forEach(tag =>
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag,
            },
          })
        );
      })
    );
  });
};
