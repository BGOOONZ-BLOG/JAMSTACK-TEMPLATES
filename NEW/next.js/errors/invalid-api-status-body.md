Invalid API Route Status/Body Response

#### Why This Error Occurred

In one of your API routes a 204 or 304 status code was used as well as sending a response body.

This is invalid as a 204 or 304 status code dictates no response body should be present.

#### Possible Ways to Fix It

Send an empty body when using a 204 or 304 status code or use a different status code while sending a response body.

Before

```js
export default function handler(req, res) {
  res.status(204).send('invalid body')
}
```

After

```js
export default function handler(req, res) {
  res.status(204).send()
}
```

### Useful Links

- [204 status code documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204)
- [304 status code documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304)
