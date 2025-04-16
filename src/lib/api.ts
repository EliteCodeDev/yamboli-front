import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || "";

// Cliente de API configurado
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tipo para la autenticación
interface LoginData {
  identifier: string;
  password: string;
}

// Tipo para el registro
interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Función para iniciar sesión (corregida)
export const apiLogin = async (data: LoginData) => {
  try {
    console.log("Intentando login con:", data.identifier);
    
    // Usar endpoint correcto de Strapi
    const response = await apiClient.post("/api/auth/local", {
      identifier: data.identifier,
      password: data.password
    });
    
    console.log("Respuesta de login exitosa:", response.status);
    
    const userData = response.data;
    
    if (!userData.jwt) {
      throw new Error("No se recibió token de autenticación");
    }

    return {
      id: userData.user.id,
      name: userData.user.username || userData.user.email.split('@')[0],
      email: userData.user.email,
      jwt: userData.jwt,
      image: userData.user.avatar?.url ? `${API_URL}${userData.user.avatar.url}` : null,
    };
  } catch (error: any) {
    // Log detallado del error para depuración
    console.error("Error en apiLogin:", error);
    
    if (error.response) {
      console.error("Detalles de error de API:", {
        status: error.response.status,
        data: error.response.data
      });
      
      // Errores específicos basados en los códigos de estado
      if (error.response.status === 400) {
        throw new Error("Credenciales inválidas");
      } else if (error.response.status === 401) {
        throw new Error("No autorizado. Verifica tus credenciales.");
      } else if (error.response.data?.error?.message) {
        throw new Error(error.response.data.error.message);
      }
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error("Tiempo de espera agotado. Intenta nuevamente.");
    }
    
    throw new Error("Error de conexión con el servidor.");
  }
};

// Función para registrar un usuario
export const apiRegister = async (data: RegisterData) => {
  try {
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
  } catch (error: any) {
    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error("Error al registrar usuario");
  }
};

// Función para recuperar contraseña
export const apiForgotPassword = async (email: string) => {
  try {
    await apiClient.post("/api/auth/forgot-password", { email });
    return true;
  } catch (error: any) {
    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error("Error al solicitar cambio de contraseña");
  }
};

// Función para restablecer contraseña
export const apiResetPassword = async (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  try {
    await apiClient.post("/api/auth/reset-password", {
      code,
      password,
      passwordConfirmation,
    });
    return true;
  } catch (error: any) {
    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error("Error al restablecer contraseña");
  }
};

// Verificar el estado de confirmación del usuario
export const checkUserConfirmation = async (email: string) => {
  try {
    console.log("Verificando usuario:", email);
    
    // Usamos el token de API para la autorización
    const response = await fetch(
      `${API_URL}/api/users?filters[email][$eq]=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );
    
    if (!response.ok) {
      console.error("Error al verificar usuario:", response.status, response.statusText);
      return { exists: false };
    }
    
    const data = await response.json();
    console.log("Datos de usuario recibidos:", data);
    
    // La API de Strapi devuelve un array aunque solo haya un resultado
    if (data && data.length > 0) {
      const user = data[0];
      return { 
        exists: true, 
        confirmed: user.confirmed,
        blocked: user.blocked
      };
    } else {
      return { exists: false };
    }
  } catch (error) {
    console.error('Error al verificar el usuario:', error);
    return { exists: false };
  }
};

// Función para hacer un GET a la API con autenticación
export const apiGet = async (endpoint: string, token: string) => {
  try {
    const response = await apiClient.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error(`Error al obtener datos de ${endpoint}`);
  }
};

// Función para hacer un POST a la API con autenticación
export const apiPost = async (endpoint: string, data: any, token: string) => {
  try {
    const response = await apiClient.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error(`Error al enviar datos a ${endpoint}`);
  }
};

// Función para hacer un PUT a la API con autenticación
export const apiPut = async (endpoint: string, data: any, token: string) => {
  try {
    const response = await apiClient.put(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error(`Error al actualizar datos en ${endpoint}`);
  }
};

// Función para hacer un DELETE a la API con autenticación
export const apiDelete = async (endpoint: string, token: string) => {
  try {
    const response = await apiClient.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error?.message) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error(`Error al eliminar datos de ${endpoint}`);
  }
};