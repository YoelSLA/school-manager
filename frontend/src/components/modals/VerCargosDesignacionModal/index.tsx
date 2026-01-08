import { obtenerDesignacionDetalle } from "@/services/designacionesService";
import { DesignacionDetalleDTO } from "@/utils/types/designacion";
import { useEffect, useState } from "react";

import { CrearAsignacionModal } from "@/components/modals/CrearAsignacionModal";
import { CargosSection } from "./CargosSection/index.js";
import { DesignacionHeader } from "./DesignacionHeader.tsx";
import { FranjasHorarias } from "./FranjasHorarias/index.js";
import { ModalFooter } from "./ModalFooter/index.js";
import "./verCargosDesignacionModal.css";

type Props = {
  open: boolean;
  designacion: DesignacionDetalleDTO | null;
  onClose: () => void;
};

export function VerCargosDesignacionModal({
  open,
  designacion,
  onClose,
}: Props) {
  const [crearOpen, setCrearOpen] = useState(false);
  const [actual, setActual] = useState<DesignacionDetalleDTO | null>(
    designacion
  );

  useEffect(() => {
    setActual(designacion);
  }, [designacion]);

  if (!open || !actual) return null;

  const recargar = async () => {
    const data = await obtenerDesignacionDetalle(actual.id);
    setActual(data);
  };

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          <DesignacionHeader designacion={actual} />

          <FranjasHorarias franjas={actual.franjasHorarias} />

          <CargosSection
            asignaciones={actual.asignaciones}
            onNuevo={() => setCrearOpen(true)}
          />

          <ModalFooter onClose={onClose} />
        </div>
      </div>

      <CrearAsignacionModal
        open={crearOpen}
        designacionId={actual.id}
        onClose={() => setCrearOpen(false)}
        onCreated={recargar}
      />
    </>
  );
}
