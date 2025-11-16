import nodemailer from 'nodemailer';

// Email configuration
// In production, use environment variables for these values
// For Gmail, you need to use an App Password (not your regular password)
// Go to: Google Account > Security > 2-Step Verification > App passwords

function createTransporter() {
  const emailUser = process.env.EMAIL_USER || 'laxmieducationconsultancy1@gmail.com';
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailPassword) {
    console.warn('EMAIL_PASSWORD not set. Email functionality will not work.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
    auth: {
      user: emailUser,
      pass: emailPassword, // Use app-specific password for Gmail
    },
  });
}

export async function sendPasswordResetEmail(email: string, resetToken: string, resetUrl: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'laxmieducationconsultancy1@gmail.com',
    to: email,
    subject: 'Password Reset Request - Laxmi Education Admin',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #1e40af;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .button:hover {
              background-color: #1e3a8a;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <h2>Password Reset Request</h2>
              <p>Hello,</p>
              <p>You have requested to reset your password for the Laxmi Education Admin Dashboard.</p>
              <p>Click the button below to reset your password:</p>
              <a href="${resetUrl}" class="button">Reset Password</a>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #1e40af;">${resetUrl}</p>
              <p><strong>This link will expire in 1 hour.</strong></p>
              <p>If you did not request a password reset, please ignore this email.</p>
              <div class="footer">
                <p>This is an automated message from Laxmi Education Consultancy.</p>
                <p>Please do not reply to this email.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Password Reset Request - Laxmi Education Admin
      
      You have requested to reset your password for the Laxmi Education Admin Dashboard.
      
      Click the link below to reset your password:
      ${resetUrl}
      
      This link will expire in 1 hour.
      
      If you did not request a password reset, please ignore this email.
    `,
  };

  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.error('Email transporter not configured. Please set EMAIL_PASSWORD environment variable.');
      return { success: false, error: 'Email service not configured' };
    }
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

