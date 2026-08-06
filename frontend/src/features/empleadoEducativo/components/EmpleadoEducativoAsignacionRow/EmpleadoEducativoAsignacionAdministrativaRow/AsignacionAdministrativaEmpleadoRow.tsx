
import type { AsignacionEmpleadoEducativoRowDTO } from "@/features/asignacion/types";
import BadgeEstadoAsignacion from "@/shared/components/badges/BagdeEstadoAsignacion";
import { formatEnumLabel } from "@/shared/utils";
import AsignacionRowFooter from "../../../../asignacion/components/AsignacionRowFooter/AsignacionRowFooter";
import AsignacionRowLayout from "../../../../asignacion/components/AsignacionRowLayout";

type Props = {
  asignacion: AsignacionEmpleadoEducativoRowDTO;
};

export default function EmpleadoEducativoAsignacionAdministrativaRow({
  asignacion,
}: Props) {
  const { periodo, situacionDeRevista, estadoAsignacion, designacion } =
    asignacion;

  return (
    <AsignacionRowLayout
      variant="administrativa"
      title={formatEnumLabel(designacion.rolEducativo)}
      status={<BadgeEstadoAsignacion value={estadoAsignacion} />}
      subtitle={
        <>
          <span>{formatEnumLabel(designacion.rolEducativo)}</span>

          <span>·</span>

          <span>#{designacion.cupof}</span>
        </>
      }
      footer={
        <AsignacionRowFooter
          periodo={periodo}
          situacionDeRevista={situacionDeRevista}
        />
      }
    />
  );
}