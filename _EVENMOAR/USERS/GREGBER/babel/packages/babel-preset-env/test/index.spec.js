"use strict";

const babelPresetEnv = require("../lib/index.js");

describe("babel-preset-env", () => {
  describe("isPluginRequired", () => {
    const MAX_VERSION = `${Number.MAX_SAFE_INTEGER}.0.0`;

    it("returns true if no targets are specified", () => {
      expect(babelPresetEnv.isPluginRequired({}, {})).toBe(true);
    });

    it("returns true if plugin feature is not implemented in one or more targets", () => {
      let targets;
      const plugin = {
        edge: false,
        firefox: 45,
        chrome: 49,
      };

      targets = {
        chrome: MAX_VERSION,
        firefox: MAX_VERSION,
      };
      expect(babelPresetEnv.isPluginRequired(targets, plugin)).toBe(false);

      targets = {
        edge: "12",
      };
      expect(babelPresetEnv.isPluginRequired(targets, plugin)).toBe(true);
    });

    it("returns false if plugin feature is implemented by lower than target", () => {
      const plugin = {
        chrome: 49,
      };
      const targets = {
        chrome: MAX_VERSION,
      };

      expect(babelPresetEnv.isPluginRequired(targets, plugin)).toBe(false);
    });

    it("returns false if plugin feature is implemented is equal to target", () => {
      const plugin = {
        chrome: 49,
      };
      const targets = {
        chrome: "49.0.0",
      };
      expect(babelPresetEnv.isPluginRequired(targets, plugin)).toBe(false);
    });

    it("returns true if plugin feature is implemented is greater than target", () => {
      const plugin = {
        chrome: 50,
      };
      const targets = {
        chrome: "49.0.0",
      };
      expect(babelPresetEnv.isPluginRequired(targets, plugin)).toBe(true);
    });

    it("returns when target is a decimal", () => {
      const plugin = {
        node: 6.9,
      };
      const targets = {
        node: "6.10.0",
      };
      expect(babelPresetEnv.isPluginRequired(targets, plugin)).toBe(false);
    });

    it("throws an error if target version is invalid", () => {
      const plugin = {
        chrome: 50,
      };
      const targets = {
        chrome: 55,
      };
      expect(() => babelPresetEnv.isPluginRequired(targets, plugin)).toThrow();
    });
  });

  describe("transformIncludesAndExcludes", () => {
    it("should return in transforms array", () => {
      expect(
        babelPresetEnv.transformIncludesAndExcludes([
          "transform-arrow-functions",
        ]),
      ).toEqual({
        all: ["transform-arrow-functions"],
        plugins: new Set(["transform-arrow-functions"]),
        builtIns: new Set(),
      });
    });

    it("should return in built-ins array", () => {
      expect(babelPresetEnv.transformIncludesAndExcludes(["es6.map"])).toEqual({
        all: ["es6.map"],
        plugins: new Set(),
        builtIns: new Set(["es6.map"]),
      });
    });
  });
});
