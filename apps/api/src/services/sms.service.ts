import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private twilioClient: Twilio;
  private readonly isDevelopment: boolean;
  private readonly fromNumber: string;

  constructor(private configService: ConfigService) {
    this.isDevelopment = this.configService.get('NODE_ENV') === 'development';
    this.fromNumber = this.configService.get('TWILIO_PHONE_NUMBER');
    
    const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get('TWILIO_AUTH_TOKEN');

    if (accountSid && authToken) {
      this.twilioClient = new Twilio(accountSid, authToken);
    } else {
      this.logger.warn('Twilio credentials not configured. SMS service will use mock mode.');
    }
  }

  async sendVerificationCode(phone: string, code: string): Promise<void> {
    try {
      if (this.isDevelopment) {
        console.log(`📱 SMS to ${phone}: Your verification code is ${code}`);
        return;
      }

      await this.twilioClient.messages.create({
        body: `Your Flowin verification code is: ${code}. This code expires in 10 minutes.`,
        from: this.fromNumber,
        to: phone,
      });

      this.logger.log(`SMS verification code sent to ${phone}`);
    } catch (error) {
      this.logger.error('Error sending SMS verification code:', error);
      throw new Error('Failed to send SMS verification code');
    }
  }

  async send2FACode(phone: string, code: string): Promise<void> {
    try {
      if (this.isDevelopment || !this.twilioClient || !this.fromNumber) {
        console.log(`📱 2FA SMS to ${phone}: Your 2FA code is ${code}`);
        return;
      }

      await this.twilioClient.messages.create({
        body: `Your Flowin 2FA code is: ${code}. This code expires in 5 minutes.`,
        from: this.fromNumber,
        to: phone,
      });

      this.logger.log(`2FA SMS code sent to ${phone}`);
    } catch (error) {
      this.logger.error('Error sending 2FA SMS code:', error);
      throw new Error('Failed to send 2FA SMS code');
    }
  }

  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  isValidPhoneNumber(phoneNumber: string): boolean {
    // Basic international phone number validation
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  }
}
