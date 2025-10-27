import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OAuthController } from './oauth.controller';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { ApiKeysService } from './api-keys.service';
import { ApiKeysController } from './api-keys.controller';
import { TwoFactorService } from './two-factor-temp.service';
import { TwoFactorController } from './two-factor.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GitHubStrategy } from './strategies/github.strategy';
import { UsersModule } from '../users/users.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [
    UsersModule,
    ServicesModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN', '7d') },
      }),
    }),
  ],
  controllers: [AuthController, OAuthController, VerificationController, ApiKeysController, TwoFactorController],
  providers: [AuthService, VerificationService, ApiKeysService, TwoFactorService, JwtStrategy, LocalStrategy, GoogleStrategy, GitHubStrategy],
  exports: [AuthService, VerificationService],
})
export class AuthModule {}
