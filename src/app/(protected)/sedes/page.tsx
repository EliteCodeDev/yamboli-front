import { getSedes } from '@/utils/dataFetchers';

export default async function SedesPage() {
    const sedes = await getSedes();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Sedes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sedes.map((sede) => (
                    <div key={sede.id} className="border rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-semibold">{sede.nombre}</h2>
                        <p>{sede.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}