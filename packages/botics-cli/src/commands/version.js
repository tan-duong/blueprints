// @cliDescription  Prints current version of installed botics
// @cliAlias v
// ----------------------------------------------------------------------------

const pjson = require('../../package.json')

module.exports = async function (context) {
  context.print.info(pjson.version)
}
