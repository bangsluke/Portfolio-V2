#!/usr/bin/env node

import dotenv from 'dotenv';
import { emailService } from './scripts/email-service.js';

// Load environment variables from .env file
dotenv.config();

async function testEmail() {
  console.log('🧪 Testing email service...');

  const initialized = await emailService.initialize();
  if (!initialized) {
    console.error('❌ Failed to initialize email service');
    console.log('💡 Check your .env file and Gmail App Password configuration');
    return;
  }

  console.log('📧 Sending test email...');

  const success = await emailService.sendEmail(
    '🧪 Test Email from Portfolio Sync',
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">✅ Email Service Test</h1>
      <p>If you receive this email, your Portfolio-V2 email service is working correctly!</p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3>Test Details:</h3>
        <ul>
          <li><strong>Service:</strong> Gmail SMTP via Nodemailer</li>
          <li><strong>Sender:</strong> ${emailService.sender}</li>
          <li><strong>Recipient:</strong> ${emailService.recipient}</li>
          <li><strong>Timestamp:</strong> ${new Date().toLocaleString()}</li>
        </ul>
      </div>
      
      <p style="color: #666; font-size: 12px;">
        This is an automated test from your Obsidian sync email service.
      </p>
    </div>
    `
  );

  if (success) {
    console.log('✅ Test email sent successfully!');
    console.log('📬 Check your inbox for the test email');
  } else {
    console.log('❌ Test email failed');
  }
}

// Run the test
testEmail().catch(error => {
  console.error('❌ Test failed with error:', error.message);
  process.exit(1);
});
