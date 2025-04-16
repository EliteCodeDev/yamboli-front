"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { apiRegister } from "@/lib/api";
import Spin from "@/components/loaders/Spin";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRegister({ email, username, password });
      toast.success("Cuenta creada con éxito. Inicia sesión.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Error al registrar usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white dark:bg-gray-900 shadow-md rounded-md p-6">
      <h1 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-6">
        Crear cuenta 📝
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
            Nombre de usuario
          </label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-emerald-600 focus:border-emerald-600 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-emerald-600 focus:border-emerald-600 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-emerald-600 focus:border-emerald-600 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium text-sm transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Spin />
              Registrando...
            </div>
          ) : (
            "Crear cuenta"
          )}
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="text-emerald-600 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
