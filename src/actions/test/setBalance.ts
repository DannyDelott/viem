import type { Address } from 'abitype'

import type {
  TestClient,
  TestClientMode,
} from '../../clients/createTestClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import { numberToHex } from '../../utils/encoding/toHex.js'

export type SetBalanceParameters = {
  /** The account address. */
  address: Address
  /** Amount (in wei) to set */
  value: bigint
}

/**
 * Modifies the balance of an account.
 *
 * - Docs: https://viem.sh/docs/actions/test/setBalance.html
 *
 * @param client - Client to use
 * @param parameters – {@link SetBalanceParameters}
 *
 * @example
 * import { createTestClient, http, parseEther } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setBalance } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setBalance(client, {
 *   address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
 *   value: parseEther('1'),
 * })
 */
export async function setBalance<
  TMode extends TestClientMode,
  TChain extends Chain | undefined,
>(
  client: TestClient<TMode, Transport, TChain>,
  { address, value }: SetBalanceParameters,
) {
  await (client as unknown as TestClient<TestClientMode>).request({
    method: `${client.mode as TestClientMode}_setBalance`,
    params: [address, numberToHex(value)],
  })
}
