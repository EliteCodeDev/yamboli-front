// Tipo para el perfil de usuario
export interface UserProfile {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: {
      url: string;
    };
    bio?: string;
    role: {
      id: number;
      name: string;
      description: string;
    };
    createdAt: string;
    updatedAt: string;
  }
  
  // Tipo para actualizar el perfil de usuario
  export interface UpdateProfileData {
    username?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    password?: string;
    currentPassword?: string;
  }
  
  // Tipo para la respuesta del servidor
  export interface ApiResponse<T> {
    data: T;
    meta?: {
      pagination?: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }