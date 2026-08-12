import type { AsignacionLicenciaDTO } from "@/features/asignacion/types";
import { ListContainer } from "@/shared/components";
import Table, { TableSectionHeader } from "@/shared/components/Table";
import { LicenciaDesignacionAdministrativaRow, LicenciaDesignacionCursoRow } from "./LicenciaDesignacionRow";


type Props = {
  asignaciones: AsignacionLicenciaDTO[];
  loading: boolean;
  value: number[];
  onChange: (ids: number[]) => void;
  error?: string;
};

export default function AsignacionesSelector({
  asignaciones,
  loading,
  value,
  onChange,
}: Props) {
  const toggle = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
      return;
    }

    onChange([...value, id]);
  };

  return (
    <Table
      header={
        <TableSectionHeader
          title="Asignaciones"
          subtitle="Seleccioná los cargos que cubrirá la licencia."
          badge={asignaciones.length}
        />
      }
    >
      <ListContainer
        isLoading={loading}
        isError={false}
        items={asignaciones}
        loadingMessage="Cargando cargos..."
        emptyMessage="No hay cargos activos."
        getKey={(asignacion) => asignacion.id}
        renderItem={(asignacion) => {
          const checked = value.includes(asignacion.id);

          return asignacion.tipo === "CURSO" ? (
            <LicenciaDesignacionCursoRow
              asignacion={asignacion}
              checked={checked}
              onToggle={toggle}
            />
          ) : (
            <LicenciaDesignacionAdministrativaRow
              asignacion={asignacion}
              checked={checked}
              onToggle={toggle}
            />
          );
        }}
      />
    </Table>
  );
}