## Next js Unsplash demo
- `/` Fetches your collections from Unsplash during build time using `getStaticProps`
- `/collection/[id]` Incrementally generates the page upon a visit by anyone, read more about [ISR](https://vercel.com/docs/next.js/incremental-static-regeneration) and also fetches that specific collection's photos.
