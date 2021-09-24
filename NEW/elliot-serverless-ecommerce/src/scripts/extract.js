const { readFileSync, writeFileSync } = require("fs");
const { basename, resolve } = require("path");
const glob = require("glob");

const languageFilenames = glob.sync("./src/lang/*.json");

let data = {};
for (let filename of languageFilenames) {
	let locale = basename(filename, ".json");
	let file = readFileSync(filename, "utf8");
	let strings = JSON.parse(file);
	data[locale] = strings;
}

let fileContents = `export default ${JSON.stringify(data)}`;

writeFileSync("./src/lang/strings.js", fileContents);
console.log(`> Wrote strings to: "${resolve("./src/lang/strings.js")}"`);
