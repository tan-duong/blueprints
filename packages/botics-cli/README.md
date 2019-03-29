# Botics CLI

### Why Botics CLI?

* **Easily spin up a new React Native app** with best practices built-in
* **No runtime!** This is a developer tool only, not a library you have to depend on and figure out how to upgrade
* **An ever-expanding list of [boilerplates](./BOILERPLATES.md) and [plugins](./PLUGINS.md)** to jump-start your app
* **Battle tested** and used every day by the developers at Infinite Red and thousands of developers around the world
* **Works on macOS, Windows, and Linux** because not all React Native developers are on one platform
* **Saves an average of two weeks** on your React Native development


## :arrow_down: Install

First, make sure you're set up for [React Native](https://facebook.github.io/react-native/docs/getting-started.html#content)

then...

Make sure you have a reasonably recent version of Node (7.6+ minimum). You can check your version of node by running

```
node -v
```

then...

Install [Yarn](https://yarnpkg.com/lang/en/docs/install/) for your system.

finally...

```
$ yarn global add botics-cli
$ botics new MyNewAppName
```

## Quick Example

Infinite Red provides two primary boilerplates; they are:

* **Andross** - the tried and true (React Navigation, Redux, & Redux Saga)
* **Bowser** - the latest and greatest (React Navigation, MobX State Tree, & TypeScript)

### Use Ignite Bowser: [Infinite Red Bowser boilerplate](https://github.com/infinitered/ignite-bowser)

```
$ yarn global add botics-cli
$ botics new PizzaApp
  ( Choose `Bowser` when prompted )
$ cd PizzaApp
$ botics generate screen pizza-location-list
  ( Choose `example` domain when prompted. This determines where your new screen will go in the directory structure. )
$ botics generate component pizza-location
  ( Choose `example` domain when prompted. This determines where your new screen will go in the directory structure. )
$ botics --help
```

### Use Ignite Andross [Infinite Red Andross boilerplate](https://github.com/infinitered/ignite-andross)

```
$ yarn global add botics-cli
$ botics new PizzaApp
  ( Choose Andross when prompted )
$ cd PizzaApp
$ botics add maps
$ botics add vector-icons
$ botics generate screen PizzaLocationList
$ botics generate component PizzaLocation
$ botics generate map StoreLocator
$ botics add i18n
$ botics remove i18n
$ botics --help
```


## :clipboard: Documentation :clipboard:

* Want to dive into the Ignite CLI documentation? [Go here](./docs/README.md)
* Looking for React Native's documentation? [Go here](http://facebook.github.io/react-native/docs/getting-started.html).


## :electric_plug: Plugins :electric_plug:

Check out the list of [Plugins](./PLUGINS.md).


## :plate_with_cutlery: Boilerplates :plate_with_cutlery:

Check out the list of [Boilerplates](./BOILERPLATES.md).
```
$ botics new MyNewAppName -b ir-boilerplate
```

