import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get('GITHUB_CALLBACK_URL', '/auth/github/callback'),
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    try {
      const { id, username, displayName, emails, photos } = profile;
      
      // Extract user information from GitHub profile
      const email = emails?.[0]?.value;
      const name = displayName || username;
      const picture = photos?.[0]?.value;

      if (!email) {
        return null; // GitHub might not provide email if privacy settings are strict
      }

      // Find or create user with OAuth provider info
      const user = await this.authService.findOrCreateOAuthUser({
        email,
        name,
        image: picture,
        provider: 'github',
        providerId: id,
        accessToken,
        refreshToken,
      });

      return user;
    } catch (error) {
      console.error('GitHub OAuth validation error:', error);
      return null;
    }
  }
}
