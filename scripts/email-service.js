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
			const mailOptions = {
				from: this.sender,
				to: this.recipient,
				subject: subject,
				html: body,
			};

			const result = await this.transporter.sendMail(mailOptions);
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

		const statusBg = success ? '#d1fae5' : '#fee2e2';
		const statusColor = success ? '#065f46' : '#991b1b';
		const statusText = success
			? '&#10003; Sync Completed Successfully'
			: '&#10007; Sync Failed';

		const body = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Obsidian Sync Report</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f3ff;font-family:Montserrat,Arial,sans-serif;color:#171717;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f3ff;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #ddd6fe;">
          <tr><td>

            <!-- HEADER -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#2e1065 0%,#4c1d95 40%,#6d28d9 100%);border-radius:8px 8px 0 0;">
              <tr>
                <td style="padding:24px 28px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="vertical-align:middle;padding-right:16px;">
                        <img src="https://bangsluke-assets.netlify.app/images/project-logos/Portfolio-Site-V2.png" alt="Portfolio Site V2" width="48" height="48" style="display:block;border-radius:8px;" />
                      </td>
                      <td style="vertical-align:middle;">
                        <div style="font-family:Montserrat,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#c4b5fd;margin-bottom:4px;">Portfolio Site V2</div>
                        <div style="font-family:Montserrat,Arial,sans-serif;font-size:20px;font-weight:700;color:#ffffff;line-height:1.2;">Obsidian Sync Report</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- STATUS BANNER -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${statusBg};border-bottom:1px solid #ddd6fe;">
              <tr>
                <td style="padding:14px 28px;font-family:Montserrat,Arial,sans-serif;font-size:15px;font-weight:700;color:${statusColor};">
                  ${statusText}
                </td>
              </tr>
            </table>

            <!-- SYNC DETAILS SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:24px 28px 8px;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6d28d9;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #ddd6fe;">Sync Details</div>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;width:140px;">Start Time</td>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;">${new Date(startTime).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;">End Time</td>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;">${new Date(endTime).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;">Source Path</td>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;word-break:break-all;">${sourcePath}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;">Duration</td>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;">${summary.duration ? `${summary.duration}ms` : 'N/A'}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- FILE SUMMARY SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:16px 28px 24px;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6d28d9;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #ddd6fe;">File Summary</div>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #ddd6fe;border-radius:6px;overflow:hidden;border-collapse:collapse;">
                    <tr style="background-color:#f5f3ff;">
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;width:60%;">Total Files Processed</td>
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${summary.totalFiles || 0}</td>
                    </tr>
                    <tr style="background-color:#ffffff;">
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;">Files Copied</td>
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#065f46;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${summary.copiedFiles || 0}</td>
                    </tr>
                    <tr style="background-color:#f5f3ff;">
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #ede9fe;">Files Skipped</td>
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;font-weight:700;border-bottom:1px solid #ede9fe;text-align:right;">${summary.skippedFiles || 0}</td>
                    </tr>
                    <tr style="background-color:#ffffff;">
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;">Errors</td>
                      <td style="padding:10px 16px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:${(summary.errors || 0) > 0 ? '#991b1b' : '#065f46'};font-weight:700;text-align:right;">${summary.errors || 0}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            ${
							errors.length > 0
								? `
            <!-- ERROR DETAILS SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:0 28px 28px;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#991b1b;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #fee2e2;">Error Details</div>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #fca5a5;border-radius:6px;overflow:hidden;border-collapse:collapse;">
                    <thead>
                      <tr>
                        <th style="background-color:#991b1b;color:#fff;padding:10px 12px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Type</th>
                        <th style="background-color:#991b1b;color:#fff;padding:10px 12px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">File / Path</th>
                        <th style="background-color:#991b1b;color:#fff;padding:10px 12px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Error</th>
                        <th style="background-color:#991b1b;color:#fff;padding:10px 12px;font-family:Montserrat,Arial,sans-serif;font-size:12px;font-weight:700;text-align:left;letter-spacing:0.5px;">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${errors
												.map(
													(error, i) => `
                      <tr style="background-color:${i % 2 === 0 ? '#fff' : '#fff5f5'};">
                        <td style="padding:9px 12px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #fee2e2;">${error.type || 'Unknown'}</td>
                        <td style="padding:9px 12px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;border-bottom:1px solid #fee2e2;word-break:break-all;">${error.file || error.directory || 'N/A'}</td>
                        <td style="padding:9px 12px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#991b1b;border-bottom:1px solid #fee2e2;">${error.error}</td>
                        <td style="padding:9px 12px;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;border-bottom:1px solid #fee2e2;white-space:nowrap;">${new Date(error.timestamp).toLocaleString()}</td>
                      </tr>
                      `
												)
												.join('')}
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
            `
								: ''
						}

            <!-- FOOTER -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #ddd6fe;">
              <tr>
                <td style="padding:16px 28px;font-family:Montserrat,Arial,sans-serif;font-size:12px;color:#6b7280;line-height:1.5;">
                  <em>Automated notification from your Obsidian sync script.</em> &bull; <em>Generated ${new Date().toLocaleString()}</em>
                </td>
              </tr>
            </table>

          </td></tr>
        </table>
      </td>
    </tr>
  </table>
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
