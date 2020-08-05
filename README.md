# Code Ring Event

## Saturday, Monday 10th 12 PM EST - Monday, August 24th 12 PM EST

## Synopsis

### MERN

- This event requires users to collaborate with each other and build a full stack application using:
  - MongoDB
  - Express.js
  - React
  - Node.js
- The goal is to build a working CRUD application that meets all requirements listed below.
- The top contributor will win a $50 Amazon Gift Card (x2 last event)

## Getting Started

- There are a total of ??? tasks. You are only allowed to submit *one* task ***per*** pull request. You may submit a new Pull Request once yours is closed or merged. For example, you cannot submit 1 Pull Request with both tasks 1) and 2) together.

- Do not install any additional modules, the only npm packages needed are already listed in the package.json

- Fork this repository, and then clone your own fork either with HTTP or SSH

- Run `npm i`

- To start the express backend, run `npm run start` to start the app, or if you have nodemon, `npm run dev`. This will start up the express app on Port 3001.

- Start up the react application by running `npm run start`. This automatically sets up a live testing environment in your default browser on port 3000.

- Please make sure you have Node.JS Installed, all of the required package dependencies, as well as MongoDB running on Port 27017.

## How to contribute

You must fork this repository, and then clone it and then make changes on your own fork. When you push, you will have your changes reflected on **your** fork only, not our repository. You must create a pull request *into* the master branch of this repository. Once you've successfully created a pull request, be sure to verify it was created on the repository.

## Requirements

- This project must have a discord bot with the following customizable features:
  - Auto role (role to be given when user joins)
  - Change Bot Prefix
  - Change MUTED role (role that when given mutes)
- This project must have the following (api) endpoints:
  - **/prefix**
  - **/roles/autorole**
  - **/roles/mutedrole**
  - **/auth**

## Explanation

### Authenticating Users

**Description:**
  <br/>
  Database Models:

- [] **1 - Create a Database Model for Users**

```js
{
  "_id": string
  "guilds": Array<Guild>
  "userId": snowflake,
  "discordTag": string
}
```

- [] **2 - Create a Database Model for Guilds**

```js
{
  "_id": string,
  "guildId": string,
  "prefix": string,
  "autoRole": snowflake,
  "mutedRole": snowflake
}
```

  **Passport Configuration:**

- [] **1** - Use the `passport.use` middleware to create a new DiscordStrategy with the required creditentials from environment variables. Urls supplied here must be part of the authentication route.

- [] **2** - Set up a callback function for initializing the Discord Strategy such that it validates whether or not the authorized user is already in the database. If they are, attempt to update the database with their current discord tag. If they are not in the database, create a new user in the database using the profile parameter passed in the callback.

- [] **3** - Create a new route for authentication and configure express to use it

  **Authentication Route (begins with /auth):**

- [] **1** - GET **/discord** - Passport should authenticate the user using this route

- [] **2** - GET **/discord/redirect** - Redirect url, should also use passport authentication. Should redirect to /dashboard.

- [] **3** - GET **/** - Should send client all information about the authorized user. If the user is not authorized, send `401 Unauthorized`



## Restrictions

- Do not create multiple pull requests. You can only have 1 opened pull request at all times.
- You can only create a pull request with code that corresponds to only ONE feature. So, you cannot code the entire project and make a PR. Doing this will disqualify you from the event immediately.
