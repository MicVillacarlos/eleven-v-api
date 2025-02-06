import * as nodemailer from 'nodemailer';
import { projectConfig } from '../../config/config';

export const sendEmail = async (receiverEmail: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: projectConfig.mailEmail,
      pass: projectConfig.mailEmailAppPassword,
    },
  });

  const message = {
    from: 'Eleven-V Support" <no-reply@eleven-v.com>',
    to: receiverEmail,
    subject: 'Verification Code - Eleven-V',
    text: `Good day, this is the verification code ${code}`,
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
          <h2 style="color: #007BFF;">Verification Code</h2>
          <p>Good day,</p>
          <p>Thank you for signing up for <strong>Eleven-V</strong>.</p>
          <p>Your verification code is:</p>
          <div style="font-size: 24px; font-weight: bold; color: #007BFF; margin: 20px 0;">
            ${code}
          </div>
          <p>Please use this code to complete your registration.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr />
          <p style="font-size: 12px; color: #888;">
            Eleven-V, All rights reserved.
          </p>
        </div>
      `,
  };

  try {
    const info = await transporter.sendMail(message);
    return { success: true, info };
  } catch (error) {
    return { success: false, error };
  }
};
