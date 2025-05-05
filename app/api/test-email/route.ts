import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls?: {
    ciphers: string;
    rejectUnauthorized: boolean;
  };
  debug?: boolean;
  logger?: boolean;
}

interface EmailError {
  message: string;
  code?: string;
  command?: string;
  responseCode?: number;
  response?: string;
}

export async function GET() {
  try {
    // Log environment variables (safely)
    console.log('Environment check:', {
      userEmail: process.env.USER_EMAIL ? 'Present' : 'Missing',
      emailPassword: process.env.EMAIL_PASSWORD ? 'Present' : 'Missing',
    });
    
    // Return early if credentials are missing
    if (!process.env.USER_EMAIL || !process.env.EMAIL_PASSWORD) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email credentials missing in environment variables' 
      }, { status: 500 });
    }
    
    // Email config for Outlook
    const emailConfig: EmailConfig = {
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      },
      debug: true, // Enable debug output
      logger: true  // Log to console
    };
    
    // Try alternative TLS settings if primary fails
    const alternativeConfigs: EmailConfig[] = [
      // Config 2: No TLS options
      {
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER_EMAIL || '',
          pass: process.env.EMAIL_PASSWORD || '',
        }
      },
      // Config 3: Office365
      {
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER_EMAIL || '',
          pass: process.env.EMAIL_PASSWORD || '',
        }
      }
    ];
    
    // Test main config
    let success = false;
    let lastError: EmailError | null = null;
    let workingConfig: EmailConfig | null = null;
    
    try {
      console.log('Testing main Outlook config...');
      const transporter = nodemailer.createTransport(emailConfig);
      await transporter.verify();
      success = true;
      workingConfig = emailConfig;
      console.log('Main config works!');
      
      // Try to send a test email
      try {
        const info = await transporter.sendMail({
          from: process.env.USER_EMAIL,
          to: process.env.USER_EMAIL,
          subject: "Test Email from Website Contact Form",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>Test Email</h2>
              <p>This is a test email sent from your contact form API to verify email functionality.</p>
              <p>Time: ${new Date().toISOString()}</p>
            </div>
          `
        });
        
        console.log('Test email sent:', info.messageId);
      } catch (sendError: any) {
        console.error('Verification succeeded but sending failed:', sendError);
        return NextResponse.json({
          success: false,
          verify: true,
          send: false,
          message: 'SMTP verification succeeded but sending failed',
          error: sendError.message
        }, { status: 500 });
      }
    } catch (error: any) {
      console.error('Main config failed:', error);
      lastError = error as EmailError;
      
      // Try alternatives
      for (let i = 0; i < alternativeConfigs.length; i++) {
        try {
          console.log(`Testing alternative config ${i+1}...`);
          const altTransporter = nodemailer.createTransport(alternativeConfigs[i]);
          await altTransporter.verify();
          success = true;
          workingConfig = alternativeConfigs[i];
          console.log(`Alternative config ${i+1} works!`);
          
          // Try to send a test email with the working alternative config
          try {
            const info = await altTransporter.sendMail({
              from: process.env.USER_EMAIL,
              to: process.env.USER_EMAIL,
              subject: `Test Email from Website Contact Form (Config ${i+1})`,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                  <h2>Test Email</h2>
                  <p>This is a test email sent from your contact form API to verify email functionality.</p>
                  <p>Using alternative configuration ${i+1}.</p>
                  <p>Time: ${new Date().toISOString()}</p>
                </div>
              `
            });
            
            console.log(`Test email sent with config ${i+1}:`, info.messageId);
          } catch (sendError: any) {
            console.error(`Alternative ${i+1} verification succeeded but sending failed:`, sendError);
            continue; // Try next config
          }
          
          break;
        } catch (altError: any) {
          console.error(`Alternative config ${i+1} failed:`, altError);
          lastError = altError as EmailError;
        }
      }
    }
    
    if (success && workingConfig) {
      return NextResponse.json({ 
        success: true, 
        message: 'SMTP connection successful and test email sent',
        workingConfig: {
          host: workingConfig.host,
          port: workingConfig.port,
          secure: workingConfig.secure,
          hasTLS: !!workingConfig.tls
        }
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'All SMTP configurations failed',
        lastError: lastError ? {
          message: lastError.message,
          code: lastError.code,
          command: lastError.command,
          responseCode: lastError.responseCode,
        } : null
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Unknown error' 
    }, { status: 500 });
  }
} 