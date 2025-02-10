import * as nodemailer from 'nodemailer';
import { projectConfig } from '../../config/config';

export const sendEmail = async (
  purpose: string,
  subject: string,
  receiverEmail: string,
  code: string,
) => {
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
    subject: subject,
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
          <p>Good day,</p>
          <p>Your ${purpose} is:</p>
          <div style="font-size: 24px; font-weight: bold; color:rgb(3, 73, 147); margin: 20px 0;">
            ${code}
          </div>
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
