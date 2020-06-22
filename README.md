# angular-todo

First attempt at Angular. This is a full stack application with Angular frontend, and Node/Express backend with a Mongo Database.

Check the deployed application on Heroku at [ng-do.herokuapp.com](https://ng-do.herokuapp.com/).

To run the development environment on you local machine simply clone the repository and run the following commands to install dependencies and run the development environment.

```sh
-$ yarn && yarn dev
```

Notice that you'll need to run a mongo server on port 27017 (default port for mongoDB), and create a .env file at the root directory as follows.

```env
MONGO_URI=<Your MongDB server URI>
JWT_SECRET=<Any arbitrary secret>
```

If that's too much setup, you may use the docker enviroment if you have Docker, and docker-compose installed on your system.

To run the development environment:

```sh
-$ yarn docker:dev
```

To run the production environment:

```sh
-$ yarn docker:prod
```
