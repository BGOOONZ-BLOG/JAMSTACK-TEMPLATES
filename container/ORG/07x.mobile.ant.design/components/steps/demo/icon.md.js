webpackJsonp([66],{3:function(t,n,e){"use strict";e(7),e(6)},6:function(t,n){},7:function(t,n){},26:function(t,n,e){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function s(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n["default"]=t,n}function o(t,n){for(var e=Object.getOwnPropertyNames(n),a=0;a<e.length;a++){var s=e[a],o=Object.getOwnPropertyDescriptor(n,s);o&&o.configurable&&void 0===t[s]&&Object.defineProperty(t,s,o)}return t}function p(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function r(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function c(t,n){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?t:n}function i(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(t,n):o(t,n))}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=void 0;var l=e(1),u=s(l),f=e(2),d=a(f),k=function(t){function n(){return r(this,n),c(this,t.apply(this,arguments))}return i(n,t),n.prototype.render=function(){var t,n=this.props,e=n.prefixCls,a=n.size,s=n.className,o=n.style,r=n.onClick,c=(0,d["default"])((t={},p(t,""+e,!0),p(t,s,!!s),p(t,e+"-ws"+a,!0),t));return u.createElement("div",{className:c,style:o,onClick:r})},n}(u.Component);n["default"]=k,k.defaultProps={prefixCls:"am-whitespace",size:8},t.exports=n["default"]},27:function(t,n,e){"use strict";e(3),e(28)},28:function(t,n){},47:function(t,n,e){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function s(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n["default"]=t,n}function o(t,n){for(var e=Object.getOwnPropertyNames(n),a=0;a<e.length;a++){var s=e[a],o=Object.getOwnPropertyDescriptor(n,s);o&&o.configurable&&void 0===t[s]&&Object.defineProperty(t,s,o)}return t}function p(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function r(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function c(t,n){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?t:n}function i(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(t,n):o(t,n))}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=void 0;var l=e(1),u=s(l),f=e(2),d=a(f),k=function(t){function n(){return r(this,n),c(this,t.apply(this,arguments))}return i(n,t),n.prototype.render=function(){var t,n=this.props,e=n.prefixCls,a=n.size,s=n.className,o=n.children,r=n.style,c=(0,d["default"])((t={},p(t,""+e,!0),p(t,s,!!s),p(t,e+"-wb"+a,!0),t));return u.createElement("div",{className:c,style:r},o)},n}(u.Component);n["default"]=k,k.defaultProps={prefixCls:"am-wingblank",size:8},t.exports=n["default"]},48:function(t,n,e){"use strict";e(3),e(50)},50:function(t,n){},330:function(t,n,e){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function s(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n["default"]=t,n}function o(t,n){for(var e=Object.getOwnPropertyNames(n),a=0;a<e.length;a++){var s=e[a],o=Object.getOwnPropertyDescriptor(n,s);o&&o.configurable&&void 0===t[s]&&Object.defineProperty(t,s,o)}return t}function p(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function r(t,n){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?t:n}function c(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(t,n):o(t,n))}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=void 0;var i=e(1),l=s(i),u=e(358),f=a(u),d=function(t){function n(){return p(this,n),r(this,t.apply(this,arguments))}return c(n,t),n.prototype.render=function(){return l.createElement(f["default"],this.props)},n}(l.Component);n["default"]=d,d.Step=f["default"].Step,d.defaultProps={prefixCls:"am-steps",iconPrefix:"ant",labelPlacement:"vertical",current:0},t.exports=n["default"]},331:function(t,n,e){"use strict";e(3),e(348)},348:function(t,n){},356:function(t,n,e){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function s(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function o(t,n){var e={};for(var a in t)n.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}function p(t){var n,e,a=t.className,p=t.prefixCls,c=t.style,l=t.tailWidth,f=t.status,d=void 0===f?"wait":f,k=t.iconPrefix,y=t.icon,m=t.wrapperStyle,b=t.adjustMarginRight,h=t.stepLast,g=t.stepNumber,v=t.description,O=t.title,P=o(t,["className","prefixCls","style","tailWidth","status","iconPrefix","icon","wrapperStyle","adjustMarginRight","stepLast","stepNumber","description","title"]),w=(0,u["default"])((n={},s(n,p+"-icon",!0),s(n,k+"icon",!0),s(n,k+"icon-"+y,y),s(n,k+"icon-check",!y&&"finish"===d),s(n,k+"icon-cross",!y&&"error"===d),n)),j=y||"finish"===d||"error"===d?i["default"].createElement("span",{className:w}):i["default"].createElement("span",{className:p+"-icon"},g),x=(0,u["default"])((e={},s(e,p+"-item",!0),s(e,p+"-item-last",h),s(e,p+"-status-"+d,!0),s(e,p+"-custom",y),s(e,a,!!a),e));return i["default"].createElement("div",r({},P,{className:x,style:r({width:l,marginRight:b},c)}),h?"":i["default"].createElement("div",{className:p+"-tail"},i["default"].createElement("i",null)),i["default"].createElement("div",{className:p+"-step"},i["default"].createElement("div",{className:p+"-head",style:{background:m.background||m.backgroundColor}},i["default"].createElement("div",{className:p+"-head-inner"},j)),i["default"].createElement("div",{className:p+"-main"},i["default"].createElement("div",{className:p+"-title",style:{background:m.background||m.backgroundColor}},O),v?i["default"].createElement("div",{className:p+"-description"},v):"")))}var r=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t},c=e(1),i=a(c),l=e(2),u=a(l);p.propTypes={className:c.PropTypes.string,prefixCls:c.PropTypes.string,style:c.PropTypes.object,wrapperStyle:c.PropTypes.object,tailWidth:c.PropTypes.oneOfType([c.PropTypes.number,c.PropTypes.string]),status:c.PropTypes.string,iconPrefix:c.PropTypes.string,icon:c.PropTypes.string,adjustMarginRight:c.PropTypes.oneOfType([c.PropTypes.number,c.PropTypes.string]),stepLast:c.PropTypes.bool,stepNumber:c.PropTypes.string,description:c.PropTypes.any,title:c.PropTypes.any},t.exports=p},357:function(t,n,e){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}function s(t,n){for(var e=Object.getOwnPropertyNames(n),a=0;a<e.length;a++){var s=e[a],o=Object.getOwnPropertyDescriptor(n,s);o&&o.configurable&&void 0===t[s]&&Object.defineProperty(t,s,o)}return t}function o(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function p(t,n){var e={};for(var a in t)n.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}function r(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function c(t,n){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?t:n}function i(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(t,n):s(t,n))}Object.defineProperty(n,"__esModule",{value:!0});var l=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t},u=e(1),f=a(u),d=e(4),k=a(d),y=e(2),m=a(y),b=function(t){function n(e){r(this,n);var a=c(this,t.call(this,e));return a.culcLastStepOffsetWidth=function(){var t=k["default"].findDOMNode(a);t.children.length>0&&(a.culcTimeout=setTimeout(function(){var n=t.lastChild.offsetWidth+1;a.state.lastStepOffsetWidth!==n&&a.setState({lastStepOffsetWidth:n})}))},a.state={lastStepOffsetWidth:0},a}return i(n,t),n.prototype.componentDidMount=function(){this.culcLastStepOffsetWidth()},n.prototype.componentDidUpdate=function(){this.culcLastStepOffsetWidth()},n.prototype.componentWillUnmount=function(){this.culcTimeout&&clearTimeout(this.culcTimeout)},n.prototype.render=function(){var t,n=this,e=this.props,a=e.prefixCls,s=e.style,r=void 0===s?{}:s,c=e.className,i=e.children,u=e.direction,d=e.labelPlacement,k=e.iconPrefix,y=e.status,b=e.size,h=e.current,g=p(e,["prefixCls","style","className","children","direction","labelPlacement","iconPrefix","status","size","current"]),v=i.length-1,O=this.state.lastStepOffsetWidth>0,P=(0,m["default"])((t={},o(t,a,!0),o(t,a+"-"+b,b),o(t,a+"-"+u,!0),o(t,a+"-label-"+d,"horizontal"===u),o(t,a+"-hidden",!O),o(t,c,c),t));return f["default"].createElement("div",l({className:P,style:r},g),f["default"].Children.map(i,function(t,s){var o="vertical"!==u&&s!==v&&O?100/v+"%":null,p="vertical"===u||s===v?null:-(n.state.lastStepOffsetWidth/v+1),c={stepNumber:(s+1).toString(),stepLast:s===v,tailWidth:o,adjustMarginRight:p,prefixCls:a,iconPrefix:k,wrapperStyle:r};return"error"===y&&s===h-1&&(c.className=e.prefixCls+"-next-error"),t.props.status||(s===h?c.status=y:s<h?c.status="finish":c.status="wait"),f["default"].cloneElement(t,c)},this))},n}(f["default"].Component);n["default"]=b,b.propTypes={prefixCls:u.PropTypes.string,iconPrefix:u.PropTypes.string,direction:u.PropTypes.string,labelPlacement:u.PropTypes.string,children:u.PropTypes.any,status:u.PropTypes.string,size:u.PropTypes.string},b.defaultProps={prefixCls:"rc-steps",iconPrefix:"rc",direction:"horizontal",labelPlacement:"horizontal",current:0,status:"process",size:""},t.exports=n["default"]},358:function(t,n,e){"use strict";var a=e(357);a.Step=e(356),t.exports=a},831:function(t,n,e){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}var s=(e(48),e(47)),o=a(s),p=(e(27),e(26)),r=a(p),c=(e(331),e(330)),i=a(c),l=e(1),u=a(l),f=e(4);a(f);t.exports={content:[["p","\u901a\u8fc7\u8bbe\u7f6e ",["code","Steps.Step"]," \u7684 ",["code","icon"]," \u5c5e\u6027\uff0c\u53ef\u4ee5\u542f\u7528\u81ea\u5b9a\u4e49\u56fe\u6807\u3002"]],meta:{order:3,title:"\u5e26\u56fe\u6807\u7684\u6b65\u9aa4\u6761",filename:"components/steps/demo/icon.md",id:"components-steps-demo-icon"},toc:["ul"],highlightedCode:["pre",{lang:"jsx",highlighted:'<span class="token keyword" >import</span> <span class="token punctuation" >{</span> Steps<span class="token punctuation" >,</span> WingBlank<span class="token punctuation" >,</span> WhiteSpace <span class="token punctuation" >}</span> <span class="token keyword" >from</span> <span class="token string" >\'antd-mobile\'</span><span class="token punctuation" >;</span>\n<span class="token keyword" >const</span> Step <span class="token operator" >=</span> Steps<span class="token punctuation" >.</span>Step<span class="token punctuation" >;</span>\n\nReactDOM<span class="token punctuation" >.</span><span class="token function" >render</span><span class="token punctuation" >(</span>\n  <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>div</span> <span class="token attr-name" >className</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>stepsExample<span class="token punctuation" >"</span></span><span class="token punctuation" >></span></span>\n    <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WhiteSpace</span> <span class="token attr-name" >size</span><span class="token script language-javascript" ><span class="token punctuation" >=</span><span class="token punctuation" >{</span><span class="token number" >20</span><span class="token punctuation" >}</span></span> <span class="token punctuation" >/></span></span>\n    <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>WingBlank</span> <span class="token attr-name" >size</span><span class="token script language-javascript" ><span class="token punctuation" >=</span><span class="token punctuation" >{</span><span class="token number" >20</span><span class="token punctuation" >}</span></span><span class="token punctuation" >></span></span>\n      <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Steps</span><span class="token punctuation" >></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Step</span> <span class="token attr-name" >status</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>finish<span class="token punctuation" >"</span></span> <span class="token attr-name" >title</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>\u6b65\u9aa41<span class="token punctuation" >"</span></span> <span class="token attr-name" >icon</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>cloud<span class="token punctuation" >"</span></span> <span class="token punctuation" >/></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Step</span> <span class="token attr-name" >status</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>process<span class="token punctuation" >"</span></span> <span class="token attr-name" >title</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>\u6b65\u9aa42<span class="token punctuation" >"</span></span> <span class="token attr-name" >icon</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>apple<span class="token punctuation" >"</span></span> <span class="token punctuation" >/></span></span>\n        <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;</span>Step</span> <span class="token attr-name" >status</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>wait<span class="token punctuation" >"</span></span> <span class="token attr-name" >title</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>\u6b65\u9aa43<span class="token punctuation" >"</span></span> <span class="token attr-name" >icon</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>github<span class="token punctuation" >"</span></span> <span class="token punctuation" >/></span></span>\n      <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>Steps</span><span class="token punctuation" >></span></span>\n    <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>WingBlank</span><span class="token punctuation" >></span></span>\n  <span class="token tag" ><span class="token tag" ><span class="token punctuation" >&lt;/</span>div</span><span class="token punctuation" >></span></span>\n<span class="token punctuation" >,</span> mountNode<span class="token punctuation" >)</span><span class="token punctuation" >;</span>'}],preview:function(){var t=i["default"].Step;return u["default"].createElement("div",{className:"stepsExample"},u["default"].createElement(r["default"],{size:20}),u["default"].createElement(o["default"],{size:20},u["default"].createElement(i["default"],null,u["default"].createElement(t,{status:"finish",title:"\u6b65\u9aa41",icon:"cloud"}),u["default"].createElement(t,{status:"process",title:"\u6b65\u9aa42",icon:"apple"}),u["default"].createElement(t,{status:"wait",title:"\u6b65\u9aa43",icon:"github"}))))},style:"\n  .demo-preview-wrapper .demo-preview-scroller * {\n    box-sizing: border-box;\n  }\n"}}});