module.exports = (plugin, command, context) => {
  /**
   * The current executing botics plugin path.
   */
  let pluginPath = null

  /**
   * Set the current executing botics plugin path.
   */
  function setIgnitePluginPath (path) {
    pluginPath = path
  }

  /**
   * Gets the path to the current running botics plugin.
   */
  function ignitePluginPath () {
    return pluginPath
  }

  return {
    setIgnitePluginPath,
    ignitePluginPath
  }
}
