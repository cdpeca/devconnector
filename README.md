# Welcome to devconnector 👋

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> Social connector SPA for developers based on full MERN stack.

### 🏠 [Homepage](https://github.com/cdpeca/devconnector)

Full MERN stack using:

-   MongoDB Atlas for back-end database
-   Express for interacting with back-end server
-   React for front-end
-   Node for back-end web server
-   Redux for store and state management
-   Heroku for production hosting (if you want)

# Quick Start 🚀

### Add a .env file in root folder with the following

```
MONGO_URI="<your_mongoDB_Atlas_uri_with_credentials>"
JWT_SECRET="<your_secret_key_for_JSON_web_tokens">"
GITHUB_TOKEN="<your_secret_github_personal_access_token>"
```

### Install server dependencies

```bash
yarn install
```

### Install client dependencies

```bash
cd client
yarn install
```

### Run both Express & React from root

```bash
yarn run dev
```

### Build for production

```bash
cd client
yarn run build
```

### Test production before deploy

After running a build in the client 👆, cd into the root of the project.
And run...

`Linux/Unix`

```bash
NODE_ENV=production node server.js
```

`Windows Cmd Prompt or Powershell`

```bash
$env:NODE_ENV="production"
node server.js
```

Check in browser on [http://localhost:5000/](http://localhost:5000/)

## Deploy to Heroku

The `package.json` file a script included for automatic post-deploy builds in Heroku.

Assuming included `.env` in your `.gitignore` file (you really should do this), then pushing to Heroku will omit your `.env` config file from the push.
However, Heroku needs configuration variables for a successful build.
So how to get them to Heroku without commiting them to GitHub?

Easy. First have your code deploy to Heroku either by pushing it directly, or automatically pulling through a specified GitHub branch. Then just go into Heroku to your App, go into `Settings` and then `Config Vars`. Just like you did with the `.env` file in your root folder you will need to create these same config variables. If you have different versions of your database and GitHub PATs for Production (you should), make sure to point them there.

```
MONGO_URI="<your_mongoDB_Atlas_uri_with_credentials>"
JWT_SECRET="<your_secret_key_for_JSON_web_tokens">"
GITHUB_TOKEN="<your_secret_github_personal_access_token>"
```

Now Heroku will have the config it needs to build the project.

> **Don't forget to make sure your production database is not whitelisted in MongoDB Atlas, otherwise the database connection will fail and your app will crash.**

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/cdpeca/devconnector/issues).

---

## ⭐️ Show your support

Give a ⭐️ if this project helped you!

---

## App Info

### Author

Chris Peca

### Version

1.0.0

### License

This project is licensed under the MIT License
