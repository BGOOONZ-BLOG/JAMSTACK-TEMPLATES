import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import warning from 'warning';
import Head from 'next/head';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppContent from 'docs/src/modules/components/AppContent';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Demo from 'docs/src/modules/components/Demo';
import Carbon from 'docs/src/modules/components/Carbon';
import { getHeaders, getContents, getTitle } from 'docs/src/modules/utils/parseMarkdown';

const styles = {
  root: {
    marginBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
};

const demoRegexp = /^"demo": "(.*)"/;
const SOURCE_CODE_ROOT_URL = 'https://github.com/mui-org/material-ui/tree/v1-beta';

function MarkdownDocs(props, context) {
  const { classes, demos, markdown, markdownLocation: markdownLocationProp } = props;
  const contents = getContents(markdown);
  const headers = getHeaders(markdown);

  let markdownLocation = markdownLocationProp || context.activePage.pathname;

  if (!markdownLocationProp) {
    // Hack for handling the nested demos
    if (markdownLocation.indexOf('/demos') === 0) {
      const token = markdownLocation.split('/');
      token.push(token[token.length - 1]);
      markdownLocation = token.join('/');
    }

    if (headers.filename) {
      markdownLocation = headers.filename;
    } else {
      markdownLocation = `/docs/src/pages${markdownLocation}.md`;
    }
  }

  return (
    <AppContent className={classes.root}>
      <Head>
        <title>{`${getTitle(markdown)} - Material-UI`}</title>
      </Head>
      <div className={classes.header}>
        <Button component="a" href={`${SOURCE_CODE_ROOT_URL}${markdownLocation}`}>
          {'Edit this page'}
        </Button>
      </div>
      <Carbon key={markdownLocation} />
      {contents.map((content, index) => {
        const match = content.match(demoRegexp);

        if (match && demos) {
          const demoOptions = JSON.parse(`{${content}}`);

          const name = demoOptions.demo;
          warning(demos && demos[name], `Missing demo: ${name}.`);
          return (
            <Demo
              key={content}
              js={demos[name].js}
              raw={demos[name].raw}
              index={index}
              demoOptions={demoOptions}
              githubLocation={`${SOURCE_CODE_ROOT_URL}/docs/src/${name}`}
            />
          );
        }

        return <MarkdownElement key={content} text={content} />;
      })}
      {headers.components.length > 0 ? (
        <MarkdownElement
          text={`
## API

${headers.components
            .map(component => `- [&lt;${component} /&gt;](/api/${kebabCase(component)})`)
            .join('\n')}
          `}
        />
      ) : null}
    </AppContent>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  demos: PropTypes.object,
  markdown: PropTypes.string.isRequired,
  // You can define the direction location of the markdown file.
  // Otherwise, we try to determine it with an heuristic.
  markdownLocation: PropTypes.string,
};

MarkdownDocs.contextTypes = {
  activePage: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(MarkdownDocs);
