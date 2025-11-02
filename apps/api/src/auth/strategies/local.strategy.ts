import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { I18nService } from 'nestjs-i18n';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private i18n: I18nService,
  ) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      // Get language from Accept-Language header or use default
      const acceptLanguage = req.headers['accept-language']?.toString() || 'en';
      // Parse Accept-Language header (e.g., "ar", "ar,en;q=0.9", "ar-SA,en;q=0.9")
      const preferredLang = acceptLanguage.split(',')[0]?.trim().split('-')[0]?.trim().toLowerCase() || 'en';
      // Ensure we support the language (fallback to 'en' if not supported)
      const supportedLang = ['en', 'ar'].includes(preferredLang) ? preferredLang : 'en';
      const message = await this.i18n.translate('auth.INVALID_CREDENTIALS', { lang: supportedLang });
      throw new UnauthorizedException(message);
    }
    return user;
  }
}
