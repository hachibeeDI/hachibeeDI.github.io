webpackJsonp([0x67ef26645b2a,60335399758886],{"./node_modules/json-loader/index.js!./.cache/json/layout-index.json":function(e,t){e.exports={layoutContext:{}}},'./node_modules/babel-loader/lib/index.js?{"presets":["/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/node_modules/babel-preset-react/lib/index.js","/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/node_modules/babel-preset-es2015/lib/index.js","/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/node_modules/babel-preset-stage-1/lib/index.js",["/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/node_modules/babel-preset-env/lib/index.js",{"loose":true,"uglify":true,"modules":"commonjs","targets":{"browsers":["> 1%","last 2 versions","IE >= 9"]},"exclude":["transform-regenerator","transform-es2015-typeof-symbol"]}],"/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/node_modules/babel-preset-stage-0/lib/index.js","/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/node_modules/babel-preset-react/lib/index.js"],"plugins":["/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/hachibee/.ghq/github.com/hachibeeDI/hachibeeDI.github.io/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"cacheDirectory":true}!./.cache/layouts/index.js':function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},r=n("./node_modules/react/react.js"),s=i(r),a=n("./src/layouts/index.js"),d=i(a),l=n("./node_modules/json-loader/index.js!./.cache/json/layout-index.json"),u=i(l);t.default=function(e){return s.default.createElement(d.default,o({},e,u.default))},e.exports=t.default},"./node_modules/element-resize-event/index.js":function(e,t){function n(e){var t=e.target||e.srcElement;t.__resizeRAF__&&o(t.__resizeRAF__),t.__resizeRAF__=i(function(){var n=t.__resizeTrigger__;n.__resizeListeners__.forEach(function(t){t.call(n,e)})})}var i=function(){var e=this,t=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||function(t){return e.setTimeout(t,20)};return function(e){return t(e)}}(),o=function(){var e=this,t=e.cancelAnimationFrame||e.mozCancelAnimationFrame||e.webkitCancelAnimationFrame||e.clearTimeout;return function(e){return t(e)}}(),t=function(e,t){function i(){this.contentDocument.defaultView.__resizeTrigger__=this.__resizeElement__,this.contentDocument.defaultView.addEventListener("resize",n)}var o,r=this,s=r.document,a=s.attachEvent;if("undefined"!=typeof navigator&&(o=navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/Edge/)),!e.__resizeListeners__)if(e.__resizeListeners__=[],a)e.__resizeTrigger__=e,e.attachEvent("onresize",n);else{"static"===getComputedStyle(e).position&&(e.style.position="relative");var d=e.__resizeTrigger__=s.createElement("object");d.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;"),d.setAttribute("class","resize-sensor"),d.__resizeElement__=e,d.onload=i,d.type="text/html",o&&e.appendChild(d),d.data="about:blank",o||e.appendChild(d)}e.__resizeListeners__.push(t)};e.exports="undefined"==typeof window?t:t.bind(window),e.exports.unbind=function(e,t){var i=document.attachEvent;t?e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1):e.__resizeListeners__=[],e.__resizeListeners__.length||(i?e.detachEvent("onresize",n):(e.__resizeTrigger__.contentDocument.defaultView.removeEventListener("resize",n),delete e.__resizeTrigger__.contentDocument.defaultView.__resizeTrigger__,e.__resizeTrigger__=!e.removeChild(e.__resizeTrigger__)),delete e.__resizeListeners__)}},"./node_modules/raf/index.js":function(e,t,n){for(var i=n("./node_modules/raf/node_modules/performance-now/lib/performance-now.js"),o="undefined"==typeof window?{}:window,r=["moz","webkit"],s="AnimationFrame",a=o["request"+s],d=o["cancel"+s]||o["cancelRequest"+s],l=!0,u=0;u<r.length&&!a;u++)a=o[r[u]+"Request"+s],d=o[r[u]+"Cancel"+s]||o[r[u]+"CancelRequest"+s];if(!a||!d){l=!1;var c=0,p=0,h=[],m=1e3/60;a=function(e){if(0===h.length){var t=i(),n=Math.max(0,m-(t-c));c=n+t,setTimeout(function(){var e=h.slice(0);h.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(c)}catch(e){setTimeout(function(){throw e},0)}},Math.round(n))}return h.push({handle:++p,callback:e,cancelled:!1}),p},d=function(e){for(var t=0;t<h.length;t++)h[t].handle===e&&(h[t].cancelled=!0)}}e.exports=function(e){return l?a.call(o,function(){try{e.apply(this,arguments)}catch(e){setTimeout(function(){throw e},0)}}):a.call(o,e)},e.exports.cancel=function(){d.apply(o,arguments)}},"./node_modules/raf/node_modules/performance-now/lib/performance-now.js":function(e,t,n){(function(t){(function(){var n,i,o;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-o)/1e6},i=t.hrtime,n=function(){var e;return e=i(),1e9*e[0]+e[1]},o=n()):Date.now?(e.exports=function(){return Date.now()-o},o=Date.now()):(e.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)}).call(t,n("./node_modules/process/browser.js"))},"./node_modules/react-component-width-mixin/index.js":function(e,t,n){var i=n("./node_modules/react-dom/index.js"),o=n("./node_modules/element-resize-event/index.js");e.exports={getInitialState:function(){return void 0!==this.props.initialComponentWidth&&null!==this.props.initialComponentWidth?{componentWidth:this.props.initialComponentWidth}:{}},componentDidMount:function(){this.setState({componentWidth:i.findDOMNode(this).getBoundingClientRect().width}),o(i.findDOMNode(this),this.onResize)},componentDidUpdate:function(){0===i.findDOMNode(this).getElementsByClassName("resize-sensor").length&&o(i.findDOMNode(this),this.onResize)},onResize:function(){this.setState({componentWidth:i.findDOMNode(this).getBoundingClientRect().width})}}},"./node_modules/react-page-width/dist/index.js":function(e,t,n){var i;i=n("./node_modules/react-page-width/dist/resizeListener.js"),e.exports={getInitialState:function(){return this.props.initialPageWidth?{pageWidth:this.props.initialPageWidth}:{}},componentDidMount:function(){return i.on(this.onResize)},componentWillUnmount:function(){return i.off(this.onResize)},onResize:function(e){return this.setState({pageWidth:e})}}},"./node_modules/react-page-width/dist/resizeListener.js":function(e,t,n){var i,o,r,s,a,d;r=n("./node_modules/raf/index.js"),i=void 0,s=[],a=!1,"undefined"!=typeof window&&null!==window&&(i=window.innerWidth),o=function(){if(!a)return a=!0,r(d)},d=function(){var e,t,n;for(i=window.innerWidth,e=0,t=s.length;e<t;e++)(n=s[e])(i);return a=!1},"undefined"!=typeof window&&null!==window&&window.addEventListener("resize",o),e.exports={on:function(e){return e(i),s.push(e)},off:function(e){return s.splice(s.indexOf(e),1)}}},"./node_modules/react-responsive-grid/dist/components/Breakpoint.js":function(e,t,n){var i,o,r,s,a,d;s=n("./node_modules/react/react.js"),a=n("./node_modules/react-component-width-mixin/index.js"),r=n("./node_modules/react-page-width/dist/index.js"),d=n("./node_modules/object-assign/index.js"),i=s.createClass({displayName:"Breakpoint",mixins:[a],propTypes:{minWidth:s.PropTypes.number,maxWidth:s.PropTypes.number},getDefaultProps:function(){return{minWidth:0,maxWidth:1e21}},renderChildren:function(){return s.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=t&&null!=(n=t.type)?n.displayName:void 0)?s.cloneElement(t,{context:e.props.context}):t}}(this))},render:function(){var e,t;return e=d({},this.props),delete e.maxWidth,delete e.minWidth,delete e.widthMethod,this.state.componentWidth&&this.props.minWidth<=(t=this.state.componentWidth)&&t<this.props.maxWidth?s.createElement("div",Object.assign({},e),this.renderChildren()):s.createElement("div",null)}}),o=s.createClass({displayName:"Breakpoint",mixins:[r],propTypes:{minWidth:s.PropTypes.number,maxWidth:s.PropTypes.number},getDefaultProps:function(){return{minWidth:0,maxWidth:1e21}},renderChildren:function(){return s.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=(n=t.type)?n.displayName:void 0)?s.cloneElement(t,{context:e.props.context}):t}}(this))},render:function(){var e,t;return e=d({},this.props),delete e.maxWidth,delete e.minWidth,delete e.widthMethod,this.state.pageWidth&&this.props.minWidth<=(t=this.state.pageWidth)&&t<this.props.maxWidth?s.createElement("div",Object.assign({},e),this.renderChildren()):s.createElement("div",null)}}),e.exports=s.createClass({displayName:"Breakpoint",propTypes:{widthMethod:s.PropTypes.string.isRequired,minWidth:s.PropTypes.number,maxWidth:s.PropTypes.number},getDefaultProps:function(){return{widthMethod:"pageWidth"}},render:function(){return"pageWidth"===this.props.widthMethod?s.createElement(o,Object.assign({},this.props)):"componentWidth"===this.props.widthMethod?s.createElement(i,Object.assign({},this.props)):void 0}})},"./node_modules/react-responsive-grid/dist/components/Container.js":function(e,t,n){var i,o;i=n("./node_modules/react/react.js"),o=n("./node_modules/object-assign/index.js"),e.exports=i.createClass({displayName:"Container",render:function(){var e,t,n,r;return t={maxWidth:"960px",marginLeft:"auto",marginRight:"auto"},r=o(t,this.props.style),e=this.props.children,n=o({},this.props),delete n.children,delete n.style,i.createElement("div",Object.assign({},n,{style:r}),e,i.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},"./node_modules/react-responsive-grid/dist/components/Grid.js":function(e,t,n){var i,o;i=n("./node_modules/react/react.js"),o=n("./node_modules/object-assign/index.js"),e.exports=i.createClass({displayName:"Grid",propTypes:{columns:i.PropTypes.number,gutterRatio:i.PropTypes.number},getDefaultProps:function(){return{columns:12,gutterRatio:.25}},renderChildren:function(){return i.Children.map(this.props.children,function(e){return function(t){var n,o;return"Breakpoint"===(n=null!=(o=t.type)?o.displayName:void 0)||"Span"===n?i.cloneElement(t,{context:{columns:e.props.columns,gutterRatio:e.props.gutterRatio}}):t}}(this))},render:function(){var e;return e=o({},this.props),delete e.gutterRatio,delete e.columns,i.createElement("div",Object.assign({},e),this.renderChildren(),i.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},"./node_modules/react-responsive-grid/dist/components/Span.js":function(e,t,n){var i,o,r;i=n("./node_modules/react/react.js"),o=n("./node_modules/object-assign/index.js"),r=n("./node_modules/react-responsive-grid/dist/utils/SpanCalculate.js"),e.exports=i.createClass({displayName:"Span",propTypes:{context:i.PropTypes.object,columns:i.PropTypes.number,at:i.PropTypes.number,pre:i.PropTypes.number,post:i.PropTypes.number,squish:i.PropTypes.number,last:i.PropTypes.bool,break:i.PropTypes.bool},getDefaultProps:function(){return{at:0,pre:0,post:0,squish:0,last:!1,first:!1,break:!1}},renderChildren:function(){return i.Children.map(this.props.children,function(e){return function(t){var n;return"Span"===(null!=t&&null!=(n=t.type)?n.displayName:void 0)?i.cloneElement(t,{context:{columns:e.props.columns,gutterRatio:e.props.context.gutterRatio}}):t}}(this))},render:function(){var e,t;return t=r({contextColumns:this.props.context.columns,gutterRatio:this.props.context.gutterRatio,columns:this.props.columns,at:this.props.at,pre:this.props.pre,post:this.props.post,squish:this.props.squish,last:this.props.last,break:this.props.break}),t=o(t,this.props.style),e=o({},this.props,{style:t}),delete e.at,delete e.break,delete e.columns,delete e.context,delete e.first,delete e.last,delete e.post,delete e.pre,delete e.squish,delete e.style,i.createElement("div",Object.assign({},e,{style:t}),this.renderChildren(),i.createElement("span",{style:{display:"block",clear:"both"}}," "))}})},"./node_modules/react-responsive-grid/dist/index.js":function(e,t,n){t.Container=n("./node_modules/react-responsive-grid/dist/components/Container.js"),t.Grid=n("./node_modules/react-responsive-grid/dist/components/Grid.js"),t.Breakpoint=n("./node_modules/react-responsive-grid/dist/components/Breakpoint.js"),t.Span=n("./node_modules/react-responsive-grid/dist/components/Span.js")},"./node_modules/react-responsive-grid/dist/utils/SpanCalculate.js":function(e,t,n){var i;i=n("./node_modules/object-assign/index.js"),e.exports=function(e){var t,n,o,r,s,a,d,l,u,c;return o={columns:3,at:0,pre:0,post:0,squish:0,contextColumns:12,gutterRatio:.25,first:!1,last:!1},u=i(o,e),l=100/(u.contextColumns+(u.contextColumns-1)*u.gutterRatio),s=u.gutterRatio*l,n=function(e){return l*e+s*(e-1)},t=function(e){return 0===e?0:n(e)+s},c=n(u.columns),a=0===u.at&&0===u.pre&&0===u.squish?0:t(u.at)+t(u.pre)+t(u.squish),u.last&&0===u.post&&0===u.squish?d=0:0!==u.post||0!==u.squish?(d=t(u.post)+t(u.squish),u.last||(d+=s)):d=s,r=u.last?"right":"left",c+="%",a+="%",d+="%",{float:r,marginLeft:a,marginRight:d,width:c,clear:u.break?"both":"none"}}},"./src/layouts/index.js":function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e};n(!function(){var e=new Error('Cannot find module "prismjs/themes/prism-okidia.css"');throw e.code="MODULE_NOT_FOUND",e}());var d=n("./node_modules/react/react.js"),l=i(d),u=n("./node_modules/gatsby-link/index.js"),c=i(u),p=n("./node_modules/react-responsive-grid/dist/index.js"),h=n("./src/utils/typography.js"),m="Hatch tech blog",f=function(e){function t(){return o(this,t),r(this,e.apply(this,arguments))}return s(t,e),t.prototype.render=function(){var e=this.props,t=e.location,n=e.children,i=void 0,o="/";return o="/",i=t.pathname===o?l.default.createElement("h1",{style:a({},(0,h.scale)(1.5),{marginBottom:(0,h.rhythm)(1.5),marginTop:0})},l.default.createElement(c.default,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},m)):l.default.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0,marginBottom:(0,h.rhythm)(-1)}},l.default.createElement(c.default,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},m)),l.default.createElement(p.Container,{style:{maxWidth:(0,h.rhythm)(24),padding:(0,h.rhythm)(1.5)+" "+(0,h.rhythm)(.75)}},i,n())},t}(l.default.Component);f.propTypes={children:l.default.PropTypes.func,location:l.default.PropTypes.object,route:l.default.PropTypes.object},t.default=f,e.exports=t.default}});
//# sourceMappingURL=component---src-layouts-index-js-2004a0f9cb975ab9d63b.js.map