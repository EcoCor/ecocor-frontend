# EcoCor Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com)

### Getting started

To start working on *ecocor-frontend* or to just check it out run the following
commands:

```sh
git clone git@github.com:dh-network/ecocor-frontend.git
cd ecocor-frontend
yarn start
```

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn lint`

Run `eslint ./src`.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn version`

Changes the version number in `package.json`, commits the changes, creates a tag
and pushes the commit and the tag to the `origin` remote. To make sure only
correct code is being tagged, a `preversion` script also runs `yarn test` and
`yarn build` before  actually bumping the version.

By default you will be asked to enter a new version number. With the commands
`yarn version --patch`, `yarn version --minor`, or `yarn version --major` the
respective part of the version number is incremented automatically. (See the
[yarn documentation](https://classic.yarnpkg.com/en/docs/cli/version/) for
details.)
