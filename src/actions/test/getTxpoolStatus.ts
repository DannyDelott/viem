import type {
  TestClient,
  TestClientMode,
} from '../../clients/createTestClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import { hexToNumber } from '../../utils/encoding/fromHex.js'

export type GetTxpoolStatusReturnType = {
  pending: number
  queued: number
}

/**
 * Returns a summary of all the transactions currently pending for inclusion in the next block(s), as well as the ones that are being scheduled for future execution only.
 *
 * - Docs: https://viem.sh/docs/actions/test/getTxpoolStatus.html
 *
 * @param client - Client to use
 * @returns Transaction pool status. {@link GetTxpoolStatusReturnType}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { getTxpoolStatus } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * const status = await getTxpoolStatus(client)
 */
export async function getTxpoolStatus<
  TMode extends TestClientMode,
  TChain extends Chain | undefined,
>(
  client: TestClient<TMode, Transport, TChain>,
): Promise<GetTxpoolStatusReturnType> {
  const { pending, queued } = await (
    client as unknown as TestClient<TestClientMode>
  ).request({
    method: 'txpool_status',
  })
  return {
    pending: hexToNumber(pending),
    queued: hexToNumber(queued),
  }
}
