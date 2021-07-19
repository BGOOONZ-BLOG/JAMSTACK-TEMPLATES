import transformES2015TemplateLiterals from "@babel/plugin-transform-template-literals";
import transformES2015Literals from "@babel/plugin-transform-literals";
import transformES2015FunctionName from "@babel/plugin-transform-function-name";
import transformES2015ArrowFunctions from "@babel/plugin-transform-arrow-functions";
import transformES2015BlockScopedFunctions from "@babel/plugin-transform-block-scoped-functions";
import transformES2015Classes from "@babel/plugin-transform-classes";
import transformES2015ObjectSuper from "@babel/plugin-transform-object-super";
import transformES2015ShorthandProperties from "@babel/plugin-transform-shorthand-properties";
import transformES2015DuplicateKeys from "@babel/plugin-transform-duplicate-keys";
import transformES2015ComputedProperties from "@babel/plugin-transform-computed-properties";
import transformES2015ForOf from "@babel/plugin-transform-for-of";
import transformES2015StickyRegex from "@babel/plugin-transform-sticky-regex";
import transformES2015UnicodeRegex from "@babel/plugin-transform-unicode-regex";
import transformES2015Spread from "@babel/plugin-transform-spread";
import transformES2015Parameters from "@babel/plugin-transform-parameters";
import transformES2015Destructuring from "@babel/plugin-transform-destructuring";
import transformES2015BlockScoping from "@babel/plugin-transform-block-scoping";
import transformES2015TypeofSymbol from "@babel/plugin-transform-typeof-symbol";
import transformES2015ModulesCommonJS from "@babel/plugin-transform-modules-commonjs";
import transformES2015ModulesSystemJS from "@babel/plugin-transform-modules-systemjs";
import transformES2015ModulesAMD from "@babel/plugin-transform-modules-amd";
import transformES2015ModulesUMD from "@babel/plugin-transform-modules-umd";
import transformES2015Instanceof from "@babel/plugin-transform-instanceof";
import transformRegenerator from "@babel/plugin-transform-regenerator";

export default (_, opts) => {
  let loose = false;
  let modules = "commonjs";
  let spec = false;

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
    if (opts.modules !== undefined) modules = opts.modules;
    if (opts.spec !== undefined) spec = opts.spec;
  }

  // be DRY
  const optsLoose = { loose };

  return {
    plugins: [
      [transformES2015TemplateLiterals, { loose, spec }],
      transformES2015Literals,
      transformES2015FunctionName,
      [transformES2015ArrowFunctions, { spec }],
      transformES2015BlockScopedFunctions,
      [transformES2015Classes, optsLoose],
      transformES2015ObjectSuper,
      transformES2015ShorthandProperties,
      transformES2015DuplicateKeys,
      [transformES2015ComputedProperties, optsLoose],
      [transformES2015ForOf, optsLoose],
      transformES2015StickyRegex,
      transformES2015UnicodeRegex,
      [transformES2015Spread, optsLoose],
      [transformES2015Parameters, optsLoose],
      [transformES2015Destructuring, optsLoose],
      transformES2015BlockScoping,
      transformES2015TypeofSymbol,
      transformES2015Instanceof,
      (modules === "commonjs" || modules === "cjs") && [
        transformES2015ModulesCommonJS,
        optsLoose,
      ],
      modules === "systemjs" && [transformES2015ModulesSystemJS, optsLoose],
      modules === "amd" && [transformES2015ModulesAMD, optsLoose],
      modules === "umd" && [transformES2015ModulesUMD, optsLoose],
      [transformRegenerator, { async: false, asyncGenerators: false }],
    ].filter(Boolean), // filter out falsy values
  };
};
