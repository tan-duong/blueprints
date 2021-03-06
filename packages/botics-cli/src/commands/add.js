// @cliDescription Adds an Ignite plugin.
// @cliAlias a
// ----------------------------------------------------------------------------

const R = require('ramda')
const detectedChanges = require('../lib/detectedChanges')
const detectInstall = require('../lib/detectInstall')
const importPlugin = require('../lib/importPlugin')
const isIgniteDirectory = require('../lib/isIgniteDirectory')
const findPluginFile = require('../lib/findPluginFile')
const exitCodes = require('../lib/exitCodes')

/**
 * Removes the botics plugin.
 *
 * @param {string} moduleName The name of the botics-* plugin.
 * @param {Object} context The gluegun context.
 */
const removeIgnitePlugin = async (moduleName, context) => {
  const { print, system, ignite } = context

  print.warning('Rolling back...run with --debug to see more info')

  if (ignite.useYarn) {
    system.run(`yarn remove ${moduleName} --dev`)
  } else {
    system.run(`npm rm ${moduleName} --save-dev`)
  }
}

module.exports = async function (context) {
  // grab a fist-full of features...
  const { print, filesystem, prompt, ignite, parameters, strings } = context
  const { log } = ignite

  const perfStart = (new Date()).getTime()

  log('running add command')
  const config = ignite.loadIgniteConfig()
  const currentGenerators = config.generators || {}

  // ensure we're in a supported directory
  if (!isIgniteDirectory(process.cwd())) {
    context.print.error('The `botics add` command must be run in an botics-compatible directory.\nUse `botics attach` to make compatible.')
    process.exit(exitCodes.NOT_IGNITE_PROJECT)
  }

  // the thing we're trying to install
  if (strings.isBlank(parameters.second)) {
    const instructions = `An botics plugin is required.

Examples:
  botics add i18n
  botics add vector-icons
  botics add maps
  botics add gantman/ignite-react-native-config
  botics add /path/to/plugin/you/are/building`
    print.info(instructions)
    process.exit(exitCodes.OK)
  }

  // find out the type of install
  const specs = detectInstall(context)
  const { moduleName } = specs
  const modulePath = `${process.cwd()}/node_modules/${moduleName}`

  log(`installing ${modulePath} from source ${specs.type}`)

  // import the botics plugin node module
  // const spinner = spin(`adding ${print.colors.cyan(moduleName)}`)
  const spinner = print.spin('')

  const exitCode = await importPlugin(context, specs)
  if (exitCode) {
    spinner.stop()
    process.exit(exitCode)
  }

  // optionally load some configuration from the botics.json from the plugin.
  const ignitePluginConfigPath = `${modulePath}/blueprint.json`
  const newConfig = filesystem.exists(ignitePluginConfigPath)
    ? filesystem.read(ignitePluginConfigPath, 'json')
    : {}

  const proposedGenerators = R.reduce((acc, k) => {
    acc[k] = moduleName
    return acc
  }, {}, newConfig.generators || [])

  // we compare the generator config changes against ours
  const changes = detectedChanges(currentGenerators, proposedGenerators)
  if (changes.length > 0) {
    spinner.stop()
      // we warn the user on changes
    print.warning(`🔥  The following generators would be changed: ${R.join(', ', changes)}`)
    const ok = await prompt.confirm('You ok with that?')
      // if they refuse, then npm/yarn uninstall
    if (!ok) {
      await removeIgnitePlugin(moduleName, context)
      process.exit(exitCodes.OK)
    }
    spinner.text = `adding ${print.colors.cyan(moduleName)}`
    spinner.start()
  }

  try {
    let pluginFile = findPluginFile(context, modulePath)
    if (pluginFile) {
      // bring the botics plugin to life
      log(`requiring botics plugin from ${modulePath}`)
      const pluginModule = require(pluginFile)

      if (!pluginModule.hasOwnProperty('add') || !pluginModule.hasOwnProperty('remove')) {
        spinner.fail(`'add' or 'remove' method missing.`)
        process.exit(exitCodes.PLUGIN_INVALID)
      }

      // set the path to the current running botics plugin
      ignite.setIgnitePluginPath(modulePath)

      // now let's try to run it
      try {
        // save new botics config if something changed
        if (proposedGenerators !== {}) {
          const combinedGenerators = Object.assign({}, currentGenerators, proposedGenerators)
          const updatedConfig = R.assoc('generators', combinedGenerators, ignite.loadIgniteConfig())
          ignite.saveIgniteConfig(updatedConfig)
        }

        spinner.stop()
        log(`running add() on botics plugin`)
        await pluginModule.add(context)

        const perfDuration = parseInt(((new Date()).getTime() - perfStart) / 10) / 100

        spinner.text = `added ${print.colors.cyan(moduleName)} in ${perfDuration}s`
        spinner.start()
        spinner.succeed()

        // Sweet! We did it!
        return exitCodes.OK
      } catch (err) {
        // it's up to the throwers of this error to ensure the error message is human friendly.
        // to do this, we need to ensure all our core features like `addModule`, `addPluginComponentExample`, etc
        // all play along nicely.
        spinner.fail(err.message)
        process.exit(exitCodes.PLUGIN_INSTALL)
      }
    } else {
      spinner.fail(`${modulePath}/plugin.js does not exist.  skipping.`)
      spinner.stop()
    }
  } catch (err) {
    // we couldn't require the plugin, it probably has some nasty js!
    spinner.fail('problem loading the plugin JS')
    await removeIgnitePlugin(moduleName, context)
    log(err)
    process.exit(exitCodes.PLUGIN_INVALID)
  }
}
