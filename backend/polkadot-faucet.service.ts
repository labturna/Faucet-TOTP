import { Injectable } from '@nestjs/common';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PolkadotFaucetService {
  private apis: Record<string, ApiPromise> = {};
  private faucet: any;

  async getApi(network: 'westend' | 'paseo') {
    if (this.apis[network]) return this.apis[network];
    const url = network === 'westend' ? process.env.WESTEND_RPC : process.env.PASEO_RPC;
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider });
    await api.isReady;
    this.apis[network] = api;
    return api;
  }

  async sendTokens(address: string, network: 'westend' | 'paseo') {
    const api = await this.getApi(network);
    const keyring = new Keyring({ type: 'sr25519' });
    const faucetMnemonic = process.env.FAUCET_MNEMONIC;
    if (!faucetMnemonic) {
      throw new Error('FAUCET_MNEMONIC is not defined in the environment');
    }
    const faucet = keyring.addFromUri(faucetMnemonic);
  
    const balances = api.tx.balances;
    let transfer: any;
  
    if (balances.transfer) {
      transfer = balances.transfer(address, 1_000_000_000_000);
    } else if (balances.transferAllowDeath) {
      transfer = balances.transferAllowDeath(address, 1_000_000_000_000);
    } else if (balances.transferKeepAlive) {
      transfer = balances.transferKeepAlive(address, 1_000_000_000_000);
    } else {
      console.error('No compatible transfer function found in balances pallet.');
      return { success: false, message: 'No compatible transfer function found.' };
    }
  
    return new Promise(async (resolve) => {
      const unsub = await transfer.signAndSend(faucet, (result: { status: { isInBlock: any; asInBlock: { toString: () => any; }; }; }) => {
        if (result.status.isInBlock) {
          unsub();
          resolve({
            success: true,
            message: 'Tokens sent!',
            block: result.status.asInBlock.toString(),
          });
        }
      });
    });
  }  

}