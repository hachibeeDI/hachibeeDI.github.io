const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.js")
    const categoryPage = path.resolve("src/templates/category.js")

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
          const categorySet = new Set();
          const tags = new Set();
          data.allMarkdownRemark.edges.forEach(({node, next, prev}) => {
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
            })

            categorySet.add(frontmatter.category)
            frontmatter.tags.forEach(tags.add.bind(tags))
          })

          Array.from(categorySet).forEach(category => {
            createPage({
              path: `/categories/${_.kebabCase(category)}/`,
              component: categoryPage,
              context: {
                category
              }
            })
          })

          Array.from(tags).forEach(tag => {
            // call createPage
          })

        })
    )
  })
}
