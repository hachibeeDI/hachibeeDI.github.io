// const crypto = require('crypto');

const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const select = require('unist-util-select');
const fs = require('fs-extra');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createNode } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.js")
    const categoryPage = path.resolve("src/templates/category.js")
    const tagPage = path.resolve("src/templates/tags.jsx")

    resolve(
      graphql(
        `
        {
          allMarkdownRemark(limit: 1000) {
            edges {
              node {
                frontmatter {
                  path
                  category
                  tags
                }
              }
              next {
                frontmatter { title path }
              }
              prev: previous {
                frontmatter { title path }
              }
            }
          }
        }
        `
      )
        .then(({errors, data}) => {
          if (errors) {
            console.log(errors)
            return reject(errors)
          }

          console.log(data)
          // Create blog posts pages.
          const categories = new Set();
          const tags = new Set();
          data.allMarkdownRemark.edges
            .forEach(({node, next, prev}) => {
              const {frontmatter} = node

              createPage({
                path: `/entry/${frontmatter.path}`,
                component: blogPost,
                context: {
                  id: node.id,
                  path: frontmatter.path,
                  next,
                  prev,
                },
              });

              categories.add(frontmatter.category)
              frontmatter.tags.forEach(tags.add.bind(tags))
            });

          Array.from(categories)
            .forEach(category => createPage({
              path: `/categories/${_.kebabCase(category)}/`,
              component: categoryPage,
              context: {
                category
              }
            }));

          Array
            .from(tags)
            .forEach(tag => createPage({
              path: `/tags/${_.kebabCase(tag)}/`,
              component: tagPage,
              context: {
                tag
              },
            }));

        })
    );
  })
};
//
//
// exports.sourceNodes = async ({ boundActionCreators }) => {
//   const { createNode } = boundActionCreators
//
//   return new Promise(resolve => {
//     resolve(
//       graphql(
//         `
//         {
//           allMarkdownRemark(limit: 1000) {
//             edges {
//               node {
//                 frontmatter {
//                   category
//                   tags
//                 }
//               }
//             }
//           }
//         }
//         `
//       )
//         .then(({errors, data}) => {
//
//           const categories = new Set();
//           const tags = new Set();
//           data.allMarkdownRemark.edges
//             .forEach(({node, next, prev}) => {
//               const {frontmatter} = node
//
//               categories.add(frontmatter.category)
//               frontmatter.tags.forEach(tags.add.bind(tags))
//             });
//
//           const stringiMetadata = JSON.stringify({
//             categories,
//             tags,
//           });
//           createNode({
//             // Data for the node.
//             categories,
//             tags,
//
//             // Required fields.
//             id: 'siteExternalData',
//             parent: null, // or null if it's a source node without a parent
//             children: [],
//             internal: {
//               type: 'CoolServiceMarkdownField',
//               contentDigest: crypto
//                 .createHash('md5')
//                 .update(JSON.stringify(stringiMetadata))
//                 .digest('hex'),
//             // mediaType: 'text/markdown', // optional
//               content: JSON.stringify(stringiMetadata), // optional
//             }
//           });
//
//         })
//     );
//
//   });
// };
