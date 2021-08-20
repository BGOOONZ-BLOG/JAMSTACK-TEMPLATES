---
title: Conditional Page Builds
---

If you have a large site, you may be able to improve build times for data updates by enabling an experimental feature called "conditional page builds". While this is not as fast as true [Incremental Builds](https://www.gatsbyjs.com/docs/incremental-builds/) available in Gatsby Cloud, it can save time on the HTML-generation step by not re-rendering HTML for pages with unchanged data. This feature is experimental, but _may_ improve build times for sites with a large number of complex pages. Test it thoroughly with your site before deploying to production.

For more info on the standard build process, please see the [overview of the Gatsby build process](/docs/overview-of-the-gatsby-build-process/).

> ❗ Conditional page builds do not currently account for static queries. Any query result differences will not trigger pages to rebuild.

## How to use

To enable conditional page builds, use the environment variable `GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true` in your `gatsby build` command, for example:

`GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true gatsby build --log-pages`

This will run the Gatsby build process, but only build pages that have data changes since your last build. If there are any changes to code (JS, CSS) the bundling process returns a new webpack compilation hash which causes all pages to be rebuilt.

### Reporting what has been built

You may want to retrieve a list of the pages that were built. For example, if you want to perform a sync action in your CI/CD pipeline.

To list the paths in the build assets (`public`) folder, you can use one (or both) of the following arguments in your `build` command.

- `--log-pages` parameter will output all the file paths that were updated or deleted at the end of the build stage.

```shell
success Building production JavaScript and CSS bundles - 82.198s
success run queries - 82.762s - 4/4 0.05/s
success Building static HTML for pages - 19.386s - 2/2 0.10/s
+ success Delete previous page data - 1.512s
info Done building in 152.084 sec
+ info Built pages:
+ Updated page: /about
+ Updated page: /accounts/example
+ info Deleted pages:
+ Deleted page: /test

Done in 154.501 sec
```

- `--write-to-file` creates two files in the `.cache` folder, with lists of the changed paths in the build assets (`public`) folder.

  - `newPages.txt` will contain a list of new or changed paths
  - `deletedPages.txt` will contain a list of deleted paths

## More information

- This feature works by comparing the page data from the previous build to the new page data. This creates a list of page directories that are passed to the static build process.

- To enable this build option you will need to set an environment variable, which requires access to do so in your build environment.

- This feature is not available with `gatsby develop`.

- You should not try to use this flag alongside Incremental Builds in Gatsby Cloud, as it uses a different process and may conflict with it.

- You will need to persist the `.cache` and `public` directories between builds. This allows for comparisons and reuse of previously built files. If `.cache` directory was not persisted then a full build will be triggered. If `public` directory was not persisted then you might experience failing builds or builds that are missing certain assets.

- Any code changes (templates, components, source handling, new plugins etc) will prompt the creation of a new webpack compilation hash and trigger a full build.

Note: When using the `GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES` flag it is important to do so consistently when building your project. Otherwise, the cache will be cleared and the necessary data for comparison will no longer be available, removing the ability to check for incremental data changes.
