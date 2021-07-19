webpackJsonp([104],{3:function(n,a,t){"use strict";t(7),t(6)},6:function(n,a){},7:function(n,a){},16:function(n,a){"use strict";function t(n,a){var t={},s={};return Object.keys(n).forEach(function(e){a.indexOf(e)!==-1?t[e]=n[e]:s[e]=n[e]}),[t,s]}Object.defineProperty(a,"__esModule",{value:!0}),a["default"]=t,n.exports=a["default"]},154:function(n,a,t){"use strict";function s(n){return n&&n.__esModule?n:{"default":n}}function e(n){if(n&&n.__esModule)return n;var a={};if(null!=n)for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(a[t]=n[t]);return a["default"]=n,a}function p(n,a){for(var t=Object.getOwnPropertyNames(a),s=0;s<t.length;s++){var e=t[s],p=Object.getOwnPropertyDescriptor(a,e);p&&p.configurable&&void 0===n[e]&&Object.defineProperty(n,e,p)}return n}function o(n,a,t){return a in n?Object.defineProperty(n,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[a]=t,n}function c(n,a){if(!(n instanceof a))throw new TypeError("Cannot call a class as a function")}function u(n,a){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!a||"object"!=typeof a&&"function"!=typeof a?n:a}function l(n,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function, not "+typeof a);n.prototype=Object.create(a&&a.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),a&&(Object.setPrototypeOf?Object.setPrototypeOf(n,a):p(n,a))}Object.defineProperty(a,"__esModule",{value:!0}),a["default"]=void 0;var r=Object.assign||function(n){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(n[s]=t[s])}return n},i=function(){function n(n,a){var t=[],s=!0,e=!1,p=void 0;try{for(var o,c=n[Symbol.iterator]();!(s=(o=c.next()).done)&&(t.push(o.value),!a||t.length!==a);s=!0);}catch(u){e=!0,p=u}finally{try{!s&&c["return"]&&c["return"]()}finally{if(e)throw p}}return t}return function(a,t){if(Array.isArray(a))return a;if(Symbol.iterator in Object(a))return n(a,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),k=t(1),f=e(k),d=t(2),m=s(d),y=t(32),v=s(y),g=t(16),h=s(g),b=function(n){function a(){return c(this,a),u(this,n.apply(this,arguments))}return l(a,n),a.prototype.render=function(){var n,a=(0,h["default"])(this.props,["prefixCls","children","mode","className","iconName","leftContent","rightContent","onLeftClick"]),t=i(a,2),s=t[0],e=s.prefixCls,p=s.children,c=s.mode,u=s.className,l=s.iconName,k=s.leftContent,d=s.rightContent,y=s.onLeftClick,g=t[1],b=(0,m["default"])((n={},o(n,u,u),o(n,e,!0),o(n,e+"-"+c,!0),n));return f.createElement("div",r({},g,{className:b}),f.createElement("div",{className:e+"-left",onClick:y},l?f.createElement("span",{className:e+"-left-icon"},f.createElement(v["default"],{type:l})):null,f.createElement("span",{className:e+"-left-content"},k)),f.createElement("div",{className:e+"-title"},p),f.createElement("div",{className:e+"-right"},d))},a}(f.Component);a["default"]=b,b.defaultProps={prefixCls:"am-navbar",mode:"dark",iconName:"left",onLeftClick:function(){}},n.exports=a["default"]},155:function(n,a,t){"use strict";t(3),t(158)},158:function(n,a){},798:function(n,a,t){"use strict";function s(n){return n&&n.__esModule?n:{"default":n}}var e=(t(155),t(154)),p=s(e),o=(t(51),t(32)),c=s(o),u=t(1),l=s(u),r=t(4);s(r);n.exports={content:[["p","\u6a21\u5f0f"]],meta:{order:0,title:"mode",filename:"components/nav-bar/demo/basic.md",id:"components-nav-bar-demo-basic"},toc:["ul"],highlightedCode:["pre",{lang:"jsx",highlighted:'<span class="token keyword" >import</span> <span class="token punctuation" >{</span> NavBar<span class="token punctuation" >,</span> Icon <span class="token punctuation" >}</span> <span class="token keyword" >from</span> <span class="token string" >\'antd-mobile\'</span><span class="token punctuation" >;</span>\nReactDOM<span class="token punctuation" >.</span><span class="token function" >render</span><span class="token punctuation" >(</span>\n  <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>div</span> <span class="token attr-name" >style</span><span class="token script language-javascript" ><span class="token punctuation" >=</span><span class="token punctuation" >{</span><span class="token punctuation" >{</span> padding<span class="token punctuation" >:</span> <span class="token number" >8</span> <span class="token punctuation" >}</span><span class="token punctuation" >}</span></span><span class="token punctuation" >></span></span>\n    <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>NavBar</span> <span class="token attr-name" >leftContent</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>\u8fd4\u56de<span class="token punctuation" >"</span></span>\n      <span class="token attr-name" >rightContent={[&lt;Icon</span> <span class="token attr-name" >key</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>0<span class="token punctuation" >"</span></span> <span class="token attr-name" >type</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>user<span class="token punctuation" >"</span></span> <span class="token punctuation" >/></span></span><span class="token punctuation" >,</span> <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Icon</span> <span class="token attr-name" >key</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>1<span class="token punctuation" >"</span></span> <span class="token attr-name" >type</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>search<span class="token punctuation" >"</span></span> <span class="token punctuation" >/></span></span><span class="token punctuation" >,</span> <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Icon</span> <span class="token attr-name" >key</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>2<span class="token punctuation" >"</span></span> <span class="token attr-name" >type</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>plus<span class="token punctuation" >"</span></span> <span class="token punctuation" >/></span></span><span class="token punctuation" >]</span><span class="token punctuation" >}</span>\n    <span class="token operator" >></span>NavBar<span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>NavBar</span><span class="token punctuation" >></span></span>\n    <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>div</span> <span class="token attr-name" >style</span><span class="token script language-javascript" ><span class="token punctuation" >=</span><span class="token punctuation" >{</span><span class="token punctuation" >{</span> height<span class="token punctuation" >:</span> <span class="token number" >8</span> <span class="token punctuation" >}</span><span class="token punctuation" >}</span></span> <span class="token punctuation" >/></span></span>\n    <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>NavBar</span> <span class="token attr-name" >leftContent</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>\u8fd4\u56de<span class="token punctuation" >"</span></span> <span class="token attr-name" >mode</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>light<span class="token punctuation" >"</span></span>\n      <span class="token attr-name" >rightContent={[&lt;Icon</span> <span class="token attr-name" >key</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>0<span class="token punctuation" >"</span></span> <span class="token attr-name" >type</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>user<span class="token punctuation" >"</span></span> <span class="token punctuation" >/></span></span><span class="token punctuation" >,</span> <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Icon</span> <span class="token attr-name" >key</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>1<span class="token punctuation" >"</span></span> <span class="token attr-name" >type</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>search<span class="token punctuation" >"</span></span> <span class="token punctuation" >/></span></span><span class="token punctuation" >,</span> <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Icon</span> <span class="token attr-name" >key</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>2<span class="token punctuation" >"</span></span> <span class="token attr-name" >type</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>plus<span class="token punctuation" >"</span></span> <span class="token punctuation" >/></span></span><span class="token punctuation" >]</span><span class="token punctuation" >}</span>\n    <span class="token operator" >></span>NavBar<span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>NavBar</span><span class="token punctuation" >></span></span>\n  <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>div</span><span class="token punctuation" >></span></span>\n<span class="token punctuation" >,</span> mountNode<span class="token punctuation" >)</span><span class="token punctuation" >;</span>'}],preview:function(){return l["default"].createElement("div",{style:{padding:8}},l["default"].createElement(p["default"],{leftContent:"\u8fd4\u56de",rightContent:[l["default"].createElement(c["default"],{key:"0",type:"user"}),l["default"].createElement(c["default"],{key:"1",type:"search"}),l["default"].createElement(c["default"],{key:"2",type:"plus"})]},"NavBar"),l["default"].createElement("div",{style:{height:8}}),l["default"].createElement(p["default"],{leftContent:"\u8fd4\u56de",mode:"light",rightContent:[l["default"].createElement(c["default"],{key:"0",type:"user"}),l["default"].createElement(c["default"],{key:"1",type:"search"}),l["default"].createElement(c["default"],{key:"2",type:"plus"})]},"NavBar"))}}}});