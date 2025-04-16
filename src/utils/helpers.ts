import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Función para combinar clases de Tailwind de manera eficiente
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Función para formatear fechas
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Función para validar formato de email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para manejar errores de API
export function handleApiError(error: any): string {
  if (error.response?.data?.error?.message) {
    return error.response.data.error.message;
  }
  if (error.message) {
    return error.message;
  }
  return "Ha ocurrido un error. Por favor, inténtalo de nuevo.";
}