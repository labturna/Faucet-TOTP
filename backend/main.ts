import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { FaucetController } from './faucet.controller';
import { GoogleAuthenticatorService } from './google-authenticator.service';
import { PolkadotFaucetService } from './polkadot-faucet.service';

@Module({
  controllers: [FaucetController],
  providers: [GoogleAuthenticatorService, PolkadotFaucetService],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(1337);
  console.log('🚀 Backend running at http://localhost:1337');
}
bootstrap();
