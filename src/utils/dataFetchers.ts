import { Ruta, Sede } from '../types/typeDataFetchers';

export async function getRutas(): Promise<Ruta[]> {
    try {
        const res = await fetch(new URL('/api/data/rutas', process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'));
        if (!res.ok) {
            throw new Error(`Failed to fetch rutas: ${res.status}`);
        }
        const data = await res.json();
        return data as Ruta[];
    } catch (error) {
        console.error('Error fetching rutas:', error);
        return [];
    }
}

export async function getSedes(): Promise<Sede[]> {
    try {
        const res = await fetch(new URL('/api/data/sedes', process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'));
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status}`);
        }
        const data = await res.json();
        return data as Sede[];
    } catch (error) {
        console.error('Error fetching sedes:', error);
        return [];
    }
}