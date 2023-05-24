import type {
  PublicRpcMethods,
  RpcRequestFn,
  TestRpcMethods,
  WalletRpcMethods,
} from './eip1193.js'
import type { Hash, Hex } from './misc.js'
import type { Quantity, RpcLog, RpcTransaction } from './rpc.js'
import type { Address } from 'abitype'
import { expectTypeOf, test } from 'vitest'

test('default', async () => {
  type Default = RpcRequestFn

  const request: Default = null as any

  const x = await request({ method: 'eth_wagmi' })
  expectTypeOf<typeof x>().toEqualTypeOf<unknown>()

  request({ method: 'eth_wagmi', params: undefined })
  request({ method: 'eth_wagmi', params: [] })
  request({ method: 'eth_wagmi', params: [{ foo: 'bar' }] })

  expectTypeOf<Parameters<Default>[0]>().toEqualTypeOf<{
    method: string
    params: unknown
  }>()
  expectTypeOf<ReturnType<Default>>().toEqualTypeOf<Promise<unknown>>()
})

test('public methods', async () => {
  type Public = RpcRequestFn<PublicRpcMethods, { Strict: false }>

  const request: Public = null as any

  const x1 = await request({ method: 'eth_blockNumber' })
  expectTypeOf<typeof x1>().toEqualTypeOf<Quantity>()

  const x2 = await request({
    method: 'eth_newFilter',
    params: [{ address: '0x', fromBlock: '0x', toBlock: '0x', topics: ['0x'] }],
  })
  expectTypeOf<typeof x2>().toEqualTypeOf<Quantity>()

  const x3 = await request({
    method: 'eth_getLogs',
    params: [{ address: '0x', fromBlock: '0x', toBlock: '0x', topics: ['0x'] }],
  })
  expectTypeOf<typeof x3>().toEqualTypeOf<RpcLog[]>()

  // @ts-expect-error
  request({ method: 'eth_newFilter' })
  request({ method: 'eth_wagmi' })
  request({ method: 'eth_wagmi', params: undefined })
  request({ method: 'eth_wagmi', params: [] })
  request({ method: 'eth_wagmi', params: [{ foo: 'bar' }] })

  expectTypeOf<Parameters<Public>[0]['method']>().toEqualTypeOf<
    PublicRpcMethods[number]['Method'] | (string & {})
  >()
})

test('public methods (strict)', async () => {
  type PublicStrict = RpcRequestFn<PublicRpcMethods>

  const request: PublicStrict = null as any

  const x1 = await request({ method: 'eth_blockNumber' })
  expectTypeOf<typeof x1>().toEqualTypeOf<Quantity>()

  const x2 = await request({
    method: 'eth_newFilter',
    params: [{ address: '0x', fromBlock: '0x', toBlock: '0x', topics: ['0x'] }],
  })
  expectTypeOf<typeof x2>().toEqualTypeOf<Quantity>()

  const x3 = await request({
    method: 'eth_getLogs',
    params: [{ address: '0x', fromBlock: '0x', toBlock: '0x', topics: ['0x'] }],
  })
  expectTypeOf<typeof x3>().toEqualTypeOf<RpcLog[]>()

  // @ts-expect-error
  request({ method: 'eth_newFilter' })
  // @ts-expect-error
  request({ method: 'eth_wagmi' })

  expectTypeOf<Parameters<PublicStrict>[0]['method']>().toEqualTypeOf<
    PublicRpcMethods[number]['Method']
  >()
})

test('wallet methods', async () => {
  type Wallet = RpcRequestFn<WalletRpcMethods, { Strict: false }>

  const request: Wallet = null as any

  const x1 = await request({ method: 'eth_accounts' })
  expectTypeOf<typeof x1>().toEqualTypeOf<Address[]>()

  const x2 = await request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: '0x',
      },
    ],
  })
  expectTypeOf<typeof x2>().toEqualTypeOf<Hash>()

  const x3 = await request({
    method: 'personal_sign',
    params: ['0x', '0x'],
  })
  expectTypeOf<typeof x3>().toEqualTypeOf<Hex>()

  // @ts-expect-error
  request({ method: 'eth_sendTransaction' })
  request({ method: 'eth_wagmi' })
  request({ method: 'eth_wagmi', params: undefined })
  request({ method: 'eth_wagmi', params: [] })
  request({ method: 'eth_wagmi', params: [{ foo: 'bar' }] })

  expectTypeOf<Parameters<Wallet>[0]['method']>().toEqualTypeOf<
    WalletRpcMethods[number]['Method'] | (string & {})
  >()
})

