import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';

@Injectable()
export class GoogleAuthenticatorService {
  generateSecret(email: string) {
    const secret = speakeasy.generateSecret({
      name: `Polkadot Faucet (${email})`,
    });
    return { secret: secret.base32, otpauth_url: secret.otpauth_url };
  }

  verifyToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });
  }
}