import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Credenciales incompletas");
          return null;
        }

        try {
          console.log("Intentando autorizar directamente con Strapi:", credentials.email);
          
          // Hacemos la llamada directamente a Strapi en lugar de usar nuestra función apiLogin
          const response = await axios.post(`${API_URL}/api/auth/local`, {
            identifier: credentials.email,
            password: credentials.password
          });
          
          console.log("Respuesta de autenticación exitosa:", response.status);
          
          const userData = response.data;
          
          if (!userData.jwt) {
            console.error("No se recibió token JWT de Strapi");
            return null;
          }
          
          // Construir el objeto de usuario que NextAuth espera
          const user = {
            id: userData.user.id,
            name: userData.user.username || userData.user.email.split('@')[0],
            email: userData.user.email,
            jwt: userData.jwt,
            image: userData.user.avatar?.url ? `${API_URL}${userData.user.avatar.url}` : null,
          };
          
          console.log("Usuario autenticado correctamente:", user.email);
          return user;
        } catch (error: any) {
          // Log detallado para diagnosticar el problema
          console.error("Error en autorización:", error.message);
          
          if (error.response) {
            console.error("Detalles de error de API:", {
              status: error.response.status,
              statusText: error.response.statusText,
              data: error.response.data
            });
          }
          
          // En lugar de lanzar un error, retornamos null para que NextAuth maneje el error correctamente
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Si tenemos un usuario, estamos en el primer inicio de sesión
      if (account && user) {
        // Para los proveedores de OAuth
        if (account.provider === "google" || account.provider === "github") {
          token.provider = account.provider;
          token.accessToken = account.access_token;
        }
        
        // Para credenciales (Strapi)
        if (account.provider === "credentials") {
          token.jwt = (user as any).jwt;
          token.id = (user as any).id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.jwt = token.jwt as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: process.env.NEXTAUTH_SECRET || "tu_secreto_seguro_para_nextauth",
};