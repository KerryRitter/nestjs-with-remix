# NestJS with Remix

This repo is a demo of getting Remix to be served via NestJS. In the future, I will package up the code and publish it as an NPM module after I've worked out the kinks.

## Basic installation

1. Create a new NestJS app using `nest new`.
2. Install `@remix-run/` packages: `npm i --save @remix-run/{express,node,react,serve}; npm i --save-dev @remix-run/{dev,eslint-config}`
3. Install `concurrently` so we can run `remix watch` and `nest build --watch` at the same time: `npm i --save-dev concurrently`.
4. Add the required Remix files from this repo: `remix.config.js`, `remix.env.d.ts`, `tsconfig.base.json`.
5. Add the `app` directory from this repo.
6. Add the `src/remix` directory from this repo.
7. Update your `AppModule` to use `@RemixModule()` instead of `@Module()` and provide the required RemixConfig.
8. Update the package.json `start:dev` script to match the one in this repo. This now will start the Remix and Nest builds.
9. Relish in the glory of Remix and NestJS.

## How to get NestJS services in Remix Loader functions

Use the `RemixController['getLoadContext']` function to pass services and data to Remix loaders via the `LoaderArgs['context']` property.

### Notable issue

Ideally, we can pass the whole NestJS IoC container and let loaders pluck services out from that (or do something even more clever). However, in trying to pass the singleton `ModuleRef` from NestJS ended up with a ton of Remix build errors due to missing packages (packages that are optionally required, but with how Remix builds, it wants them to exist or be wrapped in a try/catch).

## Caveats

There's probably a fair bit of issues. I haven't tested this much yet. Feel free to report any issues. Truthfully, I probably will not address them but will happily merge and pull requests.

## Future todo:

1. There should only be 1-2 steps to get started with this, not 8-9. I plan to make this a Remix template.
2. Provide a way to get NestJS providers to Remix loaders. Alternatively, leverage NestJS to BE the loader function for a Remix view.
3. Merge the NestJS and Remix builds into one process instead of using `concurrently`. This will remove unnecessary dependencies and hopefully make a more stable and friendly developer experience.
4. Get hot module reloading for Remix changes through NestJS's dev server.

## Additional

Thanks to [AndrewsRodH](https://github.com/AndresRodH/remix-nestjs) for the starting point.

[Email](mailto:ritter@kerryritter.com). [Twitter](https://www.twitter.com/kerryritter). Discord [Kerry Ritter#6134].
