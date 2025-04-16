import { DefaultSession } from "next-auth";

// Extender el usuario de DefaultSession
declare module "next-auth" {
  interface User {
    id: string;
    jwt: string;
    provider?: string;
  }

  interface Session {
    user: {
      id: string;
      jwt: string;
      provider?: string;
    } & DefaultSession["user"];
  }
}

// Extender JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    jwt: string;
    provider?: string;
  }
}

// Tipos para el formulario de inicio de sesión
export interface LoginFormValues {
  email: string;
  password: string;
}

// Tipos para el formulario de registro
export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// Tipos para el formulario de recuperación de contraseña
export interface ForgotPasswordFormValues {
  email: string;
}

// Tipos para el formulario de restablecimiento de contraseña
export interface ResetPasswordFormValues {
  password: string;
  passwordConfirmation: string;
}

// Estado de la autenticación
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Usuario
export interface User {
  id: string;
  name: string;
  email: string;
  jwt: string;
  image?: string | null;
  provider?: string;
}