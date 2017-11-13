import React from 'react'

// Import typefaces
import 'typeface-montserrat'

import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <aside
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
          <a href="http://hachibeechan.hateblo.jp/">
            Blog articles not about tech are on here.
          </a>
        </div>
        <div>
          <a href="https://twitter.com/hatchinee">
            You might want to follow my twitter account.
          </a>
        </div>
        <div>
          <a href="https://github.com/hachibeeDI/hachibeeDI.github.io">
            GitHub repository which hosts this blog.
          </a>
        </div>
      </aside>
    )
  }
}

export default Bio
