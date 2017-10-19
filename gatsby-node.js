const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []

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
              }
            }
          }
        }
      }
    `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const categorySet = new Set();
        result.data.allMarkdownRemark.edges.forEach(edge => {
          const {frontmatter} = edge.node

          createPage({
            path: `/entry${frontmatter.path}`,
            component: blogPost,
            context: {
              path: frontmatter.path,
            },
          })

          categorySet.add(frontmatter.category)
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

      })
    )
  })
}
