import ListContainer from "@/components/ListContainer";
import Table from "@/components/Table";
import SectionHeader from "@/components/Table/SectionHeader";
import type { AsignacionLicenciaDTO } from "@/features/asignacion/types";
import DesignacionAdministrativaRow from "../LicenciaDesignacionRow/LicenciaDesignacionAdministrativaRow";
import DesignacionCursoRow from "../LicenciaDesignacionRow/LicenciaDesignacionCursoRow";


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
        <SectionHeader
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
            <DesignacionCursoRow
              asignacion={asignacion}
              checked={checked}
              onToggle={toggle}
            />
          ) : (
            <DesignacionAdministrativaRow
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