---
description: Enable Image Optimization with the built-in Image component.
---

# next/image

<details>
  <summary><b>Examples</b></summary>
  <ul>
    <li><a href="https://github.com/vercel/next.js/tree/canary/examples/image-component">Image Component</a></li>
  </ul>
</details>

<details>
  <summary><b>Version History</b></summary>

| Version   | Changes                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------- |
| `v11.1.0` | `onLoadingComplete` and `lazyBoundary` props added.                                               |
| `v11.0.0` | `src` prop support for static import.<br/>`placeholder` prop added.<br/>`blurDataURL` prop added. |
| `v10.0.5` | `loader` prop added.                                                                              |
| `v10.0.1` | `layout` prop added.                                                                              |
| `v10.0.0` | `next/image` introduced.                                                                          |

</details>

> Before moving forward, we recommend you to read
> [Image Optimization](/docs/basic-features/image-optimization.md) first.

Image Optimization can be enabled via the `<Image />` component exported by
`next/image`.

## Usage

For an example, consider a project with the following files:

- `pages/index.js`
- `public/me.png`

We can serve an optimized image like so:

```jsx
import Image from 'next/image'
import profilePic from '../public/me.png'

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image src={profilePic} alt="Picture of the author" />
      <p>Welcome to my homepage!</p>
    </>
  )
}

export default Home
```

## Required Props

The `<Image />` component requires the following properties.

### src

Required and must be one of the following:

1. A statically imported image file, as in the example code above, or
2. A path string. This can be either an absolute external URL,
   or an internal path depending on the [loader](#loader).

When using an external URL, you must add it to
[domains](/docs/basic-features/image-optimization.md#domains) in
`next.config.js`.

### width

The width of the image, in pixels. Must be an integer without a unit.

Required, except for statically imported images, or those with [`layout="fill"`](#layout).

### height

The height of the image, in pixels. Must be an integer without a unit.

Required, except for statically imported images, or those with [`layout="fill"`](#layout).

## Optional Props

The `<Image />` component optionally accepts the following properties.

### layout

The layout behavior of the image as the viewport changes size.

| `layout`              | Behavior                                                 | `srcSet`                                                                                                                                                                                        | `sizes` |
| --------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `intrinsic` (default) | Scale *down* to fit width of container, up to image size | `1x`, `2x` (based on [imageSizes](/docs/basic-features/image-optimization.md#image-sizes))                                                                                                      | N/A     |
| `fixed`               | Sized to `width` and `height` exactly                    | `1x`, `2x` (based on [imageSizes](/docs/basic-features/image-optimization.md#image-sizes))                                                                                                      | N/A     |
| `responsive`          | Scale to fit width of container                          | `640w`, `750w`, ... `2048w`, `3840w` (based on [imageSizes](/docs/basic-features/image-optimization.md#image-sizes) and [deviceSizes](/docs/basic-features/image-optimization.md#device-sizes)) | `100vw` |
| `fill`                | Grow in X and Y axes to fill container                   | `640w`, `750w`, ... `2048w`, `3840w` (based on [imageSizes](/docs/basic-features/image-optimization.md#image-sizes) and [deviceSizes](/docs/basic-features/image-optimization.md#device-sizes)) | `100vw` |

- [Demo the `intrinsic` layout (default)](https://image-component.nextjs.gallery/layout-intrinsic)
  - When `intrinsic`, the image will scale the dimensions down for smaller viewports, but maintain the original dimensions for larger viewports.
- [Demo the `fixed` layout](https://image-component.nextjs.gallery/layout-fixed)
  - When `fixed`, the image dimensions will not change as the viewport changes (no responsiveness) similar to the native `img` element.
- [Demo the `responsive` layout](https://image-component.nextjs.gallery/layout-responsive)
  - When `responsive`, the image will scale the dimensions down for smaller viewports and scale up for larger viewports.
  - Ensure the parent element uses `display: block` in their stylesheet.
- [Demo the `fill` layout](https://image-component.nextjs.gallery/layout-fill)
  - When `fill`, the image will stretch both width and height to the dimensions of the parent element, provided the parent element is relative.
  - This is usually paired with the [`objectFit`](#objectFit) property.
  - Ensure the parent element has `position: relative` in their stylesheet.
- [Demo background image](https://image-component.nextjs.gallery/background)

### loader

A custom function used to resolve URLs. Defaults to [`images` object in `next.config.js`](/docs/basic-features/image-optimization.md#loader).

`loader` is a function returning a string, given the following parameters:

- [`src`](#src)
- [`width`](#width)
- [`quality`](#quality)

```js
import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

const MyImage = (props) => {
  return (
    <Image
      loader={myLoader}
      src="me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

### sizes

A string mapping media queries to device sizes. Defaults to `100vw`.

We recommend setting `sizes` when using `layout="responsive"` or `layout="fill"` and your image will **not** be the same width as the viewport.

[Learn more](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes).

### quality

The quality of the optimized image, an integer between `1` and `100` where `100`
is the best quality. Defaults to `75`.

### priority

When true, the image will be considered high priority and
[preload](https://web.dev/preload-responsive-images/).

Should only be used when the image is visible above the fold. Defaults to
`false`.

### placeholder

A placeholder to use while the image is loading, possible values are `blur` or `empty`. Defaults to `empty`.

When `blur`, the [`blurDataURL`](#blurdataurl) property will be used as the placeholder. If `src` is an object from a static import and the imported image is jpg, png, or webp, then `blurDataURL` will automatically be populated.

For dynamic images, you must provide the [`blurDataURL`](#blurdataurl) property. Solutions such as [Plaiceholder](https://github.com/joe-bell/plaiceholder) can help with `base64` generation.

When `empty`, there will be no placeholder while the image is loading, only empty space.

Try it out:

- [Demo the `blur` placeholder](https://image-component.nextjs.gallery/placeholder)
- [Demo the shimmer effect with `blurDataURL` prop](https://image-component.nextjs.gallery/shimmer)

## Advanced Props

In some cases, you may need more advanced usage. The `<Image />` component
optionally accepts the following advanced properties.

### objectFit

The image fit when using `layout="fill"`.

[Learn more](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)

### objectPosition

The image position when using `layout="fill"`.

[Learn more](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position)

### onLoadingComplete

A callback function that is invoked once the image is completely loaded and the [placeholder](#placeholder) has been removed.

The `onLoadingComplete` function accepts one parameter, an object with the following properties:

- [`naturalWidth`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth)
- [`naturalHeight`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalHeight)

### loading

> **Attention**: This property is only meant for advanced usage. Switching an
> image to load with `eager` will normally **hurt performance**.
>
> We recommend using the [`priority`](#priority) property instead, which
> properly loads the image eagerly for nearly all use cases.

The loading behavior of the image. Defaults to `lazy`.

When `lazy`, defer loading the image until it reaches a calculated distance from
the viewport.

When `eager`, load the image immediately.

[Learn more](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)

### blurDataURL

A [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) to
be used as a placeholder image before the `src` image successfully loads. Only takes effect when combined
with [`placeholder="blur"`](#placeholder).

Must be a base64-encoded image. It will be enlarged and blurred, so a very small image (10px or
less) is recommended. Including larger images as placeholders may harm your application performance.

Try it out:

- [Demo the default `blurDataURL` prop](https://image-component.nextjs.gallery/placeholder)
- [Demo the shimmer effect with `blurDataURL` prop](https://image-component.nextjs.gallery/shimmer)

You can also [generate a solid color Data URL](https://png-pixel.com) to match the image.

### lazyBoundary

A string (with similar syntax to the margin property) that acts as the bounding box used to detect the intersection of the viewport with the image and trigger lazy [loading](#loading). Defaults to `"200px"`.

[Learn more](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin)

### unoptimized

When true, the source image will be served as-is instead of changing quality,
size, or format. Defaults to `false`.

## Other Props

Other properties on the `<Image />` component will be passed to the underlying
`img` element with the exception of the following:

- `style`. Use `className` instead.
- `srcSet`. Use
  [Device Sizes](/docs/basic-features/image-optimization.md#device-sizes)
  instead.
- `ref`. Use [`onLoadingComplete`](#onloadingcomplete) instead.
- `decoding`. It is always `"async"`.

## Styling

`next/image` wraps the `img` element with other `div` elements to maintain the aspect ratio of the image and prevent [Cumulative Layout Shift](https://vercel.com/blog/core-web-vitals#cumulative-layout-shift).

To add styles to the underlying `img` element, pass the `className` prop to the `<Image />` component. Then, use Next.js' [built-in CSS support](/docs/basic-features/built-in-css-support.md) to add rules to that class.

**Note:** If using [`layout="fill"`](/docs/api-reference/next/image.md#layout), ensure the parent element uses `position: relative`.

## Related

For more information on what to do next, we recommend the following sections:

<div class="card">
  <a href="/docs/basic-features/image-optimization.md">
    <b>Image Optimization</b>
    <small>See how to configure domains and loaders.</small>
  </a>
</div>
