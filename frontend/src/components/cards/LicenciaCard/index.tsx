import { LicenciaDetalleDTO } from "@/utils/types/licencia";
import { useState } from "react";
import "./licenciaCard.css";

type Props = {
  licencia: LicenciaDetalleDTO;
  onVerDesignaciones?: (licenciaId: number) => void;
};

export function LicenciaCard({ licencia, onVerDesignaciones }: Props) {
  const [mostrarTipo, setMostrarTipo] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const estadoLicencia = licencia.aplicaHoy ? "activa" : "finalizada";

  return (
    <div></div>
    // <div className={`flip-card ${flipped ? "flipped" : ""}`}>
    //   <div className="flip-inner">
    //     {/* =====================
    //         FRENTE (CLICK = FLIP)
    //     ===================== */}
    //     <div
    //       className={`flip-front licencia-card ${estadoLicencia}`}
    //       onClick={() => setFlipped(true)}
    //     >
    //       {/* TOP */}
    //       <div className="section-top">
    //         <div className="top-left"></div>
    //         <div className="licencia-tipo-pill" title="Tipo de licencia">
    //           <span className="codigo">{licencia.codigo}</span>
    //         </div>
    //         <div className={`estado ${estadoLicencia}`}>
    //           {estadoLicencia === "activa" && icons.play}
    //           {estadoLicencia === "finalizada" && icons.check}
    //           {estadoLicencia === "activa" && "Activa"}
    //           {estadoLicencia === "finalizada" && "Finalizada"}
    //         </div>
    //       </div>

    //       {mostrarTipo && (
    //         <div
    //           className="licencia-tipo-popover"
    //           onClick={(e) => e.stopPropagation()}
    //         >
    //           <strong>{licencia.articulo}</strong>
    //           <p>{licencia.descripcion}</p>
    //         </div>
    //       )}

    //       <div className="divider" />

    //       {/* PERSONA */}
    //       <div className="section-persona">
    //         <span className="persona-line">
    //           <span
    //             className={`situacion ${licencia.situacionDeRevista?.toLowerCase()}`}
    //           >
    //             {icons.briefcase}
    //             {licencia.situacionDeRevista}
    //           </span>

    //           <span className="persona">
    //             {licencia.empleado.nombre}, {licencia.empleado.apellido}
    //           </span>
    //         </span>
    //       </div>

    //       <div className="divider" />

    //       {/* FECHAS */}
    //       <div className="section-fechas">
    //         <div className="fechas">
    //           {icons.calendar}
    //           {licencia.fechaDesde} ➡️ {licencia.fechaHasta}
    //         </div>

    //         {licencia.activa && (
    //           <div className="restante">
    //             {icons.hourglass}
    //             Faltan {diasRestantes(licencia.fechaHasta)} días
    //           </div>
    //         )}
    //       </div>

    //       <div className="divider" />

    //       {/* FOOTER */}
    //       <div className="section-footer">
    //         <div className={`cobertura ${licencia.cubierta ? "ok" : "alerta"}`}>
    //           {licencia.cubierta ? icons.userCheck : icons.alert}
    //           {licencia.cubierta ? "Cargo cubierto" : "Sin cubrir"}
    //         </div>

    //         <div className="footer-actions">
    //           <button
    //             className="btn-secondary"
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               onVerDesignaciones?.(licencia.id);
    //             }}
    //           >
    //             {icons.list}
    //             Ver designaciones
    //           </button>

    //           {!licencia.cubierta && licencia.activa && (
    //             <button
    //               className="btn-cover"
    //               onClick={(e) => {
    //                 e.stopPropagation();
    //                 // acción cubrir
    //               }}
    //             >
    //               {icons.users}
    //               Cubrir
    //             </button>
    //           )}
    //         </div>
    //       </div>
    //     </div>

    //     {/* =====================
    //         DORSO (CLICK = VOLVER)
    //     ===================== */}
    //     <div
    //       className="flip-back licencia-card"
    //       onClick={() => setFlipped(false)}
    //     >
    //       <div className="licencia-detalle">
    //         <div className="licencia-detalle-header">
    //           <span className="licencia-codigo">{licencia.codigo}</span>
    //         </div>

    //         <div className="licencia-detalle-body">
    //           <p className="licencia-descripcion">{licencia.descripcion}</p>

    //           <span className="licencia-articulo">{licencia.articulo}</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
