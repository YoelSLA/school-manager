
import type { AsignacionEmpleadoEducativoRowDTO } from "@/features/asignaciones/types/asignaciones.types";
import formatEnumLabel from "@/features/asignaciones/utils/asignacion.utils";
import BadgeEstadoAsignacion from "@/shared/components/BagdeEstadoAsignacion";
import AsignacionRowFooter from "../../AsignacionRowFooter/AsignacionRowFooter";
import AsignacionRowLayout from "../../AsignacionRowLayout";

type Props = {
  asignacion: AsignacionEmpleadoEducativoRowDTO;
};

export default function AsignacionAdministrativaEmpleadoRow({
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