import { getRutas } from '@/utils/dataFetchers';

export default async function RutasPage() {
    const rutas = await getRutas();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Rutas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rutas.map((ruta) => (
                    <div key={ruta.id} className="border rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-semibold">{ruta.nombre}</h2>
                        <p>{ruta.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}