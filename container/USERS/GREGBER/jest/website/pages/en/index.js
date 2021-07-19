/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const translate = require('../../server/translate.js').translate;
const translation = require('../../server/translation.js');

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

class HomeSplash extends React.Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">
            <div className="projectLogo">
              <img
                src={siteConfig.baseUrl + 'img/jest-outline.svg'}
                alt="Jest"
              />
            </div>
            <div className="inner">
              <h2 className="projectTitle">
                {siteConfig.title}
                <small>
                  {
                    translation[this.props.language]['localized-strings']
                      .tagline
                  }
                </small>
              </h2>
              <div className="section promoSection">
                <div className="promoRow">
                  <div className="pluginRowBlock">
                    <Button href="#use">
                      <translate>Try Out Jest</translate>
                    </Button>
                    <Button
                      href={
                        siteConfig.baseUrl +
                        'docs/' +
                        this.props.language +
                        '/getting-started.html'
                      }
                    >
                      <translate>Get Started</translate>
                    </Button>
                    <Button href={'#watch'}>
                      <translate>Watch Talks</translate>
                    </Button>
                    <Button
                      href={
                        siteConfig.baseUrl +
                        'docs/' +
                        this.props.language +
                        '/snapshot-testing.html'
                      }
                    >
                      <translate>Learn More</translate>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="githubButton" style={{minHeight: '20px'}}>
                <a
                  className="github-button"
                  href={this.props.config.repoUrl}
                  data-icon="octicon-star"
                  data-count-href="/facebook/jest/stargazers"
                  data-show-count={true}
                  data-count-aria-label="# stargazers on GitHub"
                  aria-label="Star facebook/jest on GitHub"
                >
                  Star
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    const showcase = siteConfig.users
      .filter(user => {
        return user.pinned;
      })
      .map((user, i) => {
        return (
          <a href={user.infoLink} key={i}>
            <img src={user.image} title={user.caption} />
          </a>
        );
      });

    return (
      <div>
        <HomeSplash language={this.props.language} config={siteConfig} />
        <div className="mainContainer">
          <Container padding={['bottom', 'top']}>
            <GridBlock
              align="center"
              contents={[
                {
                  content: (
                    <translate>
                      Complete and easy to set-up JavaScript testing solution.
                      Works out of the box for any React project.
                    </translate>
                  ),
                  image: '/jest/img/content/female-technologist.png',
                  imageAlign: 'top',
                  title: <translate>Easy Setup</translate>,
                },
                {
                  content: (
                    <translate>
                      Fast interactive watch mode runs only test files related
                      to changed files and is optimized to give signal quickly.
                    </translate>
                  ),
                  image: '/jest/img/content/runner.png',
                  imageAlign: 'top',
                  title: <translate>Instant Feedback</translate>,
                },
                {
                  content: (
                    <translate>
                      Capture snapshots of React trees or other serializable
                      values to simplify testing and to analyze how state
                      changes over time.
                    </translate>
                  ),
                  image: '/jest/img/content/camera-with-flash.png',
                  imageAlign: 'top',
                  title: <translate>Snapshot Testing</translate>,
                },
              ]}
              layout="fourColumn"
            />
          </Container>

          <div
            className="productShowcaseSection paddingBottom"
            style={{textAlign: 'center'}}
          >
            <h2>
              <translate>Zero configuration testing platform</translate>
            </h2>
            <MarkdownBlock>
              <translate>
                Jest is used by Facebook to test all JavaScript code including
                React applications. One of Jest's philosophies is to provide an
                integrated \"zero-configuration\" experience. We observed that
                when engineers are provided with ready-to-use tools, they end up
                writing more tests, which in turn results in more stable and
                healthy code bases.
              </translate>
            </MarkdownBlock>
          </div>

          <Container padding={['bottom', 'top']} background="light">
            <GridBlock
              contents={[
                {
                  content: (
                    <translate>
                      Jest parallelizes test runs across workers to maximize
                      performance. Console messages are buffered and printed
                      together with test results. Sandboxed test files and
                      automatic global state resets for every test so no two
                      tests conflict with each other.
                    </translate>
                  ),
                  image: '/jest/img/content/feature-fast.png',
                  imageAlign: 'right',
                  title: <translate>Fast and sandboxed</translate>,
                },
              ]}
            />
          </Container>
          <Container padding={['bottom', 'top']}>
            <GridBlock
              contents={[
                {
                  content: (
                    <translate>
                      Easily create code coverage reports using
                      [`--coverage`](https://facebook.github.io/jest/docs/en/cli.html#coverage).
                      No additional setup or libraries needed! Jest can collect
                      code coverage information from entire projects, including
                      untested files.
                    </translate>
                  ),
                  image: '/jest/img/content/feature-coverage.png',
                  imageAlign: 'left',
                  title: <translate>Built-in code coverage reports</translate>,
                },
              ]}
            />
          </Container>
          <Container padding={['bottom', 'top']} background="light">
            <GridBlock
              contents={[
                {
                  content: (
                    <translate>
                      Jest is already configured when you use
                      [`create-react-app`](https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html)
                      or [`react-native
                      init`](http://facebook.github.io/react-native/docs/getting-started.html)
                      to create your React and React Native projects. Place your
                      tests in a `__tests__` folder, or name your test files
                      with a `.spec.js` or `.test.js` extension. Whatever you
                      prefer, Jest will find and run your tests.
                    </translate>
                  ),
                  image: '/jest/img/content/feature-config-react.png',
                  imageAlign: 'right',
                  title: <translate>Zero configuration</translate>,
                },
              ]}
            />
          </Container>

          <Container background="dark" padding={['bottom', 'top']}>
            <a className="anchor" name="use" />
            <a className="hash-link" href="#use" />
            <div className="blockElement imageAlignSide twoByGridBlock">
              <div className="blockContent">
                <h2>
                  <translate>Try it out!</translate>
                </h2>
                <div>
                  <MarkdownBlock>
                    <translate>
                      You can try out a real version of Jest using
                      [repl.it](https://repl.it/languages/jest). Consider a
                      function, `add()`, that adds two numbers. We can use a
                      basic test in `add-test.js` to verify that 1 + 2 equals 3.
                      Hit \"run\" to try it out!
                    </translate>
                  </MarkdownBlock>
                </div>
              </div>
              <div className="jest-repl">
                <iframe src="https://repl.it/@amasad/try-jest?lite=true" />
              </div>
            </div>
          </Container>

          <Container padding={['bottom', 'top']}>
            <GridBlock
              contents={[
                {
                  content: (
                    <translate>
                      Powerful [mocking
                      library](/jest/docs/en/mock-functions.html) for functions
                      and modules. Mock React Native components using
                      `jest-react-native`.
                    </translate>
                  ),
                  image: '/jest/img/content/feature-mocking.png',
                  imageAlign: 'left',
                  title: <translate>Powerful mocking library</translate>,
                },
              ]}
            />
          </Container>

          <Container padding={['bottom', 'top']} background="light">
            <GridBlock
              contents={[
                {
                  content: (
                    <translate>
                      Jest works with any compile-to-JavaScript language and
                      integrates seamlessly with [Babel](https://babeljs.io) and
                      with TypeScript through
                      [ts-jest](https://github.com/kulshekhar/ts-jest).
                    </translate>
                  ),
                  image: '/jest/img/content/feature-typescript.png',
                  imageAlign: 'right',
                  title: <translate>Works with TypeScript</translate>,
                },
              ]}
            />
          </Container>

          <Container padding={['bottom', 'top']}>
            <a className="anchor" name="watch" />
            <a className="hash-link" href="#watch" />
            <div className="blockElement imageAlignSide twoByGridBlock">
              <div className="video">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/PvabBs_utr8?rel=0"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
              <div className="blockContent">
                <h2>
                  <translate>Watch Talks about Jest</translate>
                </h2>
                <div>
                  <MarkdownBlock>
                    <translate>
                      The Jest core team and contributors regularly speak about
                      Jest and Delightful JavaScript Testing. Check out our
                      talks about [Building High-Quality JavaScript
                      Tools](https://www.youtube.com/watch?v=PvabBs_utr8) at
                      JSConf.eu 2017 or our talk about [Jest as a
                      Platform](https://www.youtube.com/watch?v=NtjyeojAOBs) at
                      ReactiveConf 2017.
                    </translate>
                  </MarkdownBlock>
                </div>
              </div>
            </div>

            <div
              className="productShowcaseSection paddingTop"
              style={{textAlign: 'center'}}
            >
              <a
                className="button"
                href={siteConfig.baseUrl + this.props.language + '/videos.html'}
              >
                <translate>Watch more videos</translate>
              </a>
            </div>
          </Container>

          <div className="productShowcaseSection paddingBottom">
            <h2>
              <translate>Who's using Jest?</translate>
            </h2>
            <p>
              <translate>
                Jest is used by teams of all sizes to test web applications,
                node.js services, mobile apps, and APIs.
              </translate>
            </p>
            <div className="logos">{showcase}</div>
            <div className="more-users">
              <a
                className="button"
                href={siteConfig.baseUrl + this.props.language + '/users.html'}
              >
                <translate>More Jest Users</translate>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Index;
