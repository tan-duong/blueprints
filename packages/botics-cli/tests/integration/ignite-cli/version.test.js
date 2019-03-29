const { system } = require('gluegun')
const jetpack = require('fs-jetpack')
const { trim } = require('ramda')

const IGNITE = './bin/botics'
const VERSION = jetpack.read('./package.json', 'json').version

test('botics -v', async () => {
  const result = await system.spawn(`${IGNITE} -v`)
  expect(trim(result.stdout.toString())).toBe(VERSION)
})

test('botics --v', async () => {
  const result = await system.spawn(`${IGNITE} --v`)
  expect(trim(result.stdout.toString())).toBe(VERSION)
})

test('botics -version', async () => {
  const result = await system.spawn(`${IGNITE} -version`)
  expect(trim(result.stdout.toString())).toBe(VERSION)
})

test('botics --version', async () => {
  const result = await system.spawn(`${IGNITE} --version`)
  expect(trim(result.stdout.toString())).toBe(VERSION)
})

test('botics version', async () => {
  const result = await system.spawn(`${IGNITE} version`)
  expect(trim(result.stdout.toString())).toBe(VERSION)
})
