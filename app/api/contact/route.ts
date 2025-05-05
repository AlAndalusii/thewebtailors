import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Config for Outlook email transport
const emailConfig = {
  host: 'smtp-mail.outlook.com', 
  port: 587,
  secure: false, 
  auth: {
    user: 'zak@thewebtailors.com',
    pass: process.env.EMAIL_PASSWORD || 'Leiden1492!',
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
};

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
    // Create reusable transporter
    const transporter = nodemailer.createTransport(emailConfig);
    
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
      from: emailConfig.auth.user,
      to: emailConfig.auth.user, // Send to yourself
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
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email notification sent:', info.messageId);
    
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
} 