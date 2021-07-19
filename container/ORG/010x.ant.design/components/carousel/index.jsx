// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = function matchMediaPolyfill() {
    return {
      matches: false,
      addListener: function () {
      },
      removeListener: function () {
      }
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

import Carousel from 'react-slick';
import React from 'react';
import assign from 'object-assign';

const AntCarousel = React.createClass({
  getDefaultProps() {
    return {
      dots: true,
      arrows: false
    };
  },
  render() {
    let props = assign({}, this.props);

    if (props.effect === 'fade') {
      props.fade = true;
      props.draggable = false;
    }

    let className = 'ant-carousel';
    if (props.vertical) {
      className = className + ' ant-carousel-vertical';
    }

    return (
      <div className={className}>
        <Carousel {...props} />
      </div>
    );
  }
});

export default AntCarousel;
