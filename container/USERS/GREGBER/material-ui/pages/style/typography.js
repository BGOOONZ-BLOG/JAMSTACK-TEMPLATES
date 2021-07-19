import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/style/typography.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/style/Types.js': {
          js: require('docs/src/pages/style/Types').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/Types'), 'utf8')
`,
        },
        'pages/style/TypographyTheme.js': {
          js: require('docs/src/pages/style/TypographyTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/TypographyTheme'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
