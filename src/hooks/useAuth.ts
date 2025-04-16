"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiRegister, apiForgotPassword, apiResetPassword } from "@/lib/api";
import { LoginFormValues, RegisterFormValues } from "@/types/auth";

export function useAuth() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async ({ email, password }: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        return false;
      }

      router.push("/dashboard");
      router.refresh();
      return true;
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      if (data.password !== data.passwordConfirmation) {
        throw new Error("Las contraseñas no coinciden");
      }

      const userData = await apiRegister({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      // Iniciar sesión automáticamente después del registro
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push("/dashboard");
      router.refresh();
      return true;
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiForgotPassword(email);
      return true;
    } catch (err: any) {
      setError(err.message || "Error al solicitar restablecimiento de contraseña");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (code: string, password: string, passwordConfirmation: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (password !== passwordConfirmation) {
        throw new Error("Las contraseñas no coinciden");
      }

      await apiResetPassword(code, password, passwordConfirmation);
      router.push("/login");
      return true;
    } catch (err: any) {
      setError(err.message || "Error al restablecer contraseña");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      router.push("/login");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Error al cerrar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user: session?.user || null,
    isAuthenticated: !!session?.user,
    isLoading: status === "loading" || isLoading,
    error,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
  };
}