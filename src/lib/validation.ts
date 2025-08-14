export function validateAadhaar(aadhaar: string): boolean {
  return /^\d{12}$/.test(aadhaar);
}

export function validatePAN(pan: string): boolean {
  return /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/.test(pan);
}

export function validateOTP(otp: string): boolean {
  return /^\d{6}$/.test(otp);
}

export function isRequired(value: string | undefined | null): boolean {
  return value !== undefined && value !== null && value.trim() !== '';
}
