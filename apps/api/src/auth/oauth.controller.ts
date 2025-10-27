import { Controller, Get, UseGuards, Request, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GitHubAuthGuard } from './guards/github-auth.guard';

@ApiTags('OAuth Authentication')
@Controller('auth')
export class OAuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  // ================================
  // GOOGLE OAUTH
  // ================================

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @ApiResponse({ 
    status: 302, 
    description: 'Redirects to Google OAuth consent screen' 
  })
  async googleAuth() {
    // This endpoint initiates the Google OAuth flow
    // The actual redirect is handled by the GoogleAuthGuard
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth callback endpoint' })
  @ApiResponse({ 
    status: 302, 
    description: 'Redirects to frontend with authentication result' 
  })
  async googleAuthCallback(@Request() req, @Res() res: Response) {
    try {
      // User is attached to request by GoogleStrategy
      const authResult = await this.authService.oauthLogin(req.user);
      
      // Get frontend URL from config
      const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
      
      // Redirect to frontend with token
      const redirectUrl = `${frontendUrl}/auth/callback?token=${authResult.access_token}&provider=google`;
      
      return res.redirect(HttpStatus.FOUND, redirectUrl);
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      
      // Redirect to frontend with error
      const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
      const errorUrl = `${frontendUrl}/auth/callback?error=oauth_failed&provider=google`;
      
      return res.redirect(HttpStatus.FOUND, errorUrl);
    }
  }

  // ================================
  // GITHUB OAUTH
  // ================================

  @Get('github')
  @UseGuards(GitHubAuthGuard)
  @ApiOperation({ summary: 'Initiate GitHub OAuth login' })
  @ApiResponse({ 
    status: 302, 
    description: 'Redirects to GitHub OAuth consent screen' 
  })
  async githubAuth() {
    // This endpoint initiates the GitHub OAuth flow
    // The actual redirect is handled by the GitHubAuthGuard
  }

  @Get('github/callback')
  @UseGuards(GitHubAuthGuard)
  @ApiOperation({ summary: 'GitHub OAuth callback endpoint' })
  @ApiResponse({ 
    status: 302, 
    description: 'Redirects to frontend with authentication result' 
  })
  async githubAuthCallback(@Request() req, @Res() res: Response) {
    try {
      // User is attached to request by GitHubStrategy
      const authResult = await this.authService.oauthLogin(req.user);
      
      // Get frontend URL from config
      const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
      
      // Redirect to frontend with token
      const redirectUrl = `${frontendUrl}/auth/callback?token=${authResult.access_token}&provider=github`;
      
      return res.redirect(HttpStatus.FOUND, redirectUrl);
    } catch (error) {
      console.error('GitHub OAuth callback error:', error);
      
      // Redirect to frontend with error
      const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
      const errorUrl = `${frontendUrl}/auth/callback?error=oauth_failed&provider=github`;
      
      return res.redirect(HttpStatus.FOUND, errorUrl);
    }
  }
}
