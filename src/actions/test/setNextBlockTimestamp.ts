import type {
  TestClient,
  TestClientMode,
} from '../../clients/createTestClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import { numberToHex } from '../../utils/encoding/toHex.js'

export type SetNextBlockTimestampParameters = {
  /** The timestamp (in seconds). */
  timestamp: bigint
}

/**
 * Sets the next block's timestamp.
 *
 * - Docs: https://viem.sh/docs/actions/test/setNextBlockTimestamp.html
 *
 * @param client - Client to use
 * @param parameters – {@link SetNextBlockTimestampParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setNextBlockTimestamp } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setNextBlockTimestamp(client, { timestamp: 1671744314n })
 */
export async function setNextBlockTimestamp<
  TMode extends TestClientMode,
  TChain extends Chain | undefined,
>(
  client: TestClient<TMode, Transport, TChain>,
  { timestamp }: SetNextBlockTimestampParameters,
) {
  await (client as unknown as TestClient<TestClientMode>).request({
    method: 'evm_setNextBlockTimestamp',
    params: [numberToHex(timestamp)],
  })
}
