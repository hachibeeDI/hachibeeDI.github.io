import React from 'react'
import Helmet from "react-helmet";


export default function SNSShare ({title, link}) {
  const encodedLink = encodeURIComponent(link)

  return (
    <ul className="sns-share__area">
      <Helmet>
        <script
          type="text/javascript"
          src="//b.st-hatena.com/js/bookmark_button.js"
          charset="utf-8"
          async="async"
        />
      </Helmet>

      <li className="sns-share__button">
        <a
          href="http://b.hatena.ne.jp/entry/"
          className="hatena-bookmark-button"
          data-hatena-bookmark-layout="vertical-normal"
          data-hatena-bookmark-lang="ja"
          title="このエントリーをはてなブックマークに追加"
          >
          <img
            src="//b.st-hatena.com/images/entry-button/button-only@2x.png"
            alt="このエントリーをはてなブックマークに追加"
            width="20" height="20"
            style={{border: 'none'}}
          />
        </a>
      </li>

      <li className="sns-share__button">
        <a
          href="https://twitter.com/share"
          className="twitter-share-button"
          data-via="hatchinee"
          data-size="large"
          >
          Tweet
        </a>
      </li>

    </ul>
  )

  // return (
  //   <ul className="sns-share--area">
  //     <li>
  //       <a
  //         href={`http://b.hatena.ne.jp/entry/${title}`}
  //         className="hatena-bookmark-button sns-share--bookmark sns-share--link"
  //         data-hatena-bookmark-title={title}
  //         data-hatena-bookmark-layout="simple"
  //         title="このエントリーをはてなブックマークに追加"
  //         data-hatena-bookmark-initialized="1"
  //         rel="noopener"
  //         target="_blank"
  //         >
  //         <i className="blogicon-bookmark lg"></i></a>
  //     </li>
  //     <li>
  //       <a
  //         className="sns-share--twitter sns-share--link" href={`https://twitter.com/intent/tweet?url=${encodedLink}&text=${title}&via=hatchinee`} target="_blank">
  //         <i className="blogicon-twitter lg"></i></a>
  //     </li>
  //     <li>
  //       <a
  //         className="sns-share--facebook sns-share--link"
  //         href={`https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`}
  //         target="_blank"
  //         rel="noopener"
  //         >
  //         <i className="blogicon-facebook lg"></i></a>
  //     </li>
  //
  //     {/* 
  //     <li>
  //       <a className="sns-share--rss sns-share--link" href="http://cloud.feedly.com/#subscription%2Ffeed%2Fhttp://hachibeechan.hateblo.jp/feed" target="_blank">
  //         <i className="blogicon-rss lg"></i>
  //       </a>
  //     </li>
  //     <li>
  //       <a className="sns-share--pocket sns-share--link" href="http://getpocket.com/edit?url=http%3A%2F%2Fhachibeechan.hateblo.jp%2Fentry%2Fstupid-upscaling-apple-tv-4k&amp;title=Apple TV 4Kのレビューと注意すべき点  〜ぶっちゃけApple信者以外はFireTV買ったほうが良いよ〜" onclick="window.open(this.href, 'pocket_window', 'width=550, height=350, menubar=no, toolbar=no, scrollbars=yes'); return false;">
  //         <i className="blogicon-chevron-down"></i></a>
  //     </li>
  //     */}
  //
  //   </ul>
  // )
}
