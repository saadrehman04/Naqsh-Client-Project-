import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function formatPhone(phone: string): string {
  return phone.replace(/(\+92)(\d{3})(\d{7})/, "$1 $2 $3");
}
