import { DesignacionCursoResumenDTO } from "@/utils/types/designacion";
import { DesignacionCard } from "../index";
import { CursoExtra } from "./DesignacionCursoExtra";

type Props = {
  designacion: DesignacionCursoResumenDTO;
  onVerDetalle: (designacionId: number) => void;
};

export function DesignacionCursoCard({ designacion, onVerDetalle }: Props) {
  return (
    <DesignacionCard
      cupof={designacion.cupof}
      estaCubierta={designacion.estaCubierta}
      pendientePorLicencia={designacion.pendientePorLicencia}
      tieneAsignacionActiva={designacion.tieneAsignacionActiva}
      franjasCount={designacion.franjasHorarias.length}
      onVerDetalle={() => onVerDetalle(designacion.id)}
    >
      <CursoExtra
        materia={designacion.materia}
        curso={designacion.curso}
        orientacion={designacion.orientacion}
      />
    </DesignacionCard>
  );
}
