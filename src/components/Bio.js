import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <p
        style={{
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src="https://ja.gravatar.com/userimage/41771054/43d236d88acc75effc5d65af6bef4fe5.jpg?size=200"
          alt="Ogura Daiki"
          style={{
            float: 'left',
            marginRight: rhythm(1 / 4),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <div>
          Written by <strong>Ogura Daiki</strong> who lives and works in Tokyo building useful things.
        </div>
        <div>
          <a href="https://github.com/hachibeeDI/hachibeeDI.github.io">
            This blog is hosted on Github.
          </a>
        </div>
      </p>
    )
  }
}

export default Bio
