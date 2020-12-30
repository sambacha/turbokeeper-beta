# Symphony BDK Extension

- React, to render the components
- [symphony-bdk-ui-toolkit](https://github.com/SymphonyPlatformSolutions/symphony-bdk-ui-toolkit) Symphony Component
  library, for fast development and prototyping
- [symphony-bdk-mock-client](https://github.com/SymphonyPlatformSolutions/symphony-bdk-mock-client) Mock Client, a
  Symphony mock client that has all functionality used by an extension app inside a real symphony client,
  used for offline development and zero dependency to infrastructure.

- [JSON-Server](https://www.npmjs.com/package/json-server) node server, to quickly mock api's _includes Symphony
  authentication mock_
- Initialized Jest with [Enzyme](https://airbnb.io/enzyme/) for unit testing and
  [jest-cucumber](https://www.npmjs.com/package/jest-cucumber) +
  [react-testing-library](https://testing-library.com/docs/react-testing-library/intro), for BDD testing, samples of these
  methods included

## Prerequisites

First you need to install the stable version of [NodeJs](https://nodejs.org/en/)

## Template App Structure

### Overview

The Template App is written in Javascript, using React.js for all its rendering of pages and components. This template
ships with [Redux](https://redux.js.org/) should you need it.

![Alt text](extension-app/public/assets/project_structure.png?raw=true "Template File structure")

### `app.js`, `controller.js` and Configurations

The Extension App is meant to be bootstrapped by Symphony itself, going through a series of handshakes and service
connections. This template already takes care of all that for you. This is done by the `app.js` and `controller.js`
files, that are called by the main entry points of the app: the `app.html` and `controller.html` files.
These two files should be specified as entrypoints by an admin in your POD's AC Portal. You shouldn't worry about these.

Should you want to extend Symphony's services please use the [UI service](https://developers.symphony.com/extension/docs/ui-service,
e.g, when adding custom buttons to chatrooms), the implementation should be done in the `controller.js` file.

Your App should be given an ID, Title, Navbar Title and Icon. These should be set in the
`extension-app/public/config.js` file, and will be perpetuated throughout the rest of the Application.

here's an example of how it looks like:

```jsx harmony
const APP_CONFIG = {};
Object.defineProperties(APP_CONFIG, {
  API_ROOT_URL: {
    value: `https://${window.location.host}/template`,
    writable: false,
  },
  LINK_PREFIX: {
    value: "/template/app",
    writable: false,
  },
  APP_ROOT_URL: {
    value: "/",
    writable: false,
  },
  APP_ID: {
    value: "templateapp",
    writable: false,
  },
  APP_TITLE: {
    value: "Template",
    writable: false,
  },
  APP_NAV_BAR_TITLE: {
    value: "Template",
    writable: false,
  },
  APP_ICON_NAME: {
    value: "favicon.png",
    writable: false,
  },
});

window.APP_CONFIG = APP_CONFIG;
```

### Enrichers

A common use for an Extension App is to enrich Symphony messages sent by bots, by the use of the
[entity service](https://developers.symphony.com/extension/docs/entity-service). We have set up message enrichment
via the `general-enricher.js` and `entities.js` files.
Everything related to enriching can be found under `extension-app/services/enrichers`.

Here's The architecture of Enriched Messages:

![Alt text](extension-app/public/assets/enrichment_flow.png?raw=true "Messages Enrichment")

### Authentication

To have an extension app Running on symphony, an authentication process must occour, this process is generally in the
lines of the following diagram:

![Alt text](extension-app/public/assets/authorization_flow.png?raw=true "Messages Enrichment")

After that happened, the `controller.js` tells symphony to load the `app.html` file.

## Running the app

First of all, you should install all project dependencies with the following command:

```
yarn
```

> If you don't have `yarn` installed, you can do so by running `npm install -g yarn`.

After your _node_modules_ has been either created or updated, you can run the project in different ways by running the
following commands:

- `yarn test`: runs unit tests and BDD tests. These have been set up initially with jest (powered by enzyme/react
  testing library) and cucumber.
- `yarn build`: encapsulates the whole project in a minified series of files, that are available under the _dist_ folder. This is reserved for production building.
- `yarn start:mock`: compiles project and exposes main files under port `:4000`. Additionally, it sets up your mock JSON server on port `:3000`.
  Since the template app has the Symphony Mock Client as a dependency, directly accessing port 4000
  (by going to https://localhost:4000 on your browser) will open the Mock Client shell alongside your Extension App.
  > Note: The Mock Client however does not get in the way of externalizing your files. You can still access the Extension App directly in the POD by importing it through the URL (done by adding the `?bundle=https://localhost:4000/bundle.json` query parameter after your POD's URL). You can read more on this by accessing [Symphony's official documentation](https://developers.symphony.com/symphony-developer/docs/creating-an-extension-application#section-load-your-application).
- `yarn start:dev`: compiles the project and exposes the main files under port `:4000` - similar to `yarn start:mock`, but does not copy the Symphony Mock Client code to overwrite the Frontend APIs. It also does not boot up the mock JSON server. This is used for when you would like to open the frontend application through Symphony. For such, the Application must be registered in the AC Portal, and a Backend must be running to execute Sympony's four-way authentication.
  > Important: The Frontend is designed to call authentication APIs as soon as the controller.html file is bootstrapped. The endpoint path is defined in the config.js file, and assumes `https://localhost:8080/templateapp` by default. To overwrite this value, you can run `yarn start:dev --env.backendUrl=<YOUR URL>` with your URL as a parameter.

## Acknowledgments

You can find more about Symphony Extension-Api in this link: https://extension-api.symphony.com/
