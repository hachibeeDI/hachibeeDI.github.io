import React, { PureComponent } from 'react';

// Import typefaces
import 'typeface-montserrat';


export default function Bio({className = ''}) {
  return (
    <aside className={`bio ${className}`} >
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
        <a href="http://hachibeechan.hateblo.jp/" rel="noopener noreferrer">
          Blog articles not about tech are here.
        </a>
      </div>
      <div>
        <a href="https://twitter.com/hatchinee" rel="noopener noreferrer">
          You might want to follow my twitter account.
        </a>
      </div>
      <div>
        <a href="https://github.com/hachibeeDI/hachibeeDI.github.io" rel="noopener noreferrer">
          GitHub repository which hosts this blog.
        </a>
      </div>
    </aside>
  );
}
