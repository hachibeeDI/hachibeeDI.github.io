webpackJsonp([0x5e2ecaeed82a],{84:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=e.title,a=e.postEdges,r=a.map(function(e){var t=e.node;return{path:"/entry/"+t.frontmatter.path,tags:t.frontmatter.tags,title:t.frontmatter.title,date:t.frontmatter.date,excerpt:t.excerpt,timeToRead:t.timeToRead}});return n.default.createElement("section",null,n.default.createElement("h2",null,t),n.default.createElement("ul",{className:"categories"},r.map(function(e){return n.default.createElement("li",{key:e.title},n.default.createElement(l.default,{to:e.path},e.title))})))}t.__esModule=!0,t.default=o;var i=a(2),n=r(i),s=a(43),l=r(s);e.exports=t.default},35:function(e,t){"use strict";e.exports={siteTitle:"Hatch tech blog",siteTitleAlt:"Tech blog about programming",siteLogo:"https://cdn1.www.st-hatena.com/users/ha/hachibeechan/profile.gif",siteUrl:"https://hachibeedi.github.io/",pathPrefix:"/",siteDescription:"A GatsbyJS stater with Advanced design in mind.",siteRss:"/rss.xml",siteFBAppID:"",disqusShortname:"",postDefaultCategoryID:"Tech",userName:"Ogura Daiki",userTwitter:"https://twitter.com/hatchinee",userLocation:"Tokyo",userAvatar:"https://ja.gravatar.com/userimage/41771054/43d236d88acc75effc5d65af6bef4fe5.jpg?size=200",userDescription:"Yeah, I like animals better than people sometimes... Especially dogs. Dogs are the best. Every time you come home, they act like they haven't seen you in a year. And the good thing about dogs... is they got different dogs for different people.",userLinks:[{label:"GitHub",url:"https://github.com/hachibeeDI",iconClassName:"fa fa-github"},{label:"Twitter",url:"https://twitter.com/hatchinee",iconClassName:"fa fa-twitter"},{label:"Email",url:"mailto:8hachibee125@gmail.com",iconClassName:"fa fa-envelope"}],copyright:"Copyright © 2017. Ogura Daiki"}},255:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.pageQuery=void 0;var s=a(2),l=r(s),u=a(49),c=r(u),f=a(84),p=r(f),h=a(35),d=r(h),m=function(e){function t(){return o(this,t),i(this,e.apply(this,arguments))}return n(t,e),t.prototype.render=function(){var e=this.props.pathContext.tag,t=this.props.data.allMarkdownRemark.edges,a='Posts contain a tag "'+e+'"';return l.default.createElement("section",{className:"tag-container"},l.default.createElement(c.default,{title:a+" | "+d.default.siteTitle}),l.default.createElement(p.default,{title:a,postEdges:t}))},t}(l.default.Component);t.default=m;t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-templates-tags-jsx-773b839e4934e0b886f9.js.map