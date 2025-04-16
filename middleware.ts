import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  
  // Rutas de autenticación (login, registro, etc.)
  const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/email-confirmation"];
  
  // Comprobar si la ruta actual es una ruta de autenticación
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // Obtener token de sesión
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // Si el usuario está autenticado y está intentando acceder a una ruta de autenticación,
  // redirigirlo al dashboard
  if (token && isAuthRoute) {
    return NextResponse.redirect(`${origin}/`);
  }
  
  // Si el usuario NO está autenticado y está intentando acceder a una ruta protegida,
  // redirigirlo al login
  if (!token && !isAuthRoute && !pathname.startsWith("/api")) {
    // Guardar la URL original para redirigir después del login
    const url = new URL(`${origin}/login`);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configuración para especificar en qué rutas se ejecutará el middleware
export const config = {
  // Se aplicará a todas las rutas excepto a los archivos estáticos y las API routes que no sean de auth
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};