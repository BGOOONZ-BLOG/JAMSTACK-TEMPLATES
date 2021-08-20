import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  api.assertVersion(7);

  // When enabled and plugins includes flow, all files should be parsed as if
  // the @flow pragma was provided.
  const { all } = options;

  if (typeof all !== "boolean" && typeof all !== "undefined") {
    throw new Error(".all must be a boolean, or undefined");
  }

  return {
    manipulateOptions(opts, parserOpts) {
      // If the file has already enabled TS, assume that this is not a
      // valid Flowtype file.
      if (
        parserOpts.plugins.some(
          p => (Array.isArray(p) ? p[0] : p) === "typescript",
        )
      ) {
        return;
      }

      parserOpts.plugins.push(["flow", { all }]);
    },
  };
});
