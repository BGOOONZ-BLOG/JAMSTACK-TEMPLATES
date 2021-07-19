webpackJsonp([138],{813:function(t,e,d){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var n=d(1),i=(r(n),d(4));r(i);t.exports={content:["section",["h3","\u5b9a\u4e49\uff0fDefinition"],["p","\u9009\u62e9\u5668\u5c55\u793a\u4e86\u4e00\u7ec4\u503c\uff0c\u7528\u6237\u53ef\u4ee5\u4ece\u4e2d\u9009\u62e9\u4e00\u4e2a\u3002"],["p","\u9002\u7528\u4e8e\u6570\u636e\u6709\u7ea7\u8054\u5173\u7cfb\u7684\u9009\u62e9\u5668\uff0c\u6bd4\u5982",["code","\u7701\u5e02\u533a\u9009\u62e9"],"\u3001",["code","\u5546\u54c1\u5206\u7c7b\u9009\u62e9"],"\u3002"],["h3","\u89c4\u5219 / Rule"],["ul",["li",["p","\u662f\u65e5\u671f\u65f6\u95f4\u9009\u62e9\u5668\u7684\u901a\u7528\u6a21\u5f0f"]],["li",["p","\u5305\u62ec\u4e00\u4e2a\u6216\u591a\u4e2a\u6ed1\u8f6e\uff0c\u6bcf\u4e2a\u6ed1\u8f6e\u542b\u6709\u4e00\u7ec4\u503c"]],["li",["p","\u5f53\u524d\u9009\u4e2d\u7684\u503c\u5728\u4e2d\u95f4\uff0c\u4ee5\u6df1\u8272\u6807\u8bc6"]],["li",["p","\u4e0d\u53ef\u4ee5\u81ea\u5b9a\u4e49\u5927\u5c0f\uff08\u9009\u62e9\u5668\u7684\u5927\u5c0f\u4e0eiPhone\u7684\u952e\u76d8\u76f8\u540c\uff09"]]],["p","\u4e00\u822c\u6765\u8bf4\uff0c\u5f53\u7528\u6237\u5bf9\u6574\u7ec4\u503c\u90fd\u6bd4\u8f83\u719f\u6089\u7684\u65f6\u5019\uff0c\u53ef\u4ee5\u4f7f\u7528\u9009\u62e9\u5668\u3002\u7531\u4e8e\u5f53\u6ed1\u8f6e\u9759\u6b62\u7684\u65f6\u5019\uff0c\u5927\u90e8\u5206\u7684\u6570\u503c\u4f1a\u88ab\u9690\u85cf\uff0c\u6700\u597d\u662f\u5728\u7528\u6237\u5bf9\u6240\u6709\u6570\u503c\u5747\u6709\u9884\u671f\u7684\u60c5\u51b5\u4e0b\u624d\u4f7f\u7528\u9009\u62e9\u5668\u3002\n\u5c3d\u53ef\u80fd\u8ba9\u8ba9\u7528\u6237\u5728\u5f53\u524d\u89c6\u56fe\u4e2d\u4f7f\u7528\u9009\u62e9\u5668\u3002\u4e0d\u8981\u8ba9\u4ed6\u4eec\u5728\u4f7f\u7528\u9009\u62e9\u5668\u65f6\u8fd8\u8981\u8fdb\u5165\u5176\u5b83\u7684\u89c6\u56fe\u3002\n\u5982\u679c\u4f60\u9700\u8981\u5c55\u793a\u7684\u5907\u9009\u9879\u6570\u91cf\u5f88\u591a\uff0c\u8003\u8651\u4f7f\u7528\u8868\u683c\u89c6\u56fe(Table View)\u800c\u4e0d\u662f\u9009\u62e9\u5668\u3002\u56e0\u4e3a\u8868\u683c\u89c6\u56fe\u7684\u9ad8\u5ea6\u8f83\u5927\uff0c\u5185\u5bb9\u6eda\u52a8\u8d77\u6765\u4f1a\u66f4\u5feb\u3002"]],meta:{category:"Components",type:"Components",chinese:"\u9009\u62e9\u5668",english:"Picker",filename:"components/picker/index.md"},toc:["ul",["li",["a",{href:"#API"},"API"]]],api:["section",["h2","API"],["table",["thead",["tr",["th","\u6210\u5458"],["th","\u8bf4\u660e"],["th","\u7c7b\u578b"],["th","\u9ed8\u8ba4\u503c"]]],["tbody",["tr",["td","data"],["td","\u6570\u636e\u6e90"],["td","Array<{value, label, children: Array}>"],["td","-"]],["tr",["td","value"],["td","\u503c, \u683c\u5f0f","[value1, value2, value3]",", \u5bf9\u5e94\u6570\u636e\u6e90\u7684N\u7ea7value"],["td","Array"],["td","-"]],["tr",["td","format"],["td","\u683c\u5f0f\u5316\u9009\u4e2d\u7684\u503c"],["td","Function"],["td",["code","(values) => { return values.join(','); }"]]],["tr",["td","cols"],["td","\u5217\u6570"],["td","Number"],["td",["code","3"]]],["tr",["td","onChange"],["td","\u9009\u4e2d\u540e\u7684\u56de\u8c03"],["td","Function(value) ,\u5982\u679c\u4f7f\u7528rc-form,\u4e00\u822c\u4e0d\u9700\u8981\u81ea\u5df1\u5904\u7406"],["td","-"]],["tr",["td","children"],["td","\u901a\u5e38\u662fList.Item"],["td","Object"],["td","List.Item"]],["tr",["td","okText"],["td","\u9009\u4e2d\u7684\u6587\u6848"],["td","String"],["td",["code","\u786e\u5b9a"]]],["tr",["td","dismissText"],["td","\u53d6\u6d88\u9009\u4e2d\u7684\u6587\u6848"],["td","String"],["td",["code","\u53d6\u6d88"]]],["tr",["td","title"],["td","\u5927\u6807\u9898"],["td","String"],["td","-"]],["tr",["td","extra"],["td","Children\u5982\u679c\u662fList.Item,\u5219\u662fextra\u5c5e\u6027\u7684\u9ed8\u8ba4\u503c, \u5982\u679c\u662f\u5176\u5b83\u7684UI\u7ec4\u4ef6,\u5219value\u6216\u8005extra\u5c5e\u6027\u4f1a\u7ecf\u8fc7format\u65b9\u6cd5\u5904\u7406\u540e\u4f20\u7ed9children\u7684extra\u5c5e\u6027,\u7528\u6237\u9700\u8981\u81ea\u5df1\u5b9e\u73b0\u8fd9\u4e2a\u5c5e\u6027"],["td","String"],["td",["code","\u8bf7\u9009\u62e9"]]],["tr",["td","style"],["td","\u6837\u5f0f"],["td","Object"],["td","\u65e0"]]]]]}}});