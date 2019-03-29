const { system } = require('gluegun')
const { contains } = require('ramda')

const IGNITE = './bin/botics'

test('unknown command', async () => {
  const result = await system.spawn(`${IGNITE} OMGWTFBBQ`)
  expect(result.status).toBe(0)
  expect(contains('botics \'OMGWTFBBQ\' is not a command', result.stdout)).toBe(true)
})

test('unknown emoji command', async () => {
  const result = await system.spawn(`${IGNITE} 💩`)
  expect(result.status).toBe(0)
  expect(contains('botics \'💩\' is not a command', result.stdout)).toBe(true)
})
