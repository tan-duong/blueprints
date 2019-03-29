const extension = require('../../../src/extensions/ignite/findIgnitePlugins')
const path = require('path')

test('has the right interface', () => {
  expect(typeof extension).toBe('function')
  const context = { filesystem: { separator: path.sep } }
  const findIgnitePlugin = extension(null, null, context)
  expect(typeof findIgnitePlugin).toBe('function')
})

test('plugin-less', () => {
  const context = {
    filesystem: { separator: path.sep },
    runtime: {
      plugins: []
    }
  }
  const findIgnitePlugin = extension(null, null, context)
  expect(findIgnitePlugin()).toEqual([])
})

test('skips non-botics plugins', () => {
  const context = {
    filesystem: { separator: path.sep },
    runtime: {
      plugins: [{ name: 'x', directory: 'y' }]
    }
  }
  const findIgnitePlugin = extension(null, null, context)
  expect(findIgnitePlugin()).toEqual([])
})

test('finds botics- prefixed plugins', () => {
  const context = {
    filesystem: { separator: path.sep },
    runtime: {
      plugins: [{name: 'botics-foo', directory: 'y'}]
    }
  }
  const findIgnitePlugin = extension(null, null, context)
  expect(findIgnitePlugin()).toEqual([{name: 'botics-foo', directory: 'y'}])
})

test('finds project plugins', () => {
  const dir = `${process.cwd()}${path.sep}ignite${path.sep}plugins${path.sep}y`
  const context = {
    filesystem: { separator: path.sep },
    runtime: {
      plugins: [{ name: 'x', directory: dir }]
    }
  }
  const findIgnitePlugin = extension(null, null, context)
  expect(findIgnitePlugin()).toEqual([{ name: 'x', directory: dir }])
})
