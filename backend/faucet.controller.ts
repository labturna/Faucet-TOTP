import { Controller, Post, Body } from '@nestjs/common';
import { GoogleAuthenticatorService } from './google-authenticator.service';
import { PolkadotFaucetService } from './polkadot-faucet.service';

@Controller('faucet')
export class FaucetController {
  constructor(
    private readonly authService: GoogleAuthenticatorService,
    private readonly faucetService: PolkadotFaucetService,
  ) {}

  @Post('setup')
  async setup(@Body('email') email: string) {
    const { secret, otpauth_url } = this.authService.generateSecret(email);
    return { secret, otpauth_url };
  }

  @Post('claim')
  async claim(@Body() body: { address: string; secret: string; token: string; network: 'westend' | 'paseo' }) {
    const isValid = this.authService.verifyToken(body.secret, body.token);
    if (!isValid) return { success: false, message: 'Invalid OTP' };

    return await this.faucetService.sendTokens(body.address, body.network);
  }
}