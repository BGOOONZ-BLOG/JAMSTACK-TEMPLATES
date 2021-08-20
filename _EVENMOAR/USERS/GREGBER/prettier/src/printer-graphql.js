"use strict";

const docBuilders = require("./doc-builders");
const concat = docBuilders.concat;
const join = docBuilders.join;
const hardline = docBuilders.hardline;
const line = docBuilders.line;
const softline = docBuilders.softline;
const group = docBuilders.group;
const indent = docBuilders.indent;
const ifBreak = docBuilders.ifBreak;

const util = require("./util");

function genericPrint(path, options, print) {
  const n = path.getValue();
  if (!n) {
    return "";
  }

  if (typeof n === "string") {
    return n;
  }

  switch (n.kind) {
    case "Document": {
      return concat([
        join(concat([hardline, hardline]), path.map(print, "definitions")),
        hardline
      ]);
    }
    case "OperationDefinition": {
      return concat([
        n.name === null ? "" : n.operation,
        n.name ? concat([" ", path.call(print, "name")]) : "",
        n.variableDefinitions && n.variableDefinitions.length
          ? group(
              concat([
                "(",
                indent(
                  concat([
                    softline,
                    join(
                      concat([ifBreak("", ", "), softline]),
                      path.map(print, "variableDefinitions")
                    )
                  ])
                ),
                softline,
                ")"
              ])
            )
          : "",
        printDirectives(path, print, n),
        n.selectionSet ? (n.name === null ? "" : " ") : "",
        path.call(print, "selectionSet")
      ]);
    }
    case "FragmentDefinition": {
      return concat([
        "fragment ",
        path.call(print, "name"),
        " on ",
        path.call(print, "typeCondition"),
        printDirectives(path, print, n),
        " ",
        path.call(print, "selectionSet")
      ]);
    }
    case "SelectionSet": {
      return concat([
        "{",
        indent(
          concat([
            hardline,
            join(
              hardline,
              path.call(
                selectionsPath => printSequence(selectionsPath, options, print),
                "selections"
              )
            )
          ])
        ),
        hardline,
        "}"
      ]);
    }
    case "Field": {
      return group(
        concat([
          n.alias ? concat([path.call(print, "alias"), ": "]) : "",
          path.call(print, "name"),
          n.arguments.length > 0
            ? group(
                concat([
                  "(",
                  indent(
                    concat([
                      softline,
                      join(
                        concat([ifBreak("", ", "), softline]),
                        path.call(
                          argsPath => printSequence(argsPath, options, print),
                          "arguments"
                        )
                      )
                    ])
                  ),
                  softline,
                  ")"
                ])
              )
            : "",
          printDirectives(path, print, n),
          n.selectionSet ? " " : "",
          path.call(print, "selectionSet")
        ])
      );
    }
    case "Name": {
      return n.value;
    }
    case "StringValue": {
      return concat(['"', n.value.replace(/["\\]/g, "\\$&"), '"']);
    }
    case "IntValue":
    case "FloatValue":
    case "EnumValue": {
      return n.value;
    }
    case "BooleanValue": {
      return n.value ? "true" : "false";
    }
    case "NullValue": {
      return "null";
    }
    case "Variable": {
      return concat(["$", path.call(print, "name")]);
    }
    case "ListValue": {
      return group(
        concat([
          "[",
          indent(
            concat([
              softline,
              join(
                concat([ifBreak("", ", "), softline]),
                path.map(print, "values")
              )
            ])
          ),
          softline,
          "]"
        ])
      );
    }
    case "ObjectValue": {
      return group(
        concat([
          "{",
          options.bracketSpacing && n.fields.length > 0 ? " " : "",
          indent(
            concat([
              softline,
              join(
                concat([ifBreak("", ", "), softline]),
                path.map(print, "fields")
              )
            ])
          ),
          softline,
          ifBreak("", options.bracketSpacing && n.fields.length > 0 ? " " : ""),
          "}"
        ])
      );
    }
    case "ObjectField":
    case "Argument": {
      return concat([
        path.call(print, "name"),
        ": ",
        path.call(print, "value")
      ]);
    }

    case "Directive": {
      return concat([
        "@",
        path.call(print, "name"),
        n.arguments.length > 0
          ? group(
              concat([
                "(",
                indent(
                  concat([
                    softline,
                    join(
                      concat([ifBreak("", ", "), softline]),
                      path.call(
                        argsPath => printSequence(argsPath, options, print),
                        "arguments"
                      )
                    )
                  ])
                ),
                softline,
                ")"
              ])
            )
          : ""
      ]);
    }

    case "NamedType": {
      return path.call(print, "name");
    }

    case "VariableDefinition": {
      return concat([
        path.call(print, "variable"),
        ": ",
        path.call(print, "type"),
        n.defaultValue ? concat([" = ", path.call(print, "defaultValue")]) : ""
      ]);
    }

    case "TypeExtensionDefinition": {
      return concat(["extend ", path.call(print, "definition")]);
    }

    case "ObjectTypeDefinition": {
      return concat([
        "type ",
        path.call(print, "name"),
        n.interfaces.length > 0
          ? concat([" implements ", join(", ", path.map(print, "interfaces"))])
          : "",
        printDirectives(path, print, n),
        " {",
        n.fields.length > 0
          ? indent(
              concat([
                hardline,
                join(
                  hardline,
                  path.call(
                    fieldsPath => printSequence(fieldsPath, options, print),
                    "fields"
                  )
                )
              ])
            )
          : "",
        hardline,
        "}"
      ]);
    }

    case "FieldDefinition": {
      return concat([
        path.call(print, "name"),
        n.arguments.length > 0
          ? group(
              concat([
                "(",
                indent(
                  concat([
                    softline,
                    join(
                      concat([ifBreak("", ", "), softline]),
                      path.call(
                        argsPath => printSequence(argsPath, options, print),
                        "arguments"
                      )
                    )
                  ])
                ),
                softline,
                ")"
              ])
            )
          : "",
        ": ",
        path.call(print, "type"),
        printDirectives(path, print, n)
      ]);
    }

    case "DirectiveDefinition": {
      return concat([
        "directive ",
        "@",
        path.call(print, "name"),
        n.arguments.length > 0
          ? group(
              concat([
                "(",
                indent(
                  concat([
                    softline,
                    join(
                      concat([ifBreak("", ", "), softline]),
                      path.call(
                        argsPath => printSequence(argsPath, options, print),
                        "arguments"
                      )
                    )
                  ])
                ),
                softline,
                ")"
              ])
            )
          : "",
        concat([" on ", join(" | ", path.map(print, "locations"))])
      ]);
    }

    case "EnumTypeDefinition": {
      return concat([
        "enum ",
        path.call(print, "name"),
        printDirectives(path, print, n),
        " {",
        n.values.length > 0
          ? indent(
              concat([
                hardline,
                join(
                  hardline,
                  path.call(
                    valuesPath => printSequence(valuesPath, options, print),
                    "values"
                  )
                )
              ])
            )
          : "",
        hardline,
        "}"
      ]);
    }

    case "EnumValueDefinition": {
      return concat([
        path.call(print, "name"),
        printDirectives(path, print, n)
      ]);
    }

    case "InputValueDefinition": {
      return concat([
        path.call(print, "name"),
        ": ",
        path.call(print, "type"),
        n.defaultValue ? concat([" = ", path.call(print, "defaultValue")]) : "",
        printDirectives(path, print, n)
      ]);
    }

    case "InputObjectTypeDefinition": {
      return concat([
        "input ",
        path.call(print, "name"),
        printDirectives(path, print, n),
        " {",
        n.fields.length > 0
          ? indent(
              concat([
                hardline,
                join(
                  hardline,
                  path.call(
                    fieldsPath => printSequence(fieldsPath, options, print),
                    "fields"
                  )
                )
              ])
            )
          : "",
        hardline,
        "}"
      ]);
    }

    case "SchemaDefinition": {
      return concat([
        "schema",
        printDirectives(path, print, n),
        " {",
        n.operationTypes.length > 0
          ? indent(
              concat([
                hardline,
                join(
                  hardline,
                  path.call(
                    opsPath => printSequence(opsPath, options, print),
                    "operationTypes"
                  )
                )
              ])
            )
          : "",
        hardline,
        "}"
      ]);
    }

    case "OperationTypeDefinition": {
      return concat([
        path.call(print, "operation"),
        ": ",
        path.call(print, "type")
      ]);
    }

    case "InterfaceTypeDefinition": {
      return concat([
        "interface ",
        path.call(print, "name"),
        printDirectives(path, print, n),
        " {",
        n.fields.length > 0
          ? indent(
              concat([
                hardline,
                join(
                  hardline,
                  path.call(
                    fieldsPath => printSequence(fieldsPath, options, print),
                    "fields"
                  )
                )
              ])
            )
          : "",
        hardline,
        "}"
      ]);
    }

    case "FragmentSpread": {
      return concat([
        "...",
        path.call(print, "name"),
        printDirectives(path, print, n)
      ]);
    }

    case "InlineFragment": {
      return concat([
        "...",
        n.typeCondition
          ? concat([" on ", path.call(print, "typeCondition")])
          : "",
        printDirectives(path, print, n),
        " ",
        path.call(print, "selectionSet")
      ]);
    }

    case "UnionTypeDefinition": {
      return group(
        concat([
          "union ",
          path.call(print, "name"),
          " =",
          ifBreak("", " "),
          indent(
            concat([
              ifBreak(concat([line, "  "])),
              join(concat([line, "| "]), path.map(print, "types"))
            ])
          )
        ])
      );
    }

    case "ScalarTypeDefinition": {
      return concat([
        "scalar ",
        path.call(print, "name"),
        printDirectives(path, print, n)
      ]);
    }

    case "NonNullType": {
      return concat([path.call(print, "type"), "!"]);
    }

    case "ListType": {
      return concat(["[", path.call(print, "type"), "]"]);
    }

    default:
      /* istanbul ignore next */
      throw new Error("unknown graphql type: " + JSON.stringify(n.kind));
  }
}

function printDirectives(path, print, n) {
  if (n.directives.length === 0) {
    return "";
  }

  return concat([
    " ",
    group(
      indent(
        concat([
          softline,
          join(
            concat([ifBreak("", " "), softline]),
            path.map(print, "directives")
          )
        ])
      )
    )
  ]);
}

function printSequence(sequencePath, options, print) {
  const count = sequencePath.getValue().length;

  return sequencePath.map((path, i) => {
    const printed = print(path);

    if (
      util.isNextLineEmpty(options.originalText, path.getValue()) &&
      i < count - 1
    ) {
      return concat([printed, hardline]);
    }

    return printed;
  });
}

module.exports = genericPrint;
