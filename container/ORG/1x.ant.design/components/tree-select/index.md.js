webpackJsonp([84,135],{847:function(t,e,d){"use strict";function l(t){return t&&t.__esModule?t:{"default":t}}var r=d(1),a=(l(r),d(2));l(a);t.exports={content:["section",["p","\u6811\u578b\u9009\u62e9\u63a7\u4ef6\u3002"],["h2","\u4f55\u65f6\u4f7f\u7528"],["p","\u7c7b\u4f3c Select \u7684\u9009\u62e9\u63a7\u4ef6\uff0c\u53ef\u9009\u62e9\u7684\u6570\u636e\u7ed3\u6784\u662f\u4e00\u4e2a\u6811\u5f62\u7ed3\u6784\u65f6\uff0c\u53ef\u4ee5\u4f7f\u7528 TreeSelect\uff0c\u4f8b\u5982\u516c\u53f8\u5c42\u7ea7\u3001\u5b66\u79d1\u7cfb\u7edf\u3001\u5206\u7c7b\u76ee\u5f55\u7b49\u7b49\u3002"]],meta:{category:"Components",chinese:"\u6811\u9009\u62e9",type:"Form Controls",english:"TreeSelect",filename:"components/tree-select/index.md"},toc:["ul",["li",["a",{href:"#\u4f55\u65f6\u4f7f\u7528"},"\u4f55\u65f6\u4f7f\u7528"]],["li",["a",{href:"#API"},"API"]]],api:["section",["h2","API"],["h3","Tree props"],["table",["thead",["tr",["th","\u53c2\u6570"],["th","\u8bf4\u660e"],["th","\u7c7b\u578b"],["th","\u9ed8\u8ba4\u503c"]]],["tbody",["tr",["td","value"],["td","\u6307\u5b9a\u5f53\u524d\u9009\u4e2d\u7684\u6761\u76ee"],["td","\u901a\u5e38: String/Array",["string"],". \u8bbe\u7f6elabelInValue: {value:String,label:React.Node}/Array<{value,label}>. \u8bbe\u7f6etreeCheckStrictly(halfChecked\u9ed8\u8ba4\u4e3afalse): {value:String,label:React.Node, halfChecked}/Array<{value,label,halfChecked}>."],["td","\u65e0"]],["tr",["td","labelInValue"],["td","\u662f\u5426\u628a label \u5d4c\u5165\u5230 value \u91cc\uff0c\u8bbe\u7f6e\u540e\u53c2\u8003\u4ee5\u4e0a value \u7c7b\u578b\u5199\u6cd5"],["td","boolean"],["td","false"]],["tr",["td","defaultValue"],["td","\u6307\u5b9a\u9ed8\u8ba4\u9009\u4e2d\u7684\u6761\u76ee"],["td","string/Array",["string"]],["td","\u65e0"]],["tr",["td","multiple"],["td","\u652f\u6301\u591a\u9009\uff08\u5f53\u8bbe\u7f6e treeCheckable \u65f6\u81ea\u52a8\u53d8\u4e3atrue\uff09"],["td","boolean"],["td","false"]],["tr",["td","onSelect"],["td","\u88ab\u9009\u4e2d\u65f6\u8c03\u7528\uff0c\u53c2\u6570\u4e3a\u9009\u4e2d\u9879\u7684 value \u503c"],["td","function(value, node, extra)"],["td","\u65e0"]],["tr",["td","onChange"],["td","\u9009\u4e2d\u6811\u8282\u70b9\u65f6\u8c03\u7528\u6b64\u51fd\u6570"],["td","function(value, label, extra)"],["td","\u65e0"]],["tr",["td","allowClear"],["td","\u663e\u793a\u6e05\u9664\u6309\u94ae"],["td","boolean"],["td","false"]],["tr",["td","onSearch"],["td","\u6587\u672c\u6846\u503c\u53d8\u5316\u65f6\u56de\u8c03"],["td","function(value: String)"],["td"]],["tr",["td","placeholder"],["td","\u9009\u62e9\u6846\u9ed8\u8ba4\u6587\u5b57"],["td","string"],["td","\u65e0"]],["tr",["td","searchPlaceholder"],["td","\u641c\u7d22\u6846\u9ed8\u8ba4\u6587\u5b57"],["td","string"],["td","\u65e0"]],["tr",["td","dropdownStyle"],["td","\u4e0b\u62c9\u83dc\u5355\u7684\u6837\u5f0f"],["td","object"],["td","\u65e0"]],["tr",["td","dropdownMatchSelectWidth"],["td","\u4e0b\u62c9\u83dc\u5355\u548c\u9009\u62e9\u5668\u540c\u5bbd"],["td","boolean"],["td","true"]],["tr",["td","size"],["td","\u9009\u62e9\u6846\u5927\u5c0f\uff0c\u53ef\u9009 ",["code","large"]," ",["code","small"]],["td","String"],["td","default"]],["tr",["td","showSearch"],["td","\u5728\u4e0b\u62c9\u4e2d\u663e\u793a\u641c\u7d22\u6846(\u4ec5\u5728\u5355\u9009\u6a21\u5f0f\u4e0b\u751f\u6548)"],["td","boolean"],["td","false"]],["tr",["td","disabled"],["td","\u662f\u5426\u7981\u7528"],["td","boolean"],["td","false"]],["tr",["td","showCheckedStrategy"],["td",["code","TreeSelect.SHOW_ALL"],": \u663e\u793a\u6240\u6709\u9009\u4e2d\u8282\u70b9(\u5305\u62ec\u7236\u8282\u70b9). ",["code","TreeSelect.SHOW_PARENT"],": \u53ea\u663e\u793a\u7236\u8282\u70b9(\u5f53\u7236\u8282\u70b9\u4e0b\u6240\u6709\u5b50\u8282\u70b9\u90fd\u9009\u4e2d\u65f6). \u9ed8\u8ba4\u53ea\u663e\u793a\u5b50\u8282\u70b9."],["td","enum{TreeSelect.SHOW_ALL, TreeSelect.SHOW_PARENT, TreeSelect.SHOW_CHILD }"],["td","TreeSelect.SHOW_CHILD"]],["tr",["td","treeDefaultExpandAll"],["td","\u9ed8\u8ba4\u5c55\u5f00\u6240\u6709\u6811\u8282\u70b9"],["td","bool"],["td","false"]],["tr",["td","treeCheckable"],["td","\u663e\u793acheckbox"],["td","bool"],["td","false"]],["tr",["td","treeCheckStrictly"],["td","checkable\u72b6\u6001\u4e0b\u8282\u70b9\u9009\u62e9\u5b8c\u5168\u53d7\u63a7\uff08\u7236\u5b50\u8282\u70b9\u9009\u4e2d\u72b6\u6001\u4e0d\u518d\u5173\u8054\uff09"],["td","bool"],["td","false"]],["tr",["td","filterTreeNode"],["td","\u662f\u5426\u6839\u636e\u8f93\u5165\u9879\u8fdb\u884c\u7b5b\u9009\uff0c\u9ed8\u8ba4\u7528 treeNodeFilterProp \u7684\u503c\u4f5c\u4e3a\u8981\u7b5b\u9009\u7684 TreeNode \u7684\u5c5e\u6027\u503c"],["td","bool/Function(inputValue:string, treeNode:TreeNode) (\u51fd\u6570\u9700\u8981\u8fd4\u56debool\u503c)"],["td","Function"]],["tr",["td","treeNodeFilterProp"],["td","\u8f93\u5165\u9879\u8fc7\u6ee4\u5bf9\u5e94\u7684 treeNode \u5c5e\u6027"],["td","String"],["td","'value'"]],["tr",["td","treeNodeLabelProp"],["td","\u4f5c\u4e3a\u663e\u793a\u7684prop\u8bbe\u7f6e"],["td","String"],["td","'title'"]],["tr",["td","treeData"],["td","treeNodes\u6570\u636e\uff0c\u5982\u679c\u8bbe\u7f6e\u5219\u4e0d\u9700\u8981\u624b\u52a8\u6784\u9020TreeNode\u8282\u70b9\uff08value\u5728\u6574\u4e2a\u6811\u8303\u56f4\u5185\u552f\u4e00\uff09"],["td","array<{value, label, children, ","[disabled,selectable]","}>"],["td","[]"]],["tr",["td","treeDataSimpleMode"],["td","\u4f7f\u7528\u7b80\u5355\u683c\u5f0f\u7684treeData\uff0c\u5177\u4f53\u8bbe\u7f6e\u53c2\u8003\u53ef\u8bbe\u7f6e\u7684\u7c7b\u578b (\u6b64\u65f6treeData\u5e94\u53d8\u4e3a\u8fd9\u6837\u7684\u6570\u636e\u7ed3\u6784: ",'[{"id":1, "pid":0, "label":"test1"},...]',", ",["code","pId"],"\u662f\u7236\u8282\u70b9\u7684id)"],["td","bool/object{id:'id', pId:'pId', rootPId:null}"],["td","false"]],["tr",["td","loadData"],["td","\u5f02\u6b65\u52a0\u8f7d\u6570\u636e"],["td","function(node)"],["td","-"]],["tr",["td","getPopupContainer"],["td","\u83dc\u5355\u6e32\u67d3\u7236\u8282\u70b9\u3002\u9ed8\u8ba4\u6e32\u67d3\u5230 body \u4e0a\uff0c\u5982\u679c\u4f60\u9047\u5230\u83dc\u5355\u6eda\u52a8\u5b9a\u4f4d\u95ee\u9898\uff0c\u8bd5\u8bd5\u4fee\u6539\u4e3a\u6eda\u52a8\u7684\u533a\u57df\uff0c\u5e76\u76f8\u5bf9\u5176\u5b9a\u4f4d\u3002",["a",{title:null,href:"http://codepen.io/anon/pen/xVBOVQ?editors=001"},"\u793a\u4f8b"]],["td","Function(triggerNode)"],["td","() => document.body"]]]],["h3","TreeNode props"],["blockquote",["p","\u5efa\u8bae\u4f7f\u7528 treeData \u6765\u4ee3\u66ff TreeNode\uff0c\u514d\u53bb\u624b\u5de5\u6784\u9020\u9ebb\u70e6"]],["table",["thead",["tr",["th","\u53c2\u6570"],["th","\u8bf4\u660e"],["th","\u7c7b\u578b"],["th","\u9ed8\u8ba4\u503c"]]],["tbody",["tr",["td","disabled"],["td","\u662f\u5426\u7981\u7528"],["td","Boolean"],["td","false"]],["tr",["td","key"],["td","\u6b64\u9879\u5fc5\u987b\u8bbe\u7f6e\uff08\u5176\u503c\u5728\u6574\u4e2a\u6811\u8303\u56f4\u5185\u552f\u4e00\uff09"],["td","String"],["td","-"]],["tr",["td","value"],["td","\u9ed8\u8ba4\u6839\u636e\u6b64\u5c5e\u6027\u503c\u8fdb\u884c\u7b5b\u9009\uff08\u5176\u503c\u5728\u6574\u4e2a\u6811\u8303\u56f4\u5185\u552f\u4e00\uff09"],["td","String"],["td","-"]],["tr",["td","title"],["td","\u6811\u8282\u70b9\u663e\u793a\u7684\u5185\u5bb9"],["td","String/element"],["td","'---'"]],["tr",["td","isLeaf"],["td","\u662f\u5426\u662f\u53f6\u5b50\u8282\u70b9"],["td","bool"],["td","false"]]]]]}}});