import { DesignacionAdministrativaResumenDTO } from "@/utils/types/designacion";
import { DesignacionCard } from "../index";
import { AdministrativaExtra } from "./DesignacionAdministrativaExtra";

type Props = {
  designacion: DesignacionAdministrativaResumenDTO;
  onVerDetalle: (designacionId: number) => void;
};

export default function DesignacionAdministrativaCard({
  designacion,
  onVerDetalle,
}: Props) {
  return (
    <DesignacionCard
      cupof={designacion.cupof}
      estaCubierta={designacion.estaCubierta}
      pendientePorLicencia={designacion.pendientePorLicencia}
      tieneAsignacionActiva={designacion.tieneAsignacionActiva}
      franjasCount={designacion.franjasHorarias.length}
      onVerDetalle={() => onVerDetalle(designacion.id)}
    >
      <AdministrativaExtra rolEducativo={designacion.rolEducativo} />
    </DesignacionCard>
  );
}
