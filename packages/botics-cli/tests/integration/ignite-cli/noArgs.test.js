const { system } = require('gluegun')

const IGNITE = './bin/botics'

test('with no arguments', async () => {
  const result = await system.spawn(`${IGNITE}`)
  expect(result.status).toBe(0)
})
