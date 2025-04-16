import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || "";

// Cliente de API configurado
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const isAuthRoute = (url?: string) => {
  return ["/auth/local/register", "/auth/forgot-password", "/auth/reset-password"]
    .some(path => url?.includes(path));
};

// 👉 Interceptor para incluir JWT desde la sesión en cada petición automáticamente
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (!isAuthRoute(config.url) && session?.user?.jwt) {
    config.headers.Authorization = `Bearer ${session.user.jwt}`;
  }

  return config;
});


// 👉 Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.error?.message) {
      return Promise.reject(new Error(error.response.data.error.message));
    }

    if (error.response?.status === 400) {
      return Promise.reject(new Error("Solicitud incorrecta"));
    }

    if (error.response?.status === 401) {
      return Promise.reject(new Error("No autorizado. Verifica tu sesión."));
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject(new Error("Tiempo de espera agotado. Intenta nuevamente."));
    }

    return Promise.reject(new Error("Error inesperado en la conexión con el servidor"));
  }
);

// Tipos para autenticación
interface LoginData {
  identifier: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// 🔐 Login
export const apiLogin = async (data: LoginData) => {
  const response = await apiClient.post(
    "/api/auth/local",
    {
      identifier: data.identifier,
      password: data.password,
    },
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );

  const userData = response.data;

  if (!userData.jwt) {
    throw new Error("No se recibió token de autenticación");
  }

  console.log("✅ Usuario autenticado desde apiLogin:", {
    id: userData.user.id,
    email: userData.user.email,
    jwt: userData.jwt,
  });

  return {
    id: userData.user.id,
    name: userData.user.username || userData.user.email.split("@")[0],
    email: userData.user.email,
    jwt: userData.jwt,
    image: userData.user.avatar?.url ? `${API_URL}${userData.user.avatar.url}` : null,
  };
};


// 📝 Registro
export const apiRegister = async (data: RegisterData) => {
  const response = await apiClient.post("/api/auth/local/register", data);
  const userData = response.data;

  if (!userData.jwt) {
    throw new Error("No se recibió token de autenticación");
  }

  return {
    id: userData.user.id,
    name: userData.user.username,
    email: userData.user.email,
    jwt: userData.jwt,
  };
};

// 🔁 Recuperar contraseña
export const apiForgotPassword = async (email: string) => {
  await apiClient.post("/api/auth/forgot-password", { email });
  return true;
};

// 🔁 Restablecer contraseña
export const apiResetPassword = async (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  await apiClient.post("/api/auth/reset-password", {
    code,
    password,
    passwordConfirmation,
  });
  return true;
};

// ✅ Verificar estado del usuario en Strapi
export const checkUserConfirmation = async (email: string) => {
  const response = await fetch(
    `${API_URL}/api/users?filters[email][$eq]=${encodeURIComponent(email)}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );

  if (!response.ok) return { exists: false };

  const data = await response.json();

  if (data && data.length > 0) {
    const user = data[0];
    return {
      exists: true,
      confirmed: user.confirmed,
      blocked: user.blocked,
    };
  }

  return { exists: false };
};

// ✅ Utilidades generales (sin necesidad de pasar token)
export const apiGet = async (endpoint: string) => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const apiPost = async (endpoint: string, data: any) => {
  const response = await apiClient.post(endpoint, data);
  return response.data;
};

export const apiPut = async (endpoint: string, data: any) => {
  const response = await apiClient.put(endpoint, data);
  return response.data;
};

export const apiDelete = async (endpoint: string) => {
  const response = await apiClient.delete(endpoint);
  return response.data;
};
