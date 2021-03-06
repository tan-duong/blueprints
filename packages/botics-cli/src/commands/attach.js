// @cliDescription Attaches Ignite CLI to an existing project.

const isIgniteDirectory = require('../lib/isIgniteDirectory')

module.exports = async function (context) {
  const { filesystem, ignite, print } = context

  // ensure we're in a supported directory
  if (isIgniteDirectory(process.cwd())) {
    context.print.info('🍻  Good news! This project is already Ignite CLI-enabled!')
    return
  }

  // botics/botics.json
  const igniteJson = {
    'createdWith': ignite.version,
    'boilerplate': 'empty',
    'examples': 'none'
  }
  filesystem.write('botics/botics.json', igniteJson)

  // the plugins folder
  filesystem.write('botics/plugins/.gitkeep', '')

  context.print.info(`🔥  Good to go! Type ${print.colors.bold('botics')} to get started.`)
}
