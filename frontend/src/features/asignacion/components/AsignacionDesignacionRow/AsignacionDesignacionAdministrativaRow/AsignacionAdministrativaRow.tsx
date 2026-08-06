import type { EmpleadoEducativoAsignacionItemDTO } from "@/features/empleadoEducativo/types";
import { BadgeEstadoAsignacion } from "@/shared/components/badges";
import { formatEnumLabel } from "@/shared/utils";
import type { CargoDesignacionAdministrativaDTO } from "../../../types";
import AsignacionRowFooter from "../../AsignacionRowFooter";
import AsignacionRowLayout from "../../AsignacionRowLayout";

type Props = {
  asignacion: EmpleadoEducativoAsignacionItemDTO & {
    designacion: CargoDesignacionAdministrativaDTO;
  };
};

export default function AsignacionDesignacionAdministrativaRow({
  asignacion,
}: Props) {
  const { designacion, periodo, situacionDeRevista, estadoAsignacion } =
    asignacion;

  return (
    <AsignacionRowLayout
      variant="administrativa"
      title={formatEnumLabel(designacion.rolEducativo)}
      status={<BadgeEstadoAsignacion value={estadoAsignacion} />}
      subtitle={<span>#{designacion.cupof}</span>}
      footer={
        <AsignacionRowFooter
          periodo={periodo}
          situacionDeRevista={situacionDeRevista}
        />
      }
    />
  );
}
