import { localhost } from '@wagmi/chains'
import { expectTypeOf, test } from 'vitest'

import { type TestClient, createTestClient } from './createTestClient.js'
import { http } from './transports/http.js'

test('with chain', () => {
  const client = createTestClient({
    chain: localhost,
    mode: 'anvil',
    transport: http(),
  })
  expectTypeOf(client).toMatchTypeOf<TestClient<'anvil'>>()
  expectTypeOf(client.mode).toEqualTypeOf<'anvil'>()
  expectTypeOf(client.chain).toEqualTypeOf(localhost)
})

test('without chain', () => {
  const client = createTestClient({
    mode: 'anvil',
    transport: http(),
  })
  expectTypeOf(client).toMatchTypeOf<TestClient<'anvil'>>()
  expectTypeOf(client.chain).toEqualTypeOf(undefined)
})
