import type {
  TestClient,
  TestClientMode,
} from '../../clients/createTestClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import { numberToHex } from '../../utils/encoding/toHex.js'

export type SetBlockGasLimitParameters = {
  /** Gas limit (in wei). */
  gasLimit: bigint
}

/**
 * Sets the block's gas limit.
 *
 * - Docs: https://viem.sh/docs/actions/test/setBlockGasLimit.html
 *
 * @param client - Client to use
 * @param parameters – {@link SetBlockGasLimitParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setBlockGasLimit } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setBlockGasLimit(client, { gasLimit: 420_000n })
 */
export async function setBlockGasLimit<
  TMode extends TestClientMode,
  TChain extends Chain | undefined,
>(
  client: TestClient<TMode, Transport, TChain>,
  { gasLimit }: SetBlockGasLimitParameters,
) {
  await (client as unknown as TestClient<TestClientMode>).request({
    method: 'evm_setBlockGasLimit',
    params: [numberToHex(gasLimit)],
  })
}
