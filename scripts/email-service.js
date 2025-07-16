#!/usr/bin/env node

import nodemailer from 'nodemailer';

// Email service for Obsidian sync notifications
export class EmailService {
  constructor(config = {}) {
    this.config = config;
    this.recipient = config.recipient || 'bangsluke@gmail.com';
    this.sender = config.sender || 'bangsluke@gmail.com';
    this.enabled = false; // Will be set during initialization
    this.transporter = null;
  }

  _getSmtpConfig() {
    return {
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || this.sender,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    };
  }

  async initialize() {
    // Set enabled status based on environment variables
    this.enabled =
      this.config.enabled !== false &&
      process.env.EMAIL_NOTIFICATIONS === 'true';

    // Update recipient and sender from environment variables if available
    this.recipient =
      this.config.recipient || process.env.EMAIL_RECIPIENT || this.recipient;
    this.sender = this.config.sender || process.env.EMAIL_SENDER || this.sender;

    if (!this.enabled) {
      console.log('📧 Email notifications disabled');
      return false;
    }

    try {
      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error(
          '❌ Gmail credentials not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD environment variables.'
        );
        return false;
      }

      this.transporter = nodemailer.createTransport(this._getSmtpConfig());

      // Verify connection
      await this.transporter.verify();
      console.log('📧 Email service initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error.message);
      return false;
    }
  }

  async sendEmail(subject, body) {
    if (!this.enabled || !this.transporter) {
      console.log('📧 Email notifications disabled or not initialized');
      return false;
    }

    try {
      console.log('📧 Sending email notification...');

      const mailOptions = {
        from: this.sender,
        to: this.recipient,
        subject: subject,
        html: body,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email notification sent successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to send email notification:', error.message);
      return false;
    }
  }

  generateSyncReport(syncData) {
    const {
      success,
      startTime,
      endTime,
      sourcePath,
      summary,
      errors = [],
    } = syncData;

    const subject = success
      ? '✅ Obsidian Sync Successful'
      : '❌ Obsidian Sync Failed';

    let body = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
    .status { font-size: 18px; font-weight: bold; }
    .success { color: #28a745; }
    .error { color: #dc3545; }
    .summary { background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .summary ul { margin: 0; padding-left: 20px; }
    .error-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .error-table th, .error-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    .error-table th { background-color: #f2f2f2; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Portfolio Site V2 - Obsidian Sync Report</h1>
    <div class="status ${success ? 'success' : 'error'}">
      ${success ? '✅ Sync Completed Successfully' : '❌ Sync Failed'}
    </div>
  </div>

  <div class="summary">
    <h3>Sync Details</h3>
    <p><strong>Start Time:</strong> ${new Date(startTime).toLocaleString()}</p>
    <p><strong>End Time:</strong> ${new Date(endTime).toLocaleString()}</p>
    <p><strong>Source Path:</strong> ${sourcePath}</p>
    <p><strong>Duration:</strong> ${summary.duration ? `${summary.duration}ms` : 'N/A'}</p>
  </div>

  <div class="summary">
    <h3>Summary</h3>
    <ul>
      <li><strong>Total Files Processed:</strong> ${summary.totalFiles || 0}</li>
      <li><strong>Files Copied:</strong> ${summary.copiedFiles || 0}</li>
      <li><strong>Files Skipped:</strong> ${summary.skippedFiles || 0}</li>
      <li><strong>Errors:</strong> ${summary.errors || 0}</li>
    </ul>
  </div>
`;

    if (errors.length > 0) {
      body += `
  <h3>Errors</h3>
  <table class="error-table">
    <thead>
      <tr>
        <th>Type</th>
        <th>File/Path</th>
        <th>Error</th>
        <th>Timestamp</th>
      </tr>
    </thead>
    <tbody>
`;
      errors.forEach(error => {
        body += `
      <tr>
        <td>${error.type || 'Unknown'}</td>
        <td>${error.file || error.directory || 'N/A'}</td>
        <td>${error.error}</td>
        <td>${new Date(error.timestamp).toLocaleString()}</td>
      </tr>
`;
      });
      body += `
    </tbody>
  </table>
`;
    }

    body += `
  <div class="footer">
    <p><em>This is an automated notification from your Obsidian sync script.</em></p>
    <p><em>Generated on ${new Date().toLocaleString()}</em></p>
  </div>
</body>
</html>
`;

    return { subject, body };
  }

  async sendSyncNotification(syncData) {
    const { subject, body } = this.generateSyncReport(syncData);
    return await this.sendEmail(subject, body);
  }
}

// Default email service instance
export const emailService = new EmailService();
