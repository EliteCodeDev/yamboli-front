import { NextResponse } from 'next/server';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

// Define un mapa para los campos que necesitas para cada endpoint
const FIELDS_MAP = {
    sedes: 'id,nombre,descripcion',
    rutas: 'id,nombre,descripcion', // Ejemplo de campos para 'rutas'
    zonas: 'id,nombre,descripcion',   // Ejemplo de campos para 'zonas'
    // Agrega más mappings según tus necesidades
};

export async function GET(request: Request, { params }: { params: { endpoint: string } }) {
    console.log('Request URL:', request.url);
    const endpoint = await params.endpoint;
    console.log('Endpoint Param:', endpoint);

    if (request.url.endsWith(`/api/data/${endpoint}`)) {
        try {
            const fieldsToFetch = FIELDS_MAP[endpoint as keyof typeof FIELDS_MAP] || 'id'; // Obtén los campos del mapa o usa 'id' por defecto
            const strapiUrl = `${STRAPI_API_URL}/api/${endpoint}?fields=${fieldsToFetch}`;
            console.log('Strapi URL:', strapiUrl);
            const res = await fetch(strapiUrl, {
                headers: {
                    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
                },
            });
            const data = await res.json();

            if (!res.ok) {
                console.error(`Error fetching ${endpoint} from Strapi:`, data);
                return NextResponse.json({ error: `Failed to fetch ${endpoint}` }, { status: res.status });
            }

            return NextResponse.json(data.data);
        } catch (error) {
            console.error(`Unexpected error fetching ${endpoint}:`, error);
            return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
        }
    }

    return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 });
}