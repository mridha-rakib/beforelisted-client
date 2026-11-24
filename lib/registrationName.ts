export function isValidRenterRegistrationName(value: string): boolean {
  return value.trim().split(/\s+/).filter(Boolean).length >= 2;
}
