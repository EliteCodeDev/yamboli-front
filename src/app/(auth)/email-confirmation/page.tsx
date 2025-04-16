import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/components/layout/auth";

export const metadata: Metadata = {
  title: "Confirmar Email | Wazend",
  description: "Confirma tu cuenta de Wazend",
};

export default function EmailConfirmationPage() {
  return (
    <Layout>
      <div className="text-center">
        <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          ¡Confirma tu correo electrónico! ✉️
        </h2>
        
        <div className="mt-8">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Hemos enviado un correo electrónico con un enlace de confirmación a tu dirección de correo.
            Por favor, revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Si no recibes el correo en unos minutos, revisa tu carpeta de spam o solicita un nuevo correo de confirmación.
          </p>
          
          <div className="mt-8">
            <Link
              href="/login"
              className="text-emerald-600 hover:text-emerald-500 font-medium"
            >
              Volver a iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}