# Node Playground
## Overview
### Purpose
Demo application (Property API) to play around with various node technologies, with a focus on how they fit together.

### Technologies / Concepts

The following technologies / concepts have been used in this proof of concept:
- [NodeJS](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine
- [ExpressJS](https://expressjs.com/) - Minimal and flexible Node.js web application framework
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language that builds on JavaScript
- [Docker](https://docs.docker.com/) - For containerisation of services
- [Docker Compose](https://docs.docker.com/compose/) - For docker container orchestration
- [TS Node](https://www.npmjs.com/package/ts-node) - TypeScript execution engine and REPL for Node.js for JIT transformation of TS into JS
- [MongoDB](https://www.mongodb.com/) - Document-oriented NoSQL database program
- [Node Mongo DB fixtures](https://www.npmjs.com/package/node-mongodb-fixtures) Fixture loads.
- [Nodemon](https://www.npmjs.com/package/nodemon) - For auto restart of node server on file changes
- [ESLint](https://eslint.org/) - In this context this is used for linting the TypeScript
- [JestJS](https://jestjs.io/) - Unit testing / Integrated testing
- [GitHub Actions](https://github.com/features/actions) For CI
- [Git](https://git-scm.com/) Version control

## Installation

### Prerequisites
- Docker
- Docker Compose

### Installation steps
`./bin/docker/quickstart`

This command will:
- Create .env file from the .env.dist file if it doesn't already exist (create it yourself and edit if you want to change the values)
- Build your docker containers (1 for the API, 1 for MongoDB)
- Install node dependencies to the api container
- Load fixtures into Mongo DB
- Start the containers

To ensure the app is running, hit:
- `http://0.0.0.0:6868/properties` to list all properties
- `http://0.0.0.0:6868/properties?minumumProjectedValue=200000&projectedYears=4` to list all properties with a projected value over 200,000 in the next 4 years

## Useful scripts

- Run application (use this if the app is already installed) `./bin/docker/run`
- Run npm jobs inside the API container from the host `./bin/docker/npm [insert task name here] // e.g. ./bin/docker/npm install`

## Debugging
Note the following in package.json:

```
"nodemonConfig": {
    "execMap": {
        "ts": "node --require ts-node/register --inspect=0.0.0.0:9229"
    }
}
```
This means that whenever `ts` is called by `nodemon`, what will actually be run is `node --require ts-node/register --inspect=0.0.0.0:9229`

See [this issue](https://github.com/remy/nodemon/issues/1565#issuecomment-640537315) for details

N.B according to [this talk at NodeConf](https://www.youtube.com/watch?t=1387&v=1WvHT7FgrAo&feature=youtu.be) Node v18 has integrated watch mode, so no need for nodemon. So shortly `nodemon` will be switched for the command `node --watch file.js`

To configure Visual Code Studio:
- Click Debug icon
- Create a launch file
- Node JS

Add the following to the configurations array in launch.json:

```
{
      "name": "Attach",
      "port": 9229,
      "request": "attach",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "node",
      "remoteRoot": "./app",
      "localRoot": "${workspaceFolder}"
    }
```

To start your debugging session in VS code, click the "Start debugging" button (or hit F5).
