import '../App.css';
import { useState, useEffect } from 'react';

export function MantenimientoGerenCard({ 
    id, 
    nombre, 
    descripcion, 
    fecha_inicio, 
    fecha_fin, 
    estado, 
    responsable, 
    actividades = [], 
    observaciones = [] 
}) {
    const [nuevaObservacionMantenimiento, setNuevaObservacionMantenimiento] = useState('');
    const [observacionesActividades, setObservacionesActividades] = useState({});
    const [observacionesMantenimiento, setObservacionesMantenimiento] = useState(observaciones);
    const [editandoObservacion, setEditandoObservacion] = useState(null);
    const [editandoObservacionActividad, setEditandoObservacionActividad] = useState({ actividadId: null, observacionId: null });
    const [textoEditable, setTextoEditable] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [actividadExpandida, setActividadExpandida] = useState(null);
    const [mantenimientoExpandido, setMantenimientoExpandido] = useState(false);
    const [actividadesState, setActividadesState] = useState(actividades);

    useEffect(() => {
        const interval = setInterval(() => {
            const hayActividadesEnProgreso = actividadesState.some(
                act => act.fecha_inicio && !act.fecha_fin
            );

            if (hayActividadesEnProgreso) {
                setActividadesState(prev => [...prev]);
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [actividadesState]);



    const toggleActividadExpandida = (id) => {
        setActividadExpandida(prevId => (prevId === id ? null : id));
    };

    const toggleMantenimientoExpandido = () => {
        setMantenimientoExpandido(prevState => !prevState);
    };
    

    const renderActividades = () => {
        if (!actividades || !Array.isArray(actividades)) {
            return <p>No hay actividades disponibles</p>;
        }

        return actividades.map((actividad) => {
            const estaExpandida = actividadExpandida === actividad.id;

            return (
                <li key={actividad.id} className="actividad-item">
                    <div className="actividad-header" onClick={() => toggleActividadExpandida(actividad.id)}>
                        <strong>{actividad.nombre}</strong>
                        <span style={{ float: 'right' }}>{estaExpandida ? '▲' : '▼'}</span>
                    </div>

                    {estaExpandida && (
                        <div className="actividad-detalles">
                            <p>Descripción: {actividad.descripcion}</p>
                            <p>Fecha de inicio: {actividad.fecha_inicio ? new Date(actividad.fecha_inicio).toLocaleString() : "No registrada"}</p>
                            <p>Fecha de fin: {actividad.fecha_fin ? new Date(actividad.fecha_fin).toLocaleString() : "No registrada"}</p>
                           
                            <h4>Observaciones:</h4>
                            <ul>
                                {actividad.observaciones?.map((obs) => (
                                    <li key={obs.id}>
                                        {editandoObservacionActividad.actividadId === actividad.id && editandoObservacionActividad.observacionId === obs.id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={textoEditable}
                                                    onChange={(e) => setTextoEditable(e.target.value)}
                                                />
                                                
                                            
                                            </>
                                        ) : (
                                            <>
                                                {obs.texto}
                                                
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            
                           
                        </div>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="mantenimiento-card">
        <h2>
            <span onClick={toggleMantenimientoExpandido} style={{ cursor: 'pointer' }}>
                {nombre} {mantenimientoExpandido ? '▲' : '▼'}
            </span>
        </h2>
        {mantenimientoExpandido && (
            <>
                <p><strong>Descripción:</strong> {descripcion}</p>
                <p><strong>Estado:</strong> {estado}</p>
                <p><strong>Responsable:</strong> {responsable}</p>
                <p><strong>Fecha de inicio:</strong> {fecha_inicio ? new Date(fecha_inicio).toLocaleString() : "No registrada"}</p>
                <p><strong>Fecha de fin:</strong> {fecha_fin ? new Date(fecha_fin).toLocaleString() : "No registrada"}</p>
    
                
                
    
                <h3>Observaciones del mantenimiento:</h3>
               
    
               
               
            </>
        )}
    
        <h3>Actividades:</h3>
        <ul className="actividades-list">
            {renderActividades()}
        </ul>

        <div>
    <h2>Progreso en tiempo real</h2>
    <div className="progreso-actividades">
        {actividades.map((actividad) => {
            let estado = "No iniciada";
            let duracion = "";
            let contador = "";

            if (actividad.fecha_inicio) {
                const inicio = new Date(actividad.fecha_inicio);
                
                if (actividad.fecha_fin) {
                    // Actividad finalizada - mostrar duración total
                    const fin = new Date(actividad.fecha_fin);
                    const diffMs = fin - inicio;
                    const minutos = Math.floor(diffMs / 60000);
                    const horas = Math.floor(minutos / 60);
                    const minsRestantes = minutos % 60;
                    
                    duracion = `Duración total: ${horas > 0 ? `${horas}h ` : ''}${minsRestantes}m`;
                    estado = "Finalizada";
                } else {
                    // Actividad en progreso - mostrar contador en tiempo real
                    const ahora = new Date();
                    const diffMs = ahora - inicio;
                    const minutos = Math.floor(diffMs / 60000);
                    const horas = Math.floor(minutos / 60);
                    const minsRestantes = minutos % 60;
                    
                    contador = `Tiempo transcurrido: ${horas > 0 ? `${horas}h ` : ''}${minsRestantes}m`;
                    estado = "En progreso";
                }
            }

            return (
                <div key={actividad.id} className="actividad-progreso">
                    <h4>{actividad.nombre}</h4>
                    <p><strong>Estado:</strong> {estado}</p>
                    
                    {estado === "En progreso" && contador && (
                        <p className="contador-tiempo">{contador}</p>
                    )}
                    
                    {estado === "Finalizada" && duracion && (
                        <p className="duracion-final">{duracion}</p>
                    )}
                
                </div>
            );
        })}
    </div>
</div>
    </div>
    
    );
}