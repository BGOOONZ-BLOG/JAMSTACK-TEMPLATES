# Jotai example

This example shows how to integrate [Jotai](https://github.com/pmndrs/jotai) in Next.js.

- Jotai is a primitive and flexible state management library for React.
- Jotai is TypeScript oriented and aims to expose a minimalistic API for dealing with state in a data-flow graph way.
- Jotai uses the `useHydrateAtoms` hook to hydrate the value of an atom, for values that come from the server.

## Preview

Preview the example live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-jotai)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-jotai&project-name=with-jotai&repository-name=with-jotai)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-jotai with-jotai-app
# or
yarn create next-app --example with-jotai with-jotai-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
