#!/usr/bin/env node

import dotenv from 'dotenv';
import { emailService } from './email-service.js';

// Load environment variables from .env file
dotenv.config();

async function testEmail() {
	console.log('🧪 Testing email service...');

	const initialized = await emailService.initialize();
	if (!initialized) {
		// eslint-disable-next-line no-console
		console.error('❌ Failed to initialize email service');
		// eslint-disable-next-line no-console
		console.log('💡 Check your .env file and Gmail App Password configuration');
		return;
	}

	// eslint-disable-next-line no-console
	console.log('📧 Sending test email...');

	const success = await emailService.sendEmail(
		'🧪 Test Email from Portfolio Sync',
		`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Service Test</title>
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
                        <div style="font-family:Montserrat,Arial,sans-serif;font-size:20px;font-weight:700;color:#ffffff;line-height:1.2;">Email Service Test</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- STATUS BANNER -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#d1fae5;border-bottom:1px solid #ddd6fe;">
              <tr>
                <td style="padding:14px 28px;font-family:Montserrat,Arial,sans-serif;font-size:15px;font-weight:700;color:#065f46;">
                  &#10003; Email Service is Working Correctly
                </td>
              </tr>
            </table>

            <!-- TEST DETAILS SECTION -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:24px 28px;">
                  <div style="font-family:Montserrat,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6d28d9;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #ddd6fe;">Test Details</div>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;width:140px;">Service</td>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;">Gmail SMTP via Nodemailer</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;">Sender</td>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;">${emailService.sender}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;">Recipient</td>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;">${emailService.recipient}</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#6b7280;">Timestamp</td>
                      <td style="padding:6px 0;font-family:Montserrat,Arial,sans-serif;font-size:13px;color:#171717;font-weight:600;">${new Date().toLocaleString()}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- FOOTER -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #ddd6fe;">
              <tr>
                <td style="padding:16px 28px;font-family:Montserrat,Arial,sans-serif;font-size:12px;color:#6b7280;line-height:1.5;">
                  <em>Automated test from your Obsidian sync email service.</em>
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
    `
	);

	if (success) {
		// eslint-disable-next-line no-console
		console.log('✅ Test email sent successfully!');
		// eslint-disable-next-line no-console
		console.log('📬 Check your inbox for the test email');
	} else {
		// eslint-disable-next-line no-console
		console.log('❌ Test email failed');
	}
}

// Run the test
testEmail().catch(error => {
	// eslint-disable-next-line no-console
	console.error('❌ Test failed with error:', error.message);
	process.exit(1);
});
