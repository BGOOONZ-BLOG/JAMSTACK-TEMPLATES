# Not Todo REST API for my Gatsby talk

[Gatsby Talk](https://building-apps-with-gatsby.netlify.com/)
[Gatsby App](https://github.com/smakosh/gatsby-app-starter-rest-api)

## Prerequisites

- Node Js
- MongoDB Installed

Please create a new file `.env` and put these env variables

```bash
DB=mongodb://localhost:27017/todo
SECRET_KEY=NSA
REACT_APP_URL=http://localhost:8000 // when cors is enabled, this will be the only origin to send requests
```

## Installing

Installing the dependencies

```bash
npm i
```

## Start your mongodb database

```bash
npm run database
```

## Start the dev server

```bash
npm run dev
```

## Models

User:

- username
- email
- password
- tokens

Post:

- title
- isDone
- date
- _creator

## Routes

- User

```bash
POST /api/user/register
    // Register a new user and returns user data with the generated token
    // Public

POST /api/user/login
    // Login user and returns user data with the generated token
    // Public

GET /api/user/verify
    // Verifies token and returns current user data
    // Private

DELETE /api/user/logout
    // Logout
    // Private
```

- Post

```bash
POST /api/post
    // Create a new post
    // Private

GET /api/post/all
    // Get all the posts

GET /api/post/:id
    // Get Post by ID
    // Private

DELETE /api/post/:id
    // Delete Post by ID
    // Private

PATCH /api/post/:id
    // Update a post
    // Private
```

## Built with

- Express Js
- MongoDB & Mongoose
- And these useful of JavaScript libraries [package.json](package.json)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Support

If you love this Gatsby template and want to support me, you can do so through my Patreon

[![Support me on Patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/smakosh)
