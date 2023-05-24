import type {
  TestClient,
  TestClientMode,
} from '../../clients/createTestClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import { numberToHex } from '../../utils/encoding/toHex.js'

export type SetMinGasPriceParameters = {
  /** The gas price. */
  gasPrice: bigint
}

/**
 * Change the minimum gas price accepted by the network (in wei).
 *
 * - Docs: https://viem.sh/docs/actions/test/setMinGasPrice.html
 *
 * Note: `setMinGasPrice` can only be used on clients that do not have EIP-1559 enabled.
 *
 * @param client - Client to use
 * @param parameters – {@link SetBlockGasLimitParameters}
 *
 * @example
 * import { createTestClient, http, parseGwei } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setMinGasPrice } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setMinGasPrice(client, {
 *   gasPrice: parseGwei('20'),
 * })
 */
export async function setMinGasPrice<
  TMode extends TestClientMode,
  TChain extends Chain | undefined,
>(
  client: TestClient<TMode, Transport, TChain>,
  { gasPrice }: SetMinGasPriceParameters,
) {
  await (client as unknown as TestClient<TestClientMode>).request({
    method: `${client.mode as TestClientMode}_setMinGasPrice`,
    params: [numberToHex(gasPrice)],
  })
}
