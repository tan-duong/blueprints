const path = require('path')

/**
 * Ensures the given string starts with 'botics-'.
 *
 * @param {string} value The string to check.
 * @returns {string} The same string, but better.
 */
const prependIgnite = function (value) {
  // If a path, ignore, it's fine
  if (value.includes(path.sep)) return value

  return /^botics-/.test(value) ? value : 'botics-' + value
}

module.exports = prependIgnite
