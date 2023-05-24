import type {
  TestClient,
  TestClientMode,
} from '../../clients/createTestClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'

/**
 * Enable or disable logging on the test node network.
 *
 * - Docs: https://viem.sh/docs/actions/test/setLoggingEnabled.html
 *
 * @param client - Client to use
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setLoggingEnabled } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setLoggingEnabled(client)
 */
export async function setLoggingEnabled<
  TMode extends TestClientMode,
  TChain extends Chain | undefined,
>(client: TestClient<TMode, Transport, TChain>, enabled: boolean) {
  await (client as unknown as TestClient<TestClientMode>).request({
    method: `${client.mode as TestClientMode}_setLoggingEnabled`,
    params: [enabled],
  })
}
