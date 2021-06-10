# hello-world-service

This repository is used as template for backend service development.

## Start working

1. Use [VS Code](https://code.visualstudio.com/), no other options.

2. Use this VS Code extensions :

    - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

3. Install dependencies :

```
npm install
```

3. Copy locally `.env.sample` and rename it as `.env` and replace dummy values by real one :

```
DEV=true
SECRET=SECRET
SRV_ID=SRV_ID
SERVICES_DOMAINE=https://services-dev.daesign.com
CORE_DOMAINE=https://core-services-dev.daesign.com
WELL_KNOWN=https://core-services-dev.daesign.com/licenceToken/well-known
CONF_URL=https://core-services-dev.daesign.com/config/
```

4. Run local server (debug / breakpoints compliant) by pressing `F5`

    `.env` file is used by the `.vscode/launch.json` file to start local server

## Generate documentation

Run the command and then open `index.html` in apidoc folder

```
npm run apidoc
```

## Build for production

Run command : `npm run build`

This will :

1. Delete `dist` folder
2. Run `tsc` with `tsconfig.prod.json` ( tslint and sourceMap disabled )
3. Copy templates into `dist` folder

## Test production build locally

Run command : `node dist/index.js`

## Run tests on production build

Run command : `node dist/index.js`
Open another terminal and run : `npm run test`

## Docker

This service is "docker ready" for future deployment.

`Dockerfile` : File description to build Docker image for this service
`docker-compose.yml` : File configuration to start service

## Github Actions

`.github/docker.yml` : Build docker image, run container, run tests and upload report on release published
`.github/documentation.yml` : Build api documentation and upload generated files on release publised
`.github/routine.yml` : Checkout, lint, build, test and upload report on push and pull_request

## Source Folder structure

```bash
src > root folder
│   index.ts > Node script endpoint
│   server.ts > Express server definition
├───controllers > Controllers folder (data manipulation)
│       HelloController.ts
├───dal > Model class folder (data sync)
│   │   Hello.ts
│   └───parents
│           Model.ts > Model class manipulation to inherit
│           Service.ts > Service class manipulation to inherit
├───routes > Express router server
│       ExpressRouterHello.spec.ts > Unit test
│       ExpressRouterHello.ts
└───utils
        env.ts
        logger.ts
```

## Environment variables

| Name  | Default | Description |
| --- | ---| ---|
| DEV | true | Set flag to `true` to enable console logs and stack errors display |
| SECRET | null | The secret key to connect to Mongo dev server |
| SRV_ID | null | The service ID (from services mongo collection) |
| SERVICES_DOMAINE | https://services-dev.daesign.com | Academy services uri |
| CORE_DOMAINE | https://core-services-dev.daesign.com | Academy core services uri |
| WELL_KNOWN | https://core-services-dev.daesign.com/licenceToken/well-known | License token service well know uri |
| CONF_URL | https://core-services-dev.daesign.com/config/ | Core services conf uri |