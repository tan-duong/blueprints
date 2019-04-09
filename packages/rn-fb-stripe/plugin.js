// Ignite CLI plugin for Prototype
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = "tipsi-stripe"
const NPM_MODULE_VERSION = "7.4.0"

const PLUGIN_PATH = __dirname
const APP_PATH = process.cwd()

const add = async function(context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context

  //patching podfile
  ignite.patchInFile(`${APP_PATH}/ios/Podfile`, {
    insert: `pod 'Stripe', '~> 14.0.0'`,
    before: `end`
  })

  // install an NPM module and link it
  await ignite.addModule(NPM_MODULE_NAME, {
    link: true,
    version: NPM_MODULE_VERSION
  })

  //patching App.js
  ignite.patchInFile(`${APP_PATH}/App.js`, {
    insert: `
import stripe from 'tipsi-stripe';
stripe.setOptions({
    publishableKey: '<YOUR STRIPE publishableKey>',
    merchantId: '', // Optional
    androidPayMode: 'test' // Android only
});`,
    before: `end`
  })


}

/**
 * Remove yourself from the project.
 */
const remove = async function(context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  const { ignite, filesystem } = context

  // remove the npm module and unlink it
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: true })

  // unpatching podfile
  ignite.patchInFile(`${APP_PATH}/ios/Podfile`, {
    delete: `pod 'Stripe', '~> 14.0.0'`
  )

  // unpatching app.js
  ignite.patchInFile(`${APP_PATH}/ios/Podfile`, {
    delete: `import stripe from 'tipsi-stripe';
stripe.setOptions({
    publishableKey: '<YOUR STRIPE publishableKey>',
    merchantId: '', // Optional
    androidPayMode: 'test' // Android only
});`
  )

}

// Required in all Ignite CLI plugins
module.exports = { add, remove }
