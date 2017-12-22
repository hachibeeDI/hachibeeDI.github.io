import React, { PureComponent } from 'react';


export default function Bio({className = ''}) {
  return (
    <aside className={`bio ${className}`} >
      <div className="bio__author-photo-space">
        <img
          src="//ja.gravatar.com/userimage/41771054/43d236d88acc75effc5d65af6bef4fe5.jpg?size=200"
          alt="Writer of this blog"
          className="bio__author-photo"
          style={{
            width: '64px',
            height: '64px',
          }}
        />
      </div>
      <div className="bio__author-description-space">
        <div className="bio__author-name">Ogura Daiki</div>
        <div className="bio__author-role">Developer</div>
        <ul className="bio__author-links">
          {/* TODO: make these links more fancy */}
          <li>
            Other articles is
            <a href="http://hachibeechan.hateblo.jp/" rel="noopener noreferrer">
              &nbsp;here.
            </a>
          </li>
          <li>
            <a href="https://twitter.com/hatchinee" rel="noopener noreferrer">
              Twitter account
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
