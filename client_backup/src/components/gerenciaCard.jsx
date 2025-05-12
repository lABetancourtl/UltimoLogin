import { useEffect, useState } from 'react';
import { MantenimientoGerenCard } from './MantenimientoGerenCard';


export function GerenciaCard() {
    const [mantenimientos, setMantenimientos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMantenimientos() {
            try {
                const response = await fetch('https://backend-maintcheck-1.onrender.com/tasks/api/v1/mantenimiento/');
                if (!response.ok) {
                    throw new Error('Error al obtener los mantenimientos');
                }
                const data = await response.json();
                setMantenimientos(data);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchMantenimientos();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!mantenimientos.length) {
        return <p>Cargando mantenimientos...</p>;
    }

    return (
        <div>
            {mantenimientos.map((mantenimiento) => (
                <MantenimientoGerenCard key={mantenimiento.id} {...mantenimiento} />
            ))}
        </div>
    );
}