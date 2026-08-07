const OTP_KEY = "citizens_login_otp";

export function generateOtp(): string {
  return Math.floor(Math.random() * 1_000_000).toString().padStart(6, "0");
}

export function storeOtp(userId: string, code: string): void {
  const expires = Date.now() + 10 * 60 * 1000;
  sessionStorage.setItem(OTP_KEY, JSON.stringify({ userId, code, expires }));
}

export function verifyClientOtp(
  userId: string,
  code: string
): "ok" | "expired" | "invalid" | "not_found" {
  try {
    const raw = sessionStorage.getItem(OTP_KEY);
    if (!raw) return "not_found";
    const { userId: storedId, code: storedCode, expires } = JSON.parse(raw);
    if (storedId !== userId) return "not_found";
    if (Date.now() > expires) {
      sessionStorage.removeItem(OTP_KEY);
      return "expired";
    }
    if (storedCode !== code.trim()) return "invalid";
    sessionStorage.removeItem(OTP_KEY);
    return "ok";
  } catch {
    return "not_found";
  }
}
