import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.createTransporter();
  }

  private createTransporter() {
    const smtpHost = this.configService.get('SMTP_HOST');
    const smtpPort = this.configService.get('SMTP_PORT', 587);
    const smtpUser = this.configService.get('SMTP_USER');
    const smtpPass = this.configService.get('SMTP_PASS');

    if (smtpHost && smtpUser && smtpPass) {
      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort),
        secure: smtpPort === '465', // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      this.logger.log('Email service configured with SMTP');
    } else {
      this.logger.warn('SMTP credentials not configured. Email service will use mock mode.');
    }
  }

  async sendVerificationEmail(email: string, token: string): Promise<boolean> {
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    const verificationUrl = `${frontendUrl}/auth/verify-email?token=${token}`;

    const mailOptions = {
      from: this.configService.get('SMTP_FROM', 'Flowin <noreply@flowin.com>'),
      to: email,
      subject: 'Verify Your Email - Flowin',
      html: this.getEmailVerificationTemplate(verificationUrl),
    };

    return this.sendEmail(mailOptions);
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<boolean> {
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    const resetLink = `${frontendUrl}/auth/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: this.configService.get('SMTP_FROM', 'Flowin <noreply@flowin.com>'),
      to: email,
      subject: 'Reset Your Flowin Password',
      html: this.getPasswordResetTemplate(resetLink),
    };
    
    const result = await this.sendEmail(mailOptions);
    this.logger.log(`Password reset email sent to ${email}`);
    return result;
  }

  async send2FAEmail(email: string, code: string): Promise<boolean> {
    const mailOptions = {
      from: this.configService.get('SMTP_FROM', 'Flowin <noreply@flowin.com>'),
      to: email,
      subject: 'Your Flowin 2FA Code',
      html: this.get2FATemplate(code),
    };
    
    const result = await this.sendEmail(mailOptions);
    this.logger.log(`2FA email sent to ${email}`);
    return result;
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');

    const mailOptions = {
      from: this.configService.get('SMTP_FROM', 'Flowin <noreply@flowin.com>'),
      to: email,
      subject: 'Welcome to Flowin! 🌊',
      html: this.getWelcomeTemplate(name, frontendUrl),
    };

    return this.sendEmail(mailOptions);
  }

  private async sendEmail(mailOptions: any): Promise<boolean> {
    const isDevelopment = this.configService.get('NODE_ENV') === 'development';

    // In development or if SMTP not configured, just log the email
    if (isDevelopment || !this.transporter) {
      this.logger.log(`📧 Email would be sent to: ${mailOptions.to}`);
      this.logger.log(`📋 Subject: ${mailOptions.subject}`);
      if (mailOptions.html.includes('token=') || mailOptions.html.includes('code')) {
        // Extract token or code for development
        const tokenMatch = mailOptions.html.match(/token=([^"&]+)/);
        const codeMatch = mailOptions.html.match(/code[^>]*>([^<]+)</);
        if (tokenMatch) {
          this.logger.log(`🔑 Token: ${tokenMatch[1]}`);
        }
        if (codeMatch) {
          this.logger.log(`🔢 Code: ${codeMatch[1]}`);
        }
      }
      return true;
    }

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully to ${mailOptions.to}. Message ID: ${info.messageId}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${mailOptions.to}:`, error);
      return false;
    }
  }

  private getEmailVerificationTemplate(verificationUrl: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Verify Your Email</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .button { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌊 Flowin</h1>
            <h2>Verify Your Email Address</h2>
          </div>
          <p>Welcome to Flowin! Please click the button below to verify your email address and complete your registration.</p>
          <p style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </p>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p><a href="${verificationUrl}">${verificationUrl}</a></p>
          <div class="footer">
            <p>This verification link will expire in 24 hours.</p>
            <p>If you didn't create an account with Flowin, you can safely ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getPasswordResetTemplate(resetUrl: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Your Password</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .button { display: inline-block; padding: 12px 24px; background: #dc3545; color: white; text-decoration: none; border-radius: 5px; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌊 Flowin</h1>
            <h2>Reset Your Password</h2>
          </div>
          <p>You requested to reset your password. Click the button below to create a new password.</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </p>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <div class="footer">
            <p>This reset link will expire in 1 hour.</p>
            <p>If you didn't request a password reset, you can safely ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private getWelcomeTemplate(name: string, frontendUrl: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Flowin</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .button { display: inline-block; padding: 12px 24px; background: #28a745; color: white; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌊 Welcome to Flowin!</h1>
          </div>
          <p>Hi ${name || 'there'},</p>
          <p>Welcome to Flowin! We're excited to have you on board. With Flowin, you can automate your workflows and boost your productivity effortlessly.</p>
          <p>Here's what you can do next:</p>
          <ul>
            <li>🔗 Connect your favorite apps and services</li>
            <li>⚡ Create your first automation flow</li>
            <li>📚 Explore our template library</li>
            <li>🤖 Try our AI-powered flow builder</li>
          </ul>
          <p style="text-align: center;">
            <a href="${frontendUrl}/dashboard" class="button">Get Started</a>
          </p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Happy automating!</p>
          <p>The Flowin Team</p>
        </div>
      </body>
      </html>
    `;
  }

  private get2FATemplate(code: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your 2FA Code</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .code { font-size: 32px; font-weight: bold; text-align: center; background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌊 Flowin</h1>
            <h2>Your 2FA Code</h2>
          </div>
          <p>Use this code to complete your two-factor authentication:</p>
          <div class="code">${code}</div>
          <div class="footer">
            <p>This code will expire in 5 minutes.</p>
            <p>If you didn't request this code, please contact support immediately.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
