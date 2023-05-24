import type {
  TestClient,
  TestClientMode,
} from '../../clients/createTestClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'

/**
 * Snapshot the state of the blockchain at the current block.
 *
 * - Docs: https://viem.sh/docs/actions/test/snapshot.html
 *
 * @param client - Client to use
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { snapshot } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await snapshot(client)
 */
export async function snapshot<
  TMode extends TestClientMode,
  TChain extends Chain | undefined,
>(client: TestClient<TMode, Transport, TChain>) {
  return await (client as unknown as TestClient<TestClientMode>).request({
    method: 'evm_snapshot',
  })
}
