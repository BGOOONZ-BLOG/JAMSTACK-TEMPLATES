(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("loose/module-name-with-overridden-global/input", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.looseModuleNameWithOverriddenGlobalInput = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var _default = 42;
  _exports.default = _default;
});
