import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import Layout from "@/components/layout/auth";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Iniciar sesión | Wazend",
  description: "Ingresa a tu cuenta en Wazend",
};

export default function LoginPage() {
  return (
    <>
      <Toaster position="top-right" />
      <Layout>
        <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          Iniciar sesión 👋
        </h2>

        <div className="mt-8">
          <LoginForm />
        </div>
      </Layout>
    </>
  );
}