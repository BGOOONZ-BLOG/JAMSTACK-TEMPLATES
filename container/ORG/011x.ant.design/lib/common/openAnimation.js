'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _velocityAnimate = require('velocity-animate');

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

function animate(node, show, transitionName, done) {
  var ok = undefined;

  function complete() {
    if (!ok) {
      ok = true;
      done();
    }
  }

  // Fix safari flash bug
  node.style.display = show ? 'block' : 'none';
  (0, _velocityAnimate2['default'])(node, transitionName, {
    duration: 240,
    complete: complete,
    easing: 'easeInOutQuad'
  });
  return {
    stop: function stop() {
      (0, _velocityAnimate2['default'])(node, 'finish');
      complete();
    }
  };
}

var animation = {
  enter: function enter(node, done) {
    return animate(node, false, 'slideDown', done);
  },
  leave: function leave(node, done) {
    return animate(node, true, 'slideUp', done);
  },
  appear: function appear(node, done) {
    return animate(node, false, 'slideDown', done);
  }
};

exports['default'] = animation;
module.exports = exports['default'];