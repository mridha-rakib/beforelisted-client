export function isValidRegistrationPhone(value: string): boolean {
  const phone = value.trim();
  return Boolean(phone) && !/[\r\n]/.test(phone) && /^[\d\s\-()+.]+$/.test(phone) && phone.replace(/\D/g, "").length >= 10;
}
