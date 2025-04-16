"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Spin from "../loaders/Spin";
import SignSocial from "../SingSocial";
import { checkUserConfirmation } from "@/lib/api";

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Limpiar error anterior
    setErrorMsg(null);
    
    // Bloquear el botón de enviar
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      console.log("Iniciando proceso de login para:", email);
      
      // Primero verificamos si el usuario existe
      const userCheck = await checkUserConfirmation(email);
      console.log("Datos de usuario recibidos:", userCheck);
      
      // Intentamos iniciar sesión con las credenciales
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("Resultado de inicio de sesión:", result);

      if (result?.ok) {
        toast.success("Sesión iniciada correctamente.");
        
        // Redirección después del login
        const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl");
        if (callbackUrl) {
          router.replace(callbackUrl);
        } else {
          router.replace("/");
        }
      } else {
        // Si el usuario existe pero falla la autenticación, entonces es problema de contraseña
        if (userCheck?.exists) {
          setErrorMsg("Contraseña incorrecta");
          // Mostramos el error en rojo en la UI
          document.getElementById("password-container")?.classList.add("error-state");
        } else {
          setErrorMsg("Credenciales incorrectas");
        }
      }
    } catch (error: any) {
      console.error("Error durante el proceso de login:", error);
      
      const errorMessage = error.message || "Error al conectar con el servidor";
      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-md flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}
      
      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
          >
            Correo electrónico
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tu@ejemplo.com"
              required
              className="block w-full rounded-md border-0 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div id="password-container">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Contraseña
            </label>
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-normal text-emerald-600 hover:text-emerald-500 dark:hover:text-emerald-400"
              >
                ¿Has olvidado tu contraseña?
              </Link>
            </div>
          </div>
          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              className={`block w-full rounded-md border-0 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ${
                errorMsg === "Contraseña incorrecta" 
                  ? "ring-red-500 focus:ring-red-500" 
                  : "ring-gray-300 dark:ring-gray-700 focus:ring-emerald-600"
              } placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            </button>
          </div>
          {errorMsg === "Contraseña incorrecta" && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              La contraseña que ingresaste es incorrecta.
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`text-white w-full justify-center inline-flex items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-600"
            }`}
          >
            {isSubmitting ? (
              <>
                <Spin />
                Ingresa
              </>
            ) : (
              "Ingresa"
            )}
          </button>
        </div>
      </form>

      {/* Botones para iniciar sesión con redes sociales */}
      <SignSocial />

      <p className="mt-10 text-sm text-center leading-6 text-gray-500 dark:text-gray-400">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/register"
          className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500 dark:hover:text-emerald-400"
        >
          Regístrate ahora
        </Link>
      </p>
    </>
  );
}