import fixtures from "fixturez";
import stripAnsi from "strip-ansi";
import * as git from "@changesets/git";
import { defaultConfig } from "@changesets/config";
import { temporarilySilenceLogs } from "@changesets/test-utils";
import writeChangeset from "@changesets/write";

import {
  askCheckboxPlus,
  askConfirm,
  askQuestionWithEditor,
  askQuestion,
  askList
} from "../../../utils/cli-utilities";
import addChangeset from "..";

const f = fixtures(__dirname);

jest.mock("../../../utils/cli-utilities");
jest.mock("@changesets/git");
jest.mock("@changesets/write");
// @ts-ignore
writeChangeset.mockImplementation(() => Promise.resolve("abcdefg"));
// @ts-ignore
git.commit.mockImplementation(() => Promise.resolve(true));

// @ts-ignore
git.getChangedPackagesSinceRef.mockImplementation(({ ref }) => {
  expect(ref).toBe("master");
  return [];
});

// @ts-ignore
const mockUserResponses = mockResponses => {
  const summary = mockResponses.summary || "summary message mock";
  let majorReleases: Array<string> = [];
  let minorReleases: Array<string> = [];
  Object.entries(mockResponses.releases).forEach(([pkgName, type]) => {
    if (type === "major") {
      majorReleases.push(pkgName);
    } else if (type === "minor") {
      minorReleases.push(pkgName);
    }
  });
  let callCount = 0;
  let returnValues = [
    Object.keys(mockResponses.releases),
    majorReleases,
    minorReleases
  ];
  // @ts-ignore
  askCheckboxPlus.mockImplementation(() => {
    if (callCount === returnValues.length) {
      throw new Error(`There was an unexpected call to askCheckboxPlus`);
    }
    return returnValues[callCount++];
  });

  let confirmAnswers = {
    "Is this your desired changeset?": true
  };

  if (mockResponses.consoleSummaries && mockResponses.editorSummaries) {
    let i = 0;
    let j = 0;
    // @ts-ignore
    askQuestion.mockImplementation(() => mockResponses.consoleSummaries[i++]);
    // @ts-ignore
    askQuestionWithEditor.mockImplementation(
      () => mockResponses.editorSummaries[j++]
    );
  } else {
    // @ts-ignore
    askQuestion.mockReturnValueOnce(summary);
  }

  // @ts-ignore
  askConfirm.mockImplementation(question => {
    question = stripAnsi(question);
    // @ts-ignore
    if (confirmAnswers[question]) {
      // @ts-ignore
      return confirmAnswers[question];
    }
    throw new Error(`An answer could not be found for ${question}`);
  });
};

describe("Changesets", () => {
  temporarilySilenceLogs();

  it("should generate changeset to patch a single package", async () => {
    const cwd = await f.copy("simple-project");

    mockUserResponses({ releases: { "pkg-a": "patch" } });
    await addChangeset(cwd, { empty: false }, defaultConfig);

    const expectedChangeset = {
      summary: "summary message mock",
      releases: [{ name: "pkg-a", type: "patch" }]
    };
    // @ts-ignore
    const call = writeChangeset.mock.calls[0][0];
    expect(call).toEqual(expectedChangeset);
  });

  it.each`
    consoleSummaries               | editorSummaries                           | expectedSummary
    ${["summary on step 1"]}       | ${[]}                                     | ${"summary on step 1"}
    ${[""]}                        | ${["summary in external editor"]}         | ${"summary in external editor"}
    ${[""]}                        | ${["", "", "summary in external editor"]} | ${"summary in external editor"}
    ${["", "summary after error"]} | ${1 /* mock implementation will throw */} | ${"summary after error"}
  `(
    "should read summary",
    // @ts-ignore
    async ({ consoleSummaries, editorSummaries, expectedSummary }) => {
      const cwd = await f.copy("simple-project");

      mockUserResponses({
        releases: { "pkg-a": "patch" },
        consoleSummaries,
        editorSummaries
      });
      await addChangeset(cwd, { empty: false }, defaultConfig);

      const expectedChangeset = {
        summary: expectedSummary,
        releases: [{ name: "pkg-a", type: "patch" }]
      };
      // @ts-ignore
      const call = writeChangeset.mock.calls[0][0];
      expect(call).toEqual(expectedChangeset);
    }
  );

  it("should generate a changeset in a single package repo", async () => {
    const cwd = await f.copy("single-package");

    const summary = "summary message mock";

    // @ts-ignore
    askList.mockReturnValueOnce(Promise.resolve("minor"));

    let confirmAnswers = {
      "Is this your desired changeset?": true
    };
    // @ts-ignore
    askQuestion.mockReturnValueOnce("");
    // @ts-ignore
    askQuestionWithEditor.mockReturnValueOnce(summary);
    // @ts-ignore
    askConfirm.mockImplementation(question => {
      question = stripAnsi(question);
      // @ts-ignore
      if (confirmAnswers[question]) {
        // @ts-ignore
        return confirmAnswers[question];
      }
      throw new Error(`An answer could not be found for ${question}`);
    });

    await addChangeset(cwd, { empty: false }, defaultConfig);

    const expectedChangeset = {
      summary: "summary message mock",
      releases: [{ name: "single-package", type: "minor" }]
    };
    // @ts-ignore
    const call = writeChangeset.mock.calls[0][0];
    expect(call).toEqual(expectedChangeset);
  });
  it("should commit when the commit flag is passed in", async () => {
    const cwd = await f.copy("simple-project-custom-config");

    mockUserResponses({ releases: { "pkg-a": "patch" } });
    await addChangeset(
      cwd,
      { empty: false },
      { ...defaultConfig, commit: true }
    );
    expect(git.add).toHaveBeenCalledTimes(1);
  });
  it("should create empty changeset when empty flag is passed in", async () => {
    const cwd = await f.copy("simple-project");

    await addChangeset(cwd, { empty: true }, defaultConfig);

    const expectedChangeset = {
      releases: [],
      summary: ""
    };
    // @ts-ignore
    const call = writeChangeset.mock.calls[0][0];
    expect(call).toEqual(expectedChangeset);
  });
});
