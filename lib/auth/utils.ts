/**
 * Client-safe authentication utilities
 * These functions can be used in both client and server components
 */

// Format Nigerian phone number
export function formatNigerianPhone(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If starts with 234, add +
  if (digits.startsWith('234')) {
    return `+${digits}`;
  }
  
  // If starts with 0, replace with +234
  if (digits.startsWith('0')) {
    return `+234${digits.slice(1)}`;
  }
  
  // Otherwise, assume it's without country code
  return `+234${digits}`;
}

// Validate Nigerian phone number
export function validateNigerianPhone(phone: string): boolean {
  const formatted = formatNigerianPhone(phone);
  // Nigerian numbers: +234 followed by 10 digits (7-9 as first digit)
  const regex = /^\+234[7-9][0-1]\d{8}$/;
  return regex.test(formatted);
}
