import withDoc from '../../../lib/with-doc'
import { arunoda } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import Image from '../../../components/image'
import { TerminalInput } from '../../../components/text/terminal'

export const meta = {
  title: 'Now for GitHub',
  description: 'Deploy each change in your GitHub repositories with Now to share and test with your colleagues. Instant share-able links to your work through pull requests.',
  date: '25 June 2018',
  editUrl: 'pages/docs/features/now-for-github.md',
  image: IMAGE_ASSETS_URL + '/docs/now-for-github/tw-card.png?v2'
}

You can use [Now CLI](https://zeit.co/now) or the [Desktop app](https://zeit.co/docs/getting-started/five-minute-guide-to-now#installing-now-desktop) to deploy different versions of your app on-demand, but doing it for each and every change you make in a project can be tedious and cumbersome.

That's where the Now app for GitHub comes in.

<Image
src={`${IMAGE_ASSETS_URL}/blog/now-for-github/ci.png`}
width={581}
height={185}
/>

## How it works
Just like a continuous integration build where you can test and deploy your code, you can now deploy each and every change in your GitHub pull request to Now instantly.

With Now for GitHub, you no longer need to worry about deploying your app manually for peer reviews or for staging builds. It's all automatic and it's all done without you even needing to add additional configuration files or webhooks.

## Setting up the app
If you're a new user, we have an onboarding page that helpfully describes how to use Now and how to set up the GitHub Now App along with setting up your account or team. Just visit https://zeit.co/onboarding to get started!

For existing users, you'll able to connect the GitHub app from your personal account or team settings. Head to your Account Settings and look for the "GitHub Integration" box in the "General" section of your settings. You'll have the option from there to install Now for Github via a button. Clicking that button will take you to GitHub to set up the options for the Now app.

GitHub will first allow you to select where you want to install Now.
If your account is a part of one or multiple GitHub organizations, it will prompt you to select either your personal account or the organization that you want to associate the Now app with. If not you'll go directly to the next step with your personal account associated with the Now app installation.

The next step is to select the repositories you'd like the Now app to install on. Unlike with GitHub OAuth apps, you don't need to give us access to all of the organizations and repositories associated with your account. You'll be given the choice of either all of your repositories or to select repositories within a list, under the account or organization you are installing Now to.

## Using the app
After you've set up the Now app for GitHub, all you have to do is submit a PR with some changes, or make some changes to an existing PR, on one of your selected GitHub repositories on the account or organization that you chose, and that's it! You'll now see a comment from Now telling you that your project is being deployed to Now.

You can access the deployment, or check the status of the deployment, from the GitHub PR UI checks section. From here you can see whether the Now app is deploying or has deployed.

If the app has deployed, you can click the Details link to the right of the Now deployment status in the same section, to access the live deployment of your app.

## Using Private npm
In case you want to use private npm packages with your app, you can use the special case we created to allow Now to install your private modules using an npm token.

### Step 1: Creating an npm token
Simply enter the following into your terminal to create a read-only token for your team or personal account:
<TerminalInput>
npm token create --read-only
</TerminalInput>

Read more about npm tokens [here](https://docs.npmjs.com/getting-started/working_with_tokens#how-to-create-new-tokens).

### Step 2: Creating a Now secret
You can utilize [Now Secrets](https://zeit.co/docs/getting-started/secrets) to prevent adding the token into your production code.

<TerminalInput>
now secrets add npm-token "your npm token value"
</TerminalInput>

Now we can use our secret in our app using `@npm-token`.

Learn more about Now Secrets [here](https://zeit.co/docs/getting-started/secrets).

### Step 3: Using your token with Now for GitHub
Now that we have a token and have that token available to use as a secret, we can use that secret in a special case we've added just for Now on GitHub.

Add your secret to your `now.json` file under `env.NOW_NPM_TOKEN` like the following:

```json
"env": {
  "NOW_NPM_TOKEN": "@npm-token"
}
```

Notice that the value of `NOW_NPM_TOKEN` is the same value we assigned our npm token in step 2 to our secret.

Now that we have this in place, Now will be able to use any private npm packages you have when deploying your app.

export default withDoc({...meta})(({children}) => <>{children}</>)
