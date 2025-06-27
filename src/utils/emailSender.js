const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendTemplatedEmail(to, subject, templateName, context = {}) {
  const filePath = path.join(__dirname, '..', 'templates', 'email', `${templateName}.html`);
  const source = fs.readFileSync(filePath, 'utf-8');
  const template = Handlebars.compile(source);
  const html = template(context);

  return transporter.sendMail({
    from: `"himalaygarment" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}

module.exports = { sendTemplatedEmail };
