import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL', '/api/auth/google/callback'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { id, name, emails, photos } = profile;
      
      // Extract user information from Google profile
      const email = emails[0]?.value;
      const firstName = name?.givenName;
      const lastName = name?.familyName;
      const fullName = `${firstName} ${lastName}`.trim();
      const picture = photos[0]?.value;

      if (!email) {
        return done(new Error('No email found in Google profile'), null);
      }

      // Find or create user with OAuth provider info
      const user = await this.authService.findOrCreateOAuthUser({
        email,
        name: fullName,
        image: picture,
        provider: 'google',
        providerId: id,
        accessToken,
        refreshToken,
      });

      return done(null, user);
    } catch (error) {
      console.error('Google OAuth validation error:', error);
      return done(error, null);
    }
  }
}
