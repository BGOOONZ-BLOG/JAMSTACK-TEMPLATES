webpackJsonp([18],{8:function(n,t,a){"use strict";a(14),a(13)},13:function(n,t){},14:function(n,t){},19:function(n,t,a){"use strict";function s(n){if(n&&n.__esModule)return n;var t={};if(null!=n)for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a]);return t["default"]=n,t}function e(n){return n&&n.__esModule?n:{"default":n}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(9),p=e(o),c=a(1),u=s(c);t["default"]=function(n){var t=n.type,a=n.className,s=void 0===a?"":a;return u.createElement("i",(0,p["default"])({},n,{className:(s+" anticon anticon-"+t).trim()}))},n.exports=t["default"]},20:function(n,t,a){"use strict";a(26)},21:function(n,t,a){"use strict";function s(n){if(n&&n.__esModule)return n;var t={};if(null!=n)for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a]);return t["default"]=n,t}function e(n){return n&&n.__esModule?n:{"default":n}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var o=a(6),p=e(o),c=a(3),u=e(c),l=a(5),i=e(l),r=a(4),f=e(r),k=a(1),d=s(k),h=a(2),m=e(h),g=function(n){function t(){return(0,u["default"])(this,t),(0,i["default"])(this,n.apply(this,arguments))}return(0,f["default"])(t,n),t.prototype.render=function(){var n,t=this.props,a=t.prefixCls,s=t.size,e=t.className,o=t.style,c=t.onClick,u=(0,m["default"])((n={},(0,p["default"])(n,""+a,!0),(0,p["default"])(n,a+"-"+s,!0),(0,p["default"])(n,e,!!e),n));return d.createElement("div",{className:u,style:o,onClick:c})},t}(d.Component);t["default"]=g,g.defaultProps={prefixCls:"am-whitespace",size:"md"},n.exports=t["default"]},22:function(n,t,a){"use strict";a(8),a(48)},26:function(n,t){},27:function(n,t,a){"use strict";function s(n){if(n&&n.__esModule)return n;var t={};if(null!=n)for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a]);return t["default"]=n,t}function e(n){return n&&n.__esModule?n:{"default":n}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var o=a(6),p=e(o),c=a(3),u=e(c),l=a(5),i=e(l),r=a(4),f=e(r),k=a(1),d=s(k),h=a(2),m=e(h),g=function(n){function t(){return(0,u["default"])(this,t),(0,i["default"])(this,n.apply(this,arguments))}return(0,f["default"])(t,n),t.prototype.render=function(){var n,t=this.props,a=t.prefixCls,s=t.size,e=t.className,o=t.children,c=t.style,u=(0,m["default"])((n={},(0,p["default"])(n,""+a,!0),(0,p["default"])(n,a+"-"+s,!0),(0,p["default"])(n,e,!!e),n));return d.createElement("div",{className:u,style:c},o)},t}(d.Component);t["default"]=g,g.defaultProps={prefixCls:"am-wingblank",size:"lg"},n.exports=t["default"]},28:function(n,t,a){"use strict";a(8),a(53)},29:function(n,t,a){"use strict";function s(n){return n&&n.__esModule?n:{"default":n}}t.__esModule=!0;var e=a(39),o=s(e),p=a(38),c=s(p);t["default"]=function(){function n(n,t){var a=[],s=!0,e=!1,o=void 0;try{for(var p,u=(0,c["default"])(n);!(s=(p=u.next()).done)&&(a.push(p.value),!t||a.length!==t);s=!0);}catch(l){e=!0,o=l}finally{try{!s&&u["return"]&&u["return"]()}finally{if(e)throw o}}return a}return function(t,a){if(Array.isArray(t))return t;if((0,o["default"])(Object(t)))return n(t,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},30:function(n,t){"use strict";function a(n,t){var a={},s={};return Object.keys(n).forEach(function(e){t.indexOf(e)!==-1?a[e]=n[e]:s[e]=n[e]}),[a,s]}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a,n.exports=t["default"]},38:function(n,t,a){n.exports={"default":a(40),__esModule:!0}},39:function(n,t,a){n.exports={"default":a(41),__esModule:!0}},40:function(n,t,a){a(36),a(23),n.exports=a(42)},41:function(n,t,a){a(36),a(23),n.exports=a(43)},42:function(n,t,a){var s=a(49),e=a(55);n.exports=a(15).getIterator=function(n){var t=e(n);if("function"!=typeof t)throw TypeError(n+" is not iterable!");return s(t.call(n))}},43:function(n,t,a){var s=a(68),e=a(25)("iterator"),o=a(51);n.exports=a(15).isIterable=function(n){var t=Object(n);return void 0!==t[e]||"@@iterator"in t||o.hasOwnProperty(s(t))}},44:function(n,t,a){"use strict";function s(n){if(n&&n.__esModule)return n;var t={};if(null!=n)for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a]);return t["default"]=n,t}function e(n){return n&&n.__esModule?n:{"default":n}}function o(n){return"string"==typeof n}function p(n){return o(n.type)&&P(n.props.children)?b.cloneElement(n,{},n.props.children.split("").join(" ")):o(n)?(P(n)&&(n=n.split("").join(" ")),b.createElement("span",null,n)):n}Object.defineProperty(t,"__esModule",{value:!0});var c=a(9),u=e(c),l=a(6),i=e(l),r=a(29),f=e(r),k=a(3),d=e(k),h=a(5),m=e(h),g=a(4),y=e(g),v=a(1),b=s(v),T=a(2),C=e(T),_=a(19),E=e(_),x=a(30),w=e(x),N=a(57),M=e(N),O=/^[\u4e00-\u9fa5]{2}$/,P=O.test.bind(O),j=function(n){function t(){(0,d["default"])(this,t);for(var a=arguments.length,s=Array(a),e=0;e<a;e++)s[e]=arguments[e];var o=(0,m["default"])(this,n.call.apply(n,[this].concat(s)));return o.onClick=function(){o.props.onClick(o)},o}return(0,y["default"])(t,n),t.prototype.render=function(){var n,t=(0,w["default"])(this.props,["children","className","prefixCls","type","size","inline","disabled","htmlType","icon","loading","touchFeedback"]),a=(0,f["default"])(t,2),s=a[0],e=s.children,o=s.className,c=s.prefixCls,l=s.type,r=s.size,k=s.inline,d=s.disabled,h=s.htmlType,m=s.icon,g=s.loading,y=s.touchFeedback,v=a[1],T=(0,C["default"])((n={},(0,i["default"])(n,o,o),(0,i["default"])(n,c,!0),(0,i["default"])(n,c+"-primary","primary"===l),(0,i["default"])(n,c+"-ghost","ghost"===l),(0,i["default"])(n,c+"-warning","warning"===l),(0,i["default"])(n,c+"-small","small"===r),(0,i["default"])(n,c+"-loading",g),(0,i["default"])(n,c+"-inline",k),(0,i["default"])(n,c+"-disabled",d),(0,i["default"])(n,c+"-touchFeedback",y),n)),_=g?"loading":m,x=b.Children.map(e,p);return b.createElement("button",(0,u["default"])({},v,{type:h||"button",className:T,disabled:d,onClick:this.onClick}),_?b.createElement(E["default"],{type:_}):null,x)},t}(b.Component);j.propTypes={prefixCls:v.PropTypes.string,size:v.PropTypes.oneOf(["large","small"]),htmlType:v.PropTypes.oneOf(["submit","button","reset"]),icon:v.PropTypes.bool},j.defaultProps={prefixCls:"am-button",size:"large",inline:!1,disabled:!1,loading:!1,onClick:function(){}},t["default"]=(0,M["default"])(j),n.exports=t["default"]},46:function(n,t,a){"use strict";a(8),a(20),a(60)},48:function(n,t){},53:function(n,t){},57:function(n,t,a){"use strict";function s(n){if(n&&n.__esModule)return n;var t={};if(null!=n)for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a]);return t["default"]=n,t}function e(n){return n&&n.__esModule?n:{"default":n}}function o(n){var t=l.createClass({displayName:"TouchableFeedbackComponent",getInitialState:function(){return{touchFeedback:!1}},setTouchFeedbackState:function(n){this.setState({touchFeedback:n})},onTouchStart:function(n){this.props.onTouchStart&&this.props.onTouchStart(n),this.setTouchFeedbackState(!0)},onTouchEnd:function(n){this.props.onTouchEnd&&this.props.onTouchEnd(n),this.setTouchFeedbackState(!1)},onTouchCancel:function(n){this.props.onTouchCancel&&this.props.onTouchCancel(n),this.setTouchFeedbackState(!1)},onMouseDown:function(n){this.props.onTouchStart&&this.props.onTouchStart(n),this.setTouchFeedbackState(!0)},onMouseUp:function(n){this.props.onTouchEnd&&this.props.onTouchEnd(n),this.setTouchFeedbackState(!1)},render:function(){var t=i?{onTouchStart:this.onTouchStart,onTouchEnd:this.onTouchEnd,onTouchCancel:this.onTouchCancel}:{onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp};return l.createElement(n,(0,c["default"])({},this.props,{touchFeedback:this.state.touchFeedback},t))}});return t}Object.defineProperty(t,"__esModule",{value:!0});var p=a(9),c=e(p);t["default"]=o;var u=a(1),l=s(u),i="undefined"!=typeof window&&"ontouchstart"in window;n.exports=t["default"]},60:function(n,t){},162:function(n,t){"use strict";function a(){var n=arguments;return function(){for(var t=0;t<n.length;t++)n[t]&&n[t].apply&&n[t].apply(this,arguments)}}n.exports=a},168:function(n,t,a){"use strict";function s(n){return n&&n.__esModule?n:{"default":n}}function e(n){if(n&&n.__esModule)return n;var t={};if(null!=n)for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a]);return t["default"]=n,t}function o(){return k=i["default"].newInstance({prefixCls:d,style:{top:0},transitionName:"am-fade"})}function p(n,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3,s=arguments[3],e={info:"",success:"check-circle-o",fail:"cross-circle-o",offline:"frown",loading:"loading"}[t];"function"==typeof a&&(s=a,a=3);var p=o();p.notice({duration:a,style:{},content:e?u.createElement("div",{className:d+"-text "+d+"-text-icon"},u.createElement(f["default"],{type:e}),u.createElement("div",null,n)):u.createElement("div",{className:d+"-text"},u.createElement("div",null,n)),onClose:function(){s&&s(),p.destroy(),p=null,k=null}})}Object.defineProperty(t,"__esModule",{value:!0});var c=a(1),u=e(c),l=a(225),i=s(l),r=a(19),f=s(r),k=void 0,d="am-toast";t["default"]={SHORT:3,LONG:8,show:function(n,t){return p(n,"info",t,function(){})},info:function(n,t,a){return p(n,"info",t,a)},success:function(n,t,a){return p(n,"success",t,a)},fail:function(n,t,a){return p(n,"fail",t,a)},offline:function(n,t,a){return p(n,"offline",t,a)},loading:function(n,t,a){return p(n,"loading",t,a)},hide:function(){k&&(k.destroy(),k=null)}},n.exports=t["default"]},169:function(n,t,a){"use strict";a(8),a(20),a(214)},214:function(n,t){},223:function(n,t,a){"use strict";function s(n){return n&&n.__esModule?n:{"default":n}}function e(n,t,a){return t in n?Object.defineProperty(n,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[t]=a,n}Object.defineProperty(t,"__esModule",{value:!0});var o=a(1),p=s(o),c=a(2),u=s(c),l=p["default"].createClass({displayName:"Notice",propTypes:{duration:o.PropTypes.number,onClose:o.PropTypes.func,children:o.PropTypes.any},getDefaultProps:function(){return{onEnd:function(){},onClose:function(){},duration:1.5,style:{right:"50%"}}},componentDidMount:function(){var n=this;this.props.duration&&(this.closeTimer=setTimeout(function(){n.close()},1e3*this.props.duration))},componentWillUnmount:function(){this.clearCloseTimer()},clearCloseTimer:function(){this.closeTimer&&(clearTimeout(this.closeTimer),this.closeTimer=null)},close:function(){this.clearCloseTimer(),this.props.onClose()},render:function(){var n,t=this.props,a=t.prefixCls+"-notice",s=(n={},e(n,""+a,1),e(n,a+"-closable",t.closable),e(n,t.className,!!t.className),n);return p["default"].createElement("div",{className:(0,u["default"])(s),style:t.style},p["default"].createElement("div",{className:a+"-content"},t.children),t.closable?p["default"].createElement("a",{tabIndex:"0",onClick:this.close,className:a+"-close"},p["default"].createElement("span",{className:a+"-close-x"})):null)}});t["default"]=l,n.exports=t["default"]},224:function(n,t,a){"use strict";function s(n){return n&&n.__esModule?n:{"default":n}}function e(n,t,a){return t in n?Object.defineProperty(n,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[t]=a,n}function o(){return"rcNotification_"+b+"_"+v++}Object.defineProperty(t,"__esModule",{value:!0});var p=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(n[s]=a[s])}return n},c=a(1),u=s(c),l=a(7),i=s(l),r=a(72),f=s(r),k=a(162),d=s(k),h=a(2),m=s(h),g=a(223),y=s(g),v=0,b=Date.now(),T=u["default"].createClass({displayName:"Notification",propTypes:{prefixCls:c.PropTypes.string,transitionName:c.PropTypes.string,animation:c.PropTypes.oneOfType([c.PropTypes.string,c.PropTypes.object]),style:c.PropTypes.object},getDefaultProps:function(){return{prefixCls:"rc-notification",animation:"fade",style:{top:65,left:"50%"}}},getInitialState:function(){return{notices:[]}},getTransitionName:function(){var n=this.props,t=n.transitionName;return!t&&n.animation&&(t=n.prefixCls+"-"+n.animation),t},add:function(n){var t=n.key=n.key||o();this.setState(function(a){var s=a.notices;if(!s.filter(function(n){return n.key===t}).length)return{notices:s.concat(n)}})},remove:function(n){this.setState(function(t){return{notices:t.notices.filter(function(t){return t.key!==n})}})},render:function(){var n,t=this,a=this.props,s=this.state.notices.map(function(n){var s=(0,d["default"])(t.remove.bind(t,n.key),n.onClose);return u["default"].createElement(y["default"],p({prefixCls:a.prefixCls},n,{onClose:s}),n.content)}),o=(n={},e(n,a.prefixCls,1),e(n,a.className,!!a.className),n);return u["default"].createElement("div",{className:(0,m["default"])(o),style:a.style},u["default"].createElement(f["default"],{transitionName:this.getTransitionName()},s))}});T.newInstance=function(n){var t=n||{},a=document.createElement("div");document.body.appendChild(a);var s=i["default"].render(u["default"].createElement(T,t),a);return{notice:function(n){s.add(n)},removeNotice:function(n){s.remove(n)},component:s,destroy:function(){i["default"].unmountComponentAtNode(a),document.body.removeChild(a)}}},t["default"]=T,n.exports=t["default"]},225:function(n,t,a){"use strict";function s(n){return n&&n.__esModule?n:{"default":n}}Object.defineProperty(t,"__esModule",{value:!0});var e=a(224),o=s(e);t["default"]=o["default"],n.exports=t["default"]},794:function(n,t,a){"use strict";function s(n){return n&&n.__esModule?n:{"default":n}}var e=(a(28),a(27)),o=s(e),p=(a(46),a(44)),c=s(p),u=(a(22),a(21)),l=s(u),i=(a(169),a(168)),r=s(i),f=a(1),k=s(f),d=a(7);s(d);n.exports={content:[["p","\u7eaf\u6587\u5b57\u3001\u7eaf\u56fe\u6807\u3001\u6210\u529f\u3001\u5931\u8d25\u3001\u79bb\u7ebf\u3001loading"]],meta:{order:0,title:"\u666e\u901a",filename:"components/toast/demo/basic.md",id:"components-toast-demo-basic"},toc:["ul"],highlightedCode:["pre",{lang:"jsx",highlighted:'<span class="token keyword" >import</span> <span class="token punctuation" >{</span> Toast<span class="token punctuation" >,</span> WhiteSpace<span class="token punctuation" >,</span> WingBlank<span class="token punctuation" >,</span> Button <span class="token punctuation" >}</span> <span class="token keyword" >from</span> <span class="token string" >\'antd-mobile\'</span><span class="token punctuation" >;</span>\n\n<span class="token keyword" >function</span> <span class="token function" >showToast</span><span class="token punctuation" >(</span><span class="token punctuation" >)</span> <span class="token punctuation" >{</span>\n  Toast<span class="token punctuation" >.</span><span class="token function" >info</span><span class="token punctuation" >(</span><span class="token string" >\'\u8fd9\u662f\u4e00\u4e2a toast \u63d0\u793a!!!\'</span><span class="token punctuation" >,</span> <span class="token number" >1</span><span class="token punctuation" >)</span><span class="token punctuation" >;</span>\n<span class="token punctuation" >}</span>\n\n<span class="token keyword" >function</span> <span class="token function" >successToast</span><span class="token punctuation" >(</span><span class="token punctuation" >)</span> <span class="token punctuation" >{</span>\n  Toast<span class="token punctuation" >.</span><span class="token function" >success</span><span class="token punctuation" >(</span><span class="token string" >\'\u52a0\u8f7d\u6210\u529f!!!\'</span><span class="token punctuation" >,</span> <span class="token number" >1</span><span class="token punctuation" >)</span><span class="token punctuation" >;</span>\n<span class="token punctuation" >}</span>\n\n<span class="token keyword" >function</span> <span class="token function" >failToast</span><span class="token punctuation" >(</span><span class="token punctuation" >)</span> <span class="token punctuation" >{</span>\n  Toast<span class="token punctuation" >.</span><span class="token function" >fail</span><span class="token punctuation" >(</span><span class="token string" >\'\u52a0\u8f7d\u5931\u8d25!!!\'</span><span class="token punctuation" >,</span> <span class="token number" >1</span><span class="token punctuation" >)</span><span class="token punctuation" >;</span>\n<span class="token punctuation" >}</span>\n\n<span class="token keyword" >function</span> <span class="token function" >offline</span><span class="token punctuation" >(</span><span class="token punctuation" >)</span> <span class="token punctuation" >{</span>\n  Toast<span class="token punctuation" >.</span><span class="token function" >offline</span><span class="token punctuation" >(</span><span class="token string" >\'\u7f51\u7edc\u8fde\u63a5\u5931\u8d25!!!\'</span><span class="token punctuation" >,</span> <span class="token number" >1</span><span class="token punctuation" >)</span><span class="token punctuation" >;</span>\n<span class="token punctuation" >}</span>\n\n<span class="token keyword" >function</span> <span class="token function" >loadingToast</span><span class="token punctuation" >(</span><span class="token punctuation" >)</span> <span class="token punctuation" >{</span>\n  Toast<span class="token punctuation" >.</span><span class="token function" >loading</span><span class="token punctuation" >(</span><span class="token string" >\'\u52a0\u8f7d\u4e2d...\'</span><span class="token punctuation" >,</span> <span class="token number" >1</span><span class="token punctuation" >,</span> <span class="token punctuation" >(</span><span class="token punctuation" >)</span> <span class="token operator" >=</span><span class="token operator" >></span> <span class="token punctuation" >{</span>\n    console<span class="token punctuation" >.</span><span class="token function" >log</span><span class="token punctuation" >(</span><span class="token string" >\'\u52a0\u8f7d\u5b8c\u6210!!!\'</span><span class="token punctuation" >)</span><span class="token punctuation" >;</span>\n  <span class="token punctuation" >}</span><span class="token punctuation" >)</span><span class="token punctuation" >;</span>\n<span class="token punctuation" >}</span>\n\n<span class="token keyword" >const</span> ToastExample <span class="token operator" >=</span> React<span class="token punctuation" >.</span><span class="token function" >createClass</span><span class="token punctuation" >(</span><span class="token punctuation" >{</span>\n  <span class="token function" >render</span><span class="token punctuation" >(</span><span class="token punctuation" >)</span> <span class="token punctuation" >{</span>\n    <span class="token keyword" >return</span> <span class="token punctuation" >(</span>\n      <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>div</span> <span class="token attr-name" >className</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>toast-container<span class="token punctuation" >"</span></span><span class="token punctuation" >></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WhiteSpace</span> <span class="token punctuation" >/></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WingBlank</span><span class="token punctuation" >></span></span>\n          <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Button</span> <span class="token attr-name" >type</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>ghost<span class="token punctuation" >"</span></span> <span class="token attr-name" >onClick</span><span class="token script language-javascript" ><span class="token punctuation" >=</span><span class="token punctuation" >{</span>showToast<span class="token punctuation" >}</span></span><span class="token punctuation" >></span></span>\u7eaf\u6587\u5b57 toast<span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>Button</span><span class="token punctuation" >></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>WingBlank</span><span class="token punctuation" >></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WhiteSpace</span> <span class="token punctuation" >/></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WingBlank</span><span class="token punctuation" >></span></span>\n          <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Button</span> <span class="token attr-name" >type</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>ghost<span class="token punctuation" >"</span></span> <span class="token attr-name" >onClick</span><span class="token script language-javascript" ><span class="token punctuation" >=</span><span class="token punctuation" >{</span>successToast<span class="token punctuation" >}</span></span><span class="token punctuation" >></span></span>\u6210\u529f toast<span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>Button</span><span class="token punctuation" >></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>WingBlank</span><span class="token punctuation" >></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WhiteSpace</span> <span class="token punctuation" >/></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WingBlank</span><span class="token punctuation" >></span></span>\n          <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Button</span> <span class="token attr-name" >type</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>ghost<span class="token punctuation" >"</span></span> <span class="token attr-name" >onClick</span><span class="token script language-javascript" ><span class="token punctuation" >=</span><span class="token punctuation" >{</span>failToast<span class="token punctuation" >}</span></span><span class="token punctuation" >></span></span>\u5931\u8d25 toast<span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>Button</span><span class="token punctuation" >></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>WingBlank</span><span class="token punctuation" >></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WhiteSpace</span> <span class="token punctuation" >/></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WingBlank</span><span class="token punctuation" >></span></span>\n          <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Button</span> <span class="token attr-name" >type</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>ghost<span class="token punctuation" >"</span></span> <span class="token attr-name" >onClick</span><span class="token script language-javascript" ><span class="token punctuation" >=</span><span class="token punctuation" >{</span>offline<span class="token punctuation" >}</span></span><span class="token punctuation" >></span></span>\u7f51\u7edc toast<span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>Button</span><span class="token punctuation" >></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>WingBlank</span><span class="token punctuation" >></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WhiteSpace</span> <span class="token punctuation" >/></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WingBlank</span><span class="token punctuation" >></span></span>\n          <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Button</span> <span class="token attr-name" >type</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>ghost<span class="token punctuation" >"</span></span> <span class="token attr-name" >onClick</span><span class="token script language-javascript" ><span class="token punctuation" >=</span><span class="token punctuation" >{</span>loadingToast<span class="token punctuation" >}</span></span><span class="token punctuation" >></span></span>\u52a0\u8f7d\u4e2d toast<span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>Button</span><span class="token punctuation" >></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>WingBlank</span><span class="token punctuation" >></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WhiteSpace</span> <span class="token punctuation" >/></span></span>\n      <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>div</span><span class="token punctuation" >></span></span>\n    <span class="token punctuation" >)</span><span class="token punctuation" >;</span>\n  <span class="token punctuation" >}</span><span class="token punctuation" >,</span>\n<span class="token punctuation" >}</span><span class="token punctuation" >)</span><span class="token punctuation" >;</span>\n\nReactDOM<span class="token punctuation" >.</span><span class="token function" >render</span><span class="token punctuation" >(</span><span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>ToastExample</span> <span class="token punctuation" >/></span></span><span class="token punctuation" >,</span> mountNode<span class="token punctuation" >)</span><span class="token punctuation" >;</span>'}],preview:function(){function n(){r["default"].info("\u8fd9\u662f\u4e00\u4e2a toast \u63d0\u793a!!!",1)}function t(){r["default"].success("\u52a0\u8f7d\u6210\u529f!!!",1)}function a(){r["default"].fail("\u52a0\u8f7d\u5931\u8d25!!!",1)}function s(){r["default"].offline("\u7f51\u7edc\u8fde\u63a5\u5931\u8d25!!!",1)}function e(){r["default"].loading("\u52a0\u8f7d\u4e2d...",1,function(){console.log("\u52a0\u8f7d\u5b8c\u6210!!!")})}var p=k["default"].createClass({displayName:"ToastExample",render:function(){return k["default"].createElement("div",{className:"toast-container"},k["default"].createElement(l["default"],null),k["default"].createElement(o["default"],null,k["default"].createElement(c["default"],{type:"ghost",onClick:n},"\u7eaf\u6587\u5b57 toast")),k["default"].createElement(l["default"],null),k["default"].createElement(o["default"],null,k["default"].createElement(c["default"],{type:"ghost",onClick:t},"\u6210\u529f toast")),k["default"].createElement(l["default"],null),k["default"].createElement(o["default"],null,k["default"].createElement(c["default"],{type:"ghost",onClick:a},"\u5931\u8d25 toast")),k["default"].createElement(l["default"],null),k["default"].createElement(o["default"],null,k["default"].createElement(c["default"],{type:"ghost",onClick:s},"\u7f51\u7edc toast")),k["default"].createElement(l["default"],null),k["default"].createElement(o["default"],null,k["default"].createElement(c["default"],{type:"ghost",onClick:e},"\u52a0\u8f7d\u4e2d toast")),k["default"].createElement(l["default"],null))}});return k["default"].createElement(p,null)}}},927:function(n,t,a){n.exports={basic:a(794)}}});