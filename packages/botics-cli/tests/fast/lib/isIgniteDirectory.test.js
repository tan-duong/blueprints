const isIgniteDirectory = require('../../../src/lib/isIgniteDirectory')

test('bad inputs', () => {
  expect(isIgniteDirectory()).toBe(false)
  expect(isIgniteDirectory(null)).toBe(false)
  expect(isIgniteDirectory(1)).toBe(false)
  expect(isIgniteDirectory([])).toBe(false)
  expect(isIgniteDirectory({})).toBe(false)
  expect(isIgniteDirectory(true)).toBe(false)
})

test('missing directory', () => {
  expect(isIgniteDirectory('omgnothing')).toBe(false)
})

// test('invalid folder structure', () => {
//   mockFs({
//     'missingfile': { 'botics': {} },
//     'blank': { 'botics': { 'botics.json': '' } },
//     'string': { 'botics': { 'botics.json': 'x' } },
//     'empty': { 'botics': { 'botics.json': '' } },
//     'array': { 'botics': { 'botics.json': [] } },
//     'number': { 'botics': { 'botics.json': 4 } }
//   })
//   expect(isIgniteDirectory('missingfile')).toBe(false)
//   expect(isIgniteDirectory('blank')).toBe(false)
//   expect(isIgniteDirectory('string')).toBe(false)
//   expect(isIgniteDirectory('empty')).toBe(false)
//   expect(isIgniteDirectory('array')).toBe(false)
//   expect(isIgniteDirectory('number')).toBe(false)
// })
