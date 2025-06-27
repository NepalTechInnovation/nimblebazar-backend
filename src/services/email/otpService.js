const crypto = require('crypto');

const otpStore = new Map();
const maxAttempts = 5;
const otpTTL = 10 * 60 * 1000;
function generateOTP(length = 6) {
  return crypto.randomInt(0, 10 ** length).toString().padStart(length, '0');
}
function hashOTP(otp) {
  return crypto.createHash('sha256').update(otp).digest('hex');
}
function safeCompare(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
function saveOTP(email, otp) {
  const hashedOtp = hashOTP(otp);
  const expiresAt = Date.now() + otpTTL;
  otpStore.set(email, {
    otp: hashedOtp,
    expiresAt,
    attempts: 0,
  });
}

function verifyOTP(email, otp) {
  const record = otpStore.get(email);
  if (!record) return false;

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return false; // expired
  }

  if (record.attempts >= maxAttempts) {
    otpStore.delete(email);
    return false; // too many attempts
  }

  const hashedOtp = hashOTP(otp);

  const isValid = safeCompare(record.otp, hashedOtp);

  record.attempts++;

  if (isValid) {
    otpStore.delete(email);
    return true;
  } else {
    otpStore.set(email, record);
    return false;
  }
}


module.exports = { generateOTP, saveOTP, verifyOTP, otpStore };
