import axios from 'axios';
import { transporter } from '#config/nodemailer.js';
import { formatDateTime, toTitleCase } from '#utils/format.js';

export async function sendNotificationToParent(log) {
  const { type, createdAt, student } = log;
  const { first_name, last_name, education } = student || {};
  const { program } = education || {};
  const to = student.guardian.email;
  const subject = 'Letran Clock-in: Student Monitoring.';
  const html = `
    <div style="font-family: Arial; padding: 20px;">
      <h2 style="color: #2E86C1;">Colegio de San Juan de Letran Manaoag</h2>

      <p>Dear Parent/Guardian,</p>

      <div>
        <p>
          <strong>Your son/daughter, </strong>
          ${`${program}`.toUpperCase()} 
          ${type == 'entry' ? 'has entered the campus at' : 'has left the campus at'}
          <strong>${formatDateTime(createdAt)}</strong>.
        </p>

        <p><strong>Student:</strong> ${toTitleCase(`${first_name} ${last_name}`)}</p>
        <p><strong>Course:</strong> ${`${program}`.toUpperCase()}</p>
      </div>

      <hr/>
      <p style="font-size: 12px; color: gray;">
        This is an automated notification.
      </p>
    </div>
  `;
  const mailOptions = {
    from: `"Colegio de San Juan de Letran Manaoag: Student Monitoring Notification" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
}

export async function sendSMS(phoneNumber, log) {
  try {
    const { type, first_name, last_name } = log;

    const fullName = toTitleCase(`${first_name} ${last_name}`);
    const actionText =
      type === 'entry' ? 'entered the school campus' : 'left the school campus';

    const message = `Your son/daughter ${fullName} has ${actionText}`;

    const response = await axios.post(
      'https://www.iprogsms.com/api/v1/sms_messages',
      {
        message,
        phone_number: phoneNumber,
      },
      {
        params: {
          api_token: process.env.SMS_API_TOKEN,
        },
        timeout: 10000, // prevent hanging requests
      }
    );

    return response.data;
  } catch (error) {
    console.error('SMS sending failed:', error.response?.data || error.message);
    throw error; // let caller handle it
  }
}
