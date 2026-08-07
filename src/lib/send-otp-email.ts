import emailjs from "@emailjs/browser";

export async function sendOtpEmail(params: {
  toEmail: string;
  toName: string;
  otpCode: string;
}): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS not configured");
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      to_email: params.toEmail,
      to_name: params.toName,
      otp_code: params.otpCode,
      passcode: params.otpCode, // EmailJS default OTP template variable
    },
    publicKey
  );
}
