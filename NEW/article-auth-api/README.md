# Hire Dev API

## Setting up the env variables

Create `.env` file and pass in the next values:
> DM me for the key values

```bash
DB=mongodb://localhost:27017/hiredev
SECRET_KEY=xxxxx
REACT_APP_URL='http://127.0.0.1:3000'
NODE_ENV=dev
SENDGRID_API_KEY=xxxxxx
```

## Installation

1. `yarn`
2. Start database: `yarn database`
3. Start the dev server: `yarn dev`

> Replace `mongo-data` with the name of the folder your data is stored within the npm scripts.

## Models

User

- firstName
- lastName
- username
- email
- password
- tokens

## Routes

- User

```bash
POST /api/user/register
// Register a new user and returns user data with the generated token
// Public

POST /api/user/login
// Login user and returns user data with the generated token
// Public

DELETE /api/user/logout
// Logout
// Private

POST /api/user/resend/email
// Resend email to confirm account
// Private

GET /api/user/verify
// Verifies token is not expired
// Private

PATCH /api/user/email/confirm
// Confirms email
// Private

PATCH /api/user/reset/password
// Resets password
// Private

POST /api/user/forgotten/password
// Sends email to reset password
// Private

POST /api/user/users/all
// Returns all registered users
// Public

POST /api/user/users/total
// Returns total registered users
// Public

POST /api/user/:id
// Returns specific user
// Public

PATCH /api/user/edit
// Edits user account
// Private

PATCH /api/user/follow/:id
// Follow another user
// Private

PATCH /api/user/unfollow/:id
// Unfollow another user
// Private

PATCH /api/user/edit
// Edits user account
// Private
```