test('wallet methods (strict)', async () => {
  type Wallet = RpcRequestFn<WalletRpcMethods>

  const request: Wallet = null as any

  const x1 = await request({ method: 'eth_accounts' })
  expectTypeOf<typeof x1>().toEqualTypeOf<Address[]>()

  const x2 = await request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: '0x',
      },
    ],
  })
  expectTypeOf<typeof x2>().toEqualTypeOf<Hash>()

  const x3 = await request({
    method: 'personal_sign',
    params: ['0x', '0x'],
  })
  expectTypeOf<typeof x3>().toEqualTypeOf<Hex>()

  // @ts-expect-error
  request({ method: 'eth_sendTransaction' })
  // @ts-expect-error
  request({ method: 'eth_wagmi' })

  expectTypeOf<Parameters<Wallet>[0]['method']>().toEqualTypeOf<
    WalletRpcMethods[number]['Method']
  >()
})

test('test methods', async () => {
  type Test = RpcRequestFn<TestRpcMethods<'anvil'>, { Strict: false }>

  const request: Test = null as any

  const x1 = await request({
    method: 'anvil_addCompilationResult',
    params: [1],
  })
  expectTypeOf<typeof x1>().toEqualTypeOf<any>()

  const x2 = await request({
    method: 'anvil_enableTraces',
  })
  expectTypeOf<typeof x2>().toEqualTypeOf<void>()

  const x3 = await request({
    method: 'txpool_content',
  })
  expectTypeOf<typeof x3>().toEqualTypeOf<{
    pending: Record<`0x${string}`, Record<string, RpcTransaction>>
    queued: Record<`0x${string}`, Record<string, RpcTransaction>>
  }>()

  // @ts-expect-error
  request({ method: 'anvil_addCompilationResult' })
  request({ method: 'eth_wagmi' })
  request({ method: 'eth_wagmi', params: undefined })
  request({ method: 'eth_wagmi', params: [] })
  request({ method: 'eth_wagmi', params: [{ foo: 'bar' }] })

  expectTypeOf<Parameters<Test>[0]['method']>().toEqualTypeOf<
    TestRpcMethods<'anvil'>[number]['Method'] | (string & {})
  >()
})

test('test methods (strict)', async () => {
  type Test = RpcRequestFn<TestRpcMethods<'anvil'>>

  const request: Test = null as any

  const x1 = await request({
    method: 'anvil_addCompilationResult',
    params: [1],
  })
  expectTypeOf<typeof x1>().toEqualTypeOf<any>()

  const x2 = await request({
    method: 'anvil_enableTraces',
  })
  expectTypeOf<typeof x2>().toEqualTypeOf<void>()

  const x3 = await request({
    method: 'txpool_content',
  })
  expectTypeOf<typeof x3>().toEqualTypeOf<{
    pending: Record<`0x${string}`, Record<string, RpcTransaction>>
    queued: Record<`0x${string}`, Record<string, RpcTransaction>>
  }>()

  // @ts-expect-error
  request({ method: 'anvil_addCompilationResult' })
  // @ts-expect-error
  request({ method: 'eth_wagmi' })

  expectTypeOf<Parameters<Test>[0]['method']>().toEqualTypeOf<
    TestRpcMethods<'anvil'>[number]['Method']
  >()
})

test('custom methods', async () => {
  type Custom = RpcRequestFn<
    [
      { Method: 'eth_wagmi'; Parameters: [number]; ReturnType: string },
      { Method: 'eth_viem'; Parameters?: never; ReturnType: number },
    ],
    { Strict: false }
  >

  const request: Custom = null as any

  const x = await request({ method: 'eth_wagmi', params: [1] })
  expectTypeOf<typeof x>().toEqualTypeOf<string>()

  // @ts-expect-error
  request({ method: 'eth_wagmi' })
  request({ method: 'eth_viem' })
  request({ method: 'eth_lol' })

  expectTypeOf<Parameters<Custom>[0]['method']>().toEqualTypeOf<
    (string & {}) | 'eth_wagmi'
  >()
})

test('custom methods (strict)', async () => {
  type Custom = RpcRequestFn<
    [
      { Method: 'eth_wagmi'; Parameters: [number]; ReturnType: string },
      { Method: 'eth_viem'; Parameters?: never; ReturnType: number },
    ]
  >

  const request: Custom = null as any

  const x = await request({ method: 'eth_wagmi', params: [1] })
  expectTypeOf<typeof x>().toEqualTypeOf<string>()

  // @ts-expect-error
  request({ method: 'eth_wagmi' })
  // @ts-expect-error
  request({ method: 'eth_lol' })

  expectTypeOf<Parameters<Custom>[0]['method']>().toEqualTypeOf<
    'eth_wagmi' | 'eth_viem'
  >()
})
