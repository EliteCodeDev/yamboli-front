import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Habilitar la depuración en desarrollo
if (process.env.NODE_ENV === "development") {
  console.log("NextAuth Route - Inicializando handler con opciones configuradas");
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };