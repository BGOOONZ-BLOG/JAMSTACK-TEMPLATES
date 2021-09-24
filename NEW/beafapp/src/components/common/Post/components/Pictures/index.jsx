import React from 'react'
import ImageZoom from 'react-medium-image-zoom'
import LazyImage from 'react-lazy-progressive-image'
import { Flex, Img } from './styles'

export const Pictures = ({ before_img, after_img, title }) => (
  <Flex>
    <Img>
      <LazyImage
        placeholder="https://placeholder.pics/svg/500"
        src={before_img}
      >
        {(src, loading, isVisible) => (
          <ImageZoom
            image={{
              src,
              alt: title,
              className: 'img',
            }}
          />
        )}
      </LazyImage>
    </Img>
    <Img>
      <LazyImage placeholder="https://placeholder.pics/svg/500" src={after_img}>
        {(src, loading, isVisible) => (
          <ImageZoom
            image={{
              src,
              alt: title,
              className: 'img',
            }}
          />
        )}
      </LazyImage>
    </Img>
  </Flex>
)
