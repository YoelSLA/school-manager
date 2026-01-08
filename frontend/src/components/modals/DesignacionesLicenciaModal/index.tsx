import { AsignacionDetalleDTO } from "@/utils/types/asignacion";
import "./DesignacionesLicenciaModal.css";

type Props = {
  open: boolean;
  empleadoId: number;
  asignaciones: AsignacionDetalleDTO[];
  onClose: () => void;
  onCubrir: (asignacionId: number) => void;
};

export function DesignacionesLicenciaModal({
  open,
  empleadoId,
  asignaciones,
  onClose,
  onCubrir,
}: Props) {
  if (!open) return null;

  return (
    <div></div>
    // <div className="modal-overlay" onClick={onClose}>
    //   <div className="modal" onClick={(e) => e.stopPropagation()}>
    //     {/* HEADER */}
    //     <div className="modal-header">
    //       <h2>{icons.list} Asignaciones activas</h2>
    //       <button className="btn-close" onClick={onClose}>
    //         ✕
    //       </button>
    //     </div>

    //     {/* BODY */}
    //     <div className="modal-body">
    //       {asignaciones.length === 0 && (
    //         <p className="empty">No hay asignaciones activas.</p>
    //       )}

    //       {asignaciones.map((a) => {
    //         const d = a.designacion;

    //         return (
    //           <div key={a.id} className="designacion-row">
    //             {/* IZQUIERDA */}
    //             <div className="left">
    //               {"cupof" in d && <div className="cupof">#{d.cupof}</div>}

    //               <div className="info">
    //                 {/* DESCRIPCIÓN SEGÚN TIPO */}
    //                 {d.tipo === "ADMINISTRATIVA" && (
    //                   <span className="descripcion">{d.cargo}</span>
    //                 )}

    //                 {d.tipo === "CURSO" && (
    //                   <span className="descripcion">
    //                     {d.materia} – {d.curso}
    //                   </span>
    //                 )}

    //                 <span
    //                   className={`situacion ${
    //                     a.disponible ? "disponible" : "ocupada"
    //                   }`}
    //                 >
    //                   {icons.briefcase}
    //                   {a.disponible ? "Disponible" : "Ocupada"}
    //                 </span>
    //               </div>
    //             </div>

    //             {/* DERECHA */}
    //             <div className="right">
    //               <span
    //                 className={`estado ${a.disponible ? "pendiente" : "ok"}`}
    //               >
    //                 {a.disponible ? "Sin cubrir" : "Cubierta"}
    //               </span>

    //               {a.disponible && (
    //                 <button
    //                   className="btn-cover"
    //                   onClick={() => onCubrir(a.id)}
    //                 >
    //                   {icons.users}
    //                   Cubrir
    //                 </button>
    //               )}
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>

    //     {/* FOOTER */}
    //     <div className="modal-footer">
    //       <button className="btn-secondary" onClick={onClose}>
    //         Cerrar
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
