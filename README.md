# Code Ring Event

## Monday, August 10th 12 PM EST - Monday, August 24th 12 PM EST

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

- There are a total of 21 tasks. You are only allowed to submit *one* task ***per*** pull request. You may submit a new Pull Request once yours is closed or merged. For example, you cannot submit 1 Pull Request with both tasks 1) and 2) together.

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

  **Database Models**:

- [ ] **1** - Create a Database Model for Users

```js
{
  "_id": string
  "guilds": Array<Guild>
  "userId": snowflake,
  "discordTag": string
}
```

- [ ] **2** - Create a Database Model for Guilds

  - autoRole and mutedRole are null by default

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

- [ ] **1** - Use the `passport.use` middleware to create a new DiscordStrategy with the required creditentials from environment variables. Urls supplied here must be part of the authentication route.

- [ ] **2** - Set up a callback function for initializing the Discord Strategy such that it validates whether or not the authorized user is already in the database. If they are, attempt to update the database with their current discord tag. If they are not in the database, create a new user in the database using the profile parameter passed in the callback.

- [ ] **3** - Create a new route for authentication and configure express to use it

  **Authentication Route (begins with /auth):**

- [ ] **1** - GET **/discord** - Passport should authenticate the user using this route

- [ ] **2** - GET **/discord/redirect** - Redirect url, should also use passport authentication. Should redirect to /dashboard.

- [ ] **3** - GET **/** - Should send client all information about the authorized user. If the user is not authorized, send `401 Unauthorized`

### Routes

**Prefix Route:**

- [ ] **1** - GET **/** - Should send JSON of mutual guildIds to their prefixes

```js
{
  "mutualguildId1": "!",
  "mutualguildId2": "?"
}
```

- [ ] **2** - GET **/:guildId** - Should send JSON of guildId parameter to its prefix if the guild exists. If the guild is not found mutually send 404.

- [ ] **3** - PUT **/:guildId** - Should update the guild associated with the id with the new prefix specified in the body. If the guild is not found mutually send 404.

```js
{
  "body": {
    "prefix": "!"
  }
}
```

**Autorole Route(begins with /roles/autorole):**

- [ ] **1** - GET **/:guildId** - Should send the current autorole for the associated guild if it exists. If the guild is not found mutually, send 404. If the guild does not have an autorole, send 404 Guild Autorole Not Found

- [ ] **2** - POST **/:guildId** - Should update the guild's auto role with the roleId specified in the body. If guild is not found mutually, send 404. If role does not exist, send 404.

**Muted role Route(begins with /roles/mutedrole):**

- [ ] **1** - GET **/:guildId** - Should send the current muted role for the associated guild if it exists. If the guild is not found mutually, send 404. If the guild does not have an mured role, send 404 Guild Muted Role Not Found

- [ ] **2** - POST **/:guildId** - Should update the guild's muted role with the roleId specified in the body. If guild is not found mutually, send 404. If role does not exist, send 404.

### React Dashboard

- [ ] **1** - Create simple login page for users who have yet to be authenticated.

  - Should be on / route

  - Mechanism for redirect to auth can be any valid form component

  - Must redirect to discord auth page by sending a request to the auth/discord route

- [ ] **2** - /dashboard

  - Must include some way of displaying mutual guilds that the client user has "Manage Server" permissions for

  - Navigation to guild config menus via react router

- [ ] **3** - /dashboard/:guildId - Simple interface to navigate to prefix customization page, muted role customization page, and autorole customization page

  - should use react router

- [ ] **4** - /dashboard/:guildId/prefix

  - Input Box for inputting a chosen prefix

  - Submit Button to make PUT request to /prefix/:guildId with request body including submitted prefix

- [ ] **5** - /dashboard/:guildId/autorole

  - Before component mounts, the client should determine whether or not an autorole is set and store it in some value

  - Dropdown menu which contains all of the roles in the guild

  - Submit Button to send either a POST or PUT request(depending on the value mentioned) with the chosen role's id as the request body

- [ ] **6** - /dashboard/:guildId/mutedrole

  - Before component mounts, the client should determine whether or not a muted role is set and store it in some value

  - Dropdown menu which contains all of the roles in the guild

  - Submit Button to send either a POST or PUT request(depending on the value mentioned) with the chosen role's id as the request body

## Restrictions

- Do not create multiple pull requests. You can only have 1 opened pull request at all times.
- You can only create a pull request with code that corresponds to only ONE feature. So, you cannot code the entire project and make a PR. Doing this will disqualify you from the event immediately.
