// Ignite CLI plugin for Prototype
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'react-native-MODULENAME'
const NPM_MODULE_VERSION = '0.0.1'

// const PLUGIN_PATH = __dirname
// const APP_PATH = process.cwd()
const EXAMPLE_FILE = 'PrototypeExample.js.ejs'

const add = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context

  // install an NPM module and link it
  await ignite.addModule(NPM_MODULE_NAME, { link: true, version: NPM_MODULE_VERSION })

  await ignite.addPluginComponentExample(EXAMPLE_FILE, { title: 'Prototype Example' })

  // Example of copying templates/Prototype to App/Prototype
  // if (!filesystem.exists(`${APP_PATH}/App/Prototype`)) {
  //   filesystem.copy(`${PLUGIN_PATH}/templates/Prototype`, `${APP_PATH}/App/Prototype`)
  // }

  // Example of patching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   insert: `import '../Prototype/Prototype'\n`,
  //   before: `export default {`
  // })
}

/**
 * Remove yourself from the project.
 */
const remove = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context

  // remove the npm module and unlink it
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: true })

  await ignite.removePluginComponentExample(EXAMPLE_FILE)

  // Example of removing App/Prototype folder
  // const removePrototype = await context.prompt.confirm(
  //   'Do you want to remove App/Prototype?'
  // )
  // if (removePrototype) { filesystem.remove(`${APP_PATH}/App/Prototype`) }

  // Example of unpatching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   delete: `import '../Prototype/Prototype'\n`
  // )
}

// Required in all Ignite CLI plugins
module.exports = { add, remove }

