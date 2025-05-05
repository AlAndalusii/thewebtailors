import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Define email config interface
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
}

// Email configs to try
const emailConfigs: EmailConfig[] = [
  // Primary config for Outlook
  {
    host: 'smtp-mail.outlook.com', 
    port: 587,
    secure: false, 
    auth: {
      user: process.env.USER_EMAIL || '',
      pass: process.env.EMAIL_PASSWORD || '',
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  },
  // Alternative without TLS options
  {
    host: 'smtp-mail.outlook.com', 
    port: 587,
    secure: false, 
    auth: {
      user: process.env.USER_EMAIL || '',
      pass: process.env.EMAIL_PASSWORD || '',
    }
  },
  // Office365 SMTP
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

// Directory to store submissions
const dataDir = path.join(process.cwd(), 'data');
const submissionsFile = path.join(dataDir, 'submissions.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure submissions file exists
if (!fs.existsSync(submissionsFile)) {
  fs.writeFileSync(submissionsFile, JSON.stringify([], null, 2));
}

export async function POST(request: Request) {
  try {
    // Get form data from request
    const formData = await request.json();
    
    // Add timestamp to the submission
    const submission = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    };
    
    // Store submission
    storeSubmission(submission);
    
    // Send email notification
    await sendEmailNotification(submission);
    
    // Return success response
    return NextResponse.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Form submission failed' },
      { status: 500 }
    );
  }
}

// Function to store submission in JSON file
function storeSubmission(submission: any) {
  try {
    // Read existing submissions
    const data = fs.readFileSync(submissionsFile, 'utf8');
    const submissions = JSON.parse(data);
    
    // Add new submission
    submissions.push(submission);
    
    // Write updated submissions back to file
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));
    
    console.log(`Submission stored with ID: ${submission.id}`);
  } catch (error) {
    console.error('Error storing submission:', error);
  }
}

// Function to send email notification
async function sendEmailNotification(submission: any) {
  try {
    // Debug email configuration
    console.log('Email credentials:', { 
      user: process.env.USER_EMAIL ? 'Present' : 'Missing',
      pass: process.env.EMAIL_PASSWORD ? 'Present' : 'Missing'
    });
    
    if (!process.env.USER_EMAIL || !process.env.EMAIL_PASSWORD) {
      console.error('Missing email credentials: One or both of USER_EMAIL or EMAIL_PASSWORD environment variables are not set');
      throw new Error('Missing email credentials');
    }
    
    // Format submission data for email
    const submissionDetails = Object.entries(submission)
      .map(([key, value]) => {
        if (key !== 'id') {
          return `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}`;
        }
        return null;
      })
      .filter(Boolean)
      .join('<br>');
    
    // Set up email data
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL, // Send to yourself
      subject: `New Website Contact Form Submission - ${submission.name || 'Anonymous'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #6366f1; margin-bottom: 20px; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="margin-bottom: 30px;">
            ${submissionDetails}
          </div>
          <div style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
            <p>This is an automated notification from your website contact form.</p>
            <p>Timestamp: ${new Date(submission.timestamp).toLocaleString()}</p>
          </div>
        </div>
      `,
    };
    
    // Try each email configuration until one works
    let sentSuccessfully = false;
    let lastError = null;
    
    for (let i = 0; i < emailConfigs.length; i++) {
      try {
        console.log(`Trying email config ${i+1}/${emailConfigs.length}`);
        const config = emailConfigs[i];
        console.log(`Config details: host=${config.host}, port=${config.port}, tls=${!!config.tls}`);
        
        const transporter = nodemailer.createTransport(config);
        
        // Verify connection first
        await transporter.verify();
        console.log(`Email config ${i+1} verified successfully`);
        
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully with config ${i+1}. ID: ${info.messageId}`);
        
        sentSuccessfully = true;
        break;
      } catch (error) {
        console.error(`Failed to send with config ${i+1}:`, error);
        lastError = error;
        // Continue to next configuration
      }
    }
    
    if (!sentSuccessfully) {
      console.error('All email configurations failed:', lastError);
      throw lastError;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
} 