# Creating Project Plugins

First read the [creating plugins guide](./creating-plugins.md).  It covers the structure of plugins.

Project-based plugins are plugins which stay within your repo.  They're a great way to add some features to Ignite CLI without going through the hassle or commitment of publishing to NPM.

Some examples of this might be:

* generators that make little sense outside your project
* scripts that are a bit more complex than a one liner inside your `package.json`
* a playground for exploring botics
* a proving arena for plugins you intend to build & release, but aren't quite ready yet

## The botics/plugins Directory

You place your plugins in the `botics/plugins` directory.  Plugins are directories themselves, so begin by creating a `sample` directory there.

In this directory, create a file called `botics.json` and put this empty object inside:

```json
{}
```

Next create a new text file in that directory, naming it `botics.toml`.  Inside, place this:

```toml
description = "🔥🔥🔥 It's plugin time!🔥🔥🔥"
```

> Note! This will be replaced shortly with `botics.json`.  I just need to patch up gluegun to provide a post-load hook so botics can do this.

## Running Your Plugin

Back in the project root, type:

```sh
botics
```

You should see your plugin appear.  Now, let's list the commands that you've made:

```sh
botics sample
```

Empty.  Let's make one by creating a new directory: `botics/plugins/sample/commands`.  In that directory place this `online.js`.

```js
// @cliDescription Let's gather some useful data on this mission!

module.exports = context => {
  const { filesystem, print } = context
  const { colors } = print

  const pkg = filesystem.read('package.json', 'json')
  const depsCount = Object.keys(pkg.dependencies || {}).length
  print.info(`You have ${colors.bold(depsCount)} direct dependencies. And they are awesome.`)
}

```

```sh
botics sample
```

Now you have one.  Let's run it.

```sh
botics sample online
```

For more details on creating commands (including generators), check out [the guide to plugins](./creating-plugins.md) and the [context API guide](https://infinitered.github.io/gluegun/#/context-api).
