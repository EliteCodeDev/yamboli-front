import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiLogin } from "@/lib/api";

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔐 Entrando a authorize() con:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.warn("⚠️ Credenciales incompletas");
          return null;
        }

        try {
          const user = await apiLogin({
            identifier: credentials.email,
            password: credentials.password,
          });

          console.log("✅ Usuario recibido desde apiLogin:", user);

          // Validación explícita
          if (!user?.id || !user?.email || !user?.jwt) {
            console.error("❌ Usuario inválido recibido:", user);
            return null;
          }

          return user;
        } catch (err: any) {
          console.error("❌ Error durante authorize:", err.message || err);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("🧩 Inyectando datos en JWT desde user");
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.jwt = user.jwt;
      }
      return token;
    },

    async session({ session, token }) {
      console.log("🎟 Construyendo sesión desde token:", token);
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.jwt = token.jwt as string;
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },

  secret: process.env.NEXTAUTH_SECRET || "super-secreto-en-.env",
};
