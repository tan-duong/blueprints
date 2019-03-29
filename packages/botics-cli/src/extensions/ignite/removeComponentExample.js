module.exports = (plugin, command, context) => {
  /**
   * Removes the component example.
   */
  // DEPRECATED as of 3/2/17 as part of Ignite CLI Beta (https://github.com/infinitered/ignite/issues/636)
  function removeComponentExample (fileName) {
    const { print, ignite } = context
      print.warning('DEPRECATION_WARNING: Heads up! `botics.removeComponentExample` is deprecated. Please use `botics.removePluginComponentExample` instead.')
    ignite.removePluginComponentExample(fileName)
  }

  return removeComponentExample
}
