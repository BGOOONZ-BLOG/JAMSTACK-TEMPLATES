import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import { InternalLink } from '../../../text/link'
import immutable from '../../../../lib/immutable-component'

function DeploymentErrors() {
  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`
These error code could happen when using any ${<InternalLink href="/api#endpoints/deployments">deployment related endpoint</InternalLink>}.
    `
  ],
  [
    markdown(components)`
### Missing Files
    `
  ],
  [
    markdown(components)`
Some of the files you defined when creating the deployment are missing.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "missing_files",
    "message": "Missing files",
    "missing": []
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### No Files in the Deployment
    `
  ],
  [
    markdown(components)`
You tried to create an empty deployment.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "no_files",
    "message": "No files in the deployment"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Too Many Active Deployment Instances
    `
  ],
  [
    markdown(components)`
You reached the limit of running instances, you need to remove or scale down another deployment before creating a new one.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "instance_concurrency_exceeded",
    "message": "Too many active deployment instances"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Too Many Environment Variables
    `
  ],
  [
    markdown(components)`
The limit of environment variables per deployment is 100 and you defined more. The error message indicates the amount you define.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "env_too_many_keys",
    "message": "Too many env vars have been supplied (100 max allowed, but got #)"
  }
}`}</Code>}

> **#** is your number of variables.
    `
  ],
  [
    markdown(components)`
### Environment Variable Key with Invalid Characters
    `
  ],
  [
    markdown(components)`
Some environment variable name contains an invalid character. The only valid characters are letters, digits and ${<InlineCode>_</InlineCode>}.

The error message will contain the ${<InlineCode>KEY</InlineCode>} with the problem.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "env_key_invalid_characters",
    "message": "The env key "KEY" contains invalid characters. Only letters, digits and \`_\` are allowed",
    "key": KEY
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Environment Variable Key with a Long Name
    `
  ],
  [
    markdown(components)`
An environment variable name is too long, the maximum permitted name is 256 characters.

The error message contains the environment ${<InlineCode>KEY</InlineCode>}.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "env_key_invalid_length",
    "message": "The env key "KEY" exceeds the 256 length limit",
    "key": KEY
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Environment Variable Value with a Long Name
    `
  ],
  [
    markdown(components)`
An environment variable value contains a value too long, the maximum permitted value is 65536 characters.

The error message contains the environment ${<InlineCode>KEY</InlineCode>}.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "env_value_invalid_length",
    "message": "The env value for "KEY" exceeds the 65536 length limit",
    "key": KEY,
    "value": VALUE
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Environment Variable Value Is an Object without UID
    `
  ],
  [
    markdown(components)`
The value of an environment variable is object but it doesn't have a uid.

The error message contains the environment ${<InlineCode>KEY</InlineCode>} which has the error.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "env_value_invalid_type_missing_uid",
    "message": "The env key "KEY" passed an object as a value with no \`uid\` key"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Environment Variable Value Is an Object with Unknown Props
    `
  ],
  [
    markdown(components)`
The value of an environment variable is an object with unknow attributes, it only can have a ${<InlineCode>uid</InlineCode>} key inside the object.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "env_value_invalid_type_unknown_props",
    "message": "The env key "KEY" passed an object with unknown properties. Only \`uid\` is allowed when passing an object"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Environment Variable Value with an Invalid Type
    `
  ],
  [
    markdown(components)`
An environment variable value passed is of an unsupported type.

The error message contains the environment ${<InlineCode>KEY</InlineCode>}.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "env_value_invalid_type",
    "message": "The env key "KEY" passed an unsupported type for its value",
    "key": KEY
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Not Allowed to Access a Secret
    `
  ],
  [
    markdown(components)`
You're tryin to use a secret but you don't have access to it.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "env_secret_forbidden",
    "message": "Not allowed to access secret \\"NAME\\"",
    "uid": UID
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Missing Secret
    `
  ],
  [
    markdown(components)`
You're trying to use a secret as an environment value and it doesn't exists.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "env_secret_missing",
    "message": "Could not find a secret by uid "UID"",
    "uid": UID
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Invalid Session Affinity Value
    `
  ],
  [
    markdown(components)`
You tried to set session affinity with an invalid value. Only allowed values are ${<InlineCode>ip</InlineCode>} or ${<InlineCode>random</InlineCode>}.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "invalid_session_affinity",
    "message": "Session affinity must be ip or random"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Wrong Value for ${<InlineCode>public</InlineCode>} Property
    `
  ],
  [
    markdown(components)`
You tried to create a deployment on the OSS plan with the ${<InlineCode>public</InlineCode>} property
either set to ${<InlineCode>false</InlineCode>} or not set at all.

On the OSS plan, it is required that you set this property to ${<InlineCode>true</InlineCode>} in
order to explicitly acknowledge that the deployment's code will be
publicly accessibly.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "plan_requires_public",
    "message": "Your plan (OSS) requires the deployment to be marked as public."
  }
}`}</Code>}
    `
  ]
]}
    />
  )
}

export default immutable(DeploymentErrors)
