
import ListContainer from "@/components/ListContainer";
import DesignacionAdministrativaRow from "@/features/designaciones/pages/DesignacionesPage/AdministrativasDesignacionesPage/AdministrativasDesignacionesTable/DesignacionAdministrativaRow";
import DesignacionCursoRow from "@/features/designaciones/pages/DesignacionesPage/CursosDesignacionesPage/CursosDesignacionesTable/DesignacionCursoRow/DesignacionCursoRow";
import type { DesignacionAdministrativaRowDTO, DesignacionCursoRowDTO } from "@/shared/types";

type Props =
  | {
    designaciones: DesignacionAdministrativaRowDTO[];
    filtro: "ADMIN";
    isLoading: boolean;
    isError: boolean;
    onVerDetalle: (d: DesignacionAdministrativaRowDTO) => void;
  }
  | {
    designaciones: DesignacionCursoRowDTO[];
    filtro: "CURSO";
    isLoading: boolean;
    isError: boolean;
    onVerDetalle: (d: DesignacionCursoRowDTO) => void;
  };

export default function DesignacionesList(props: Props) {
  if (props.filtro === "ADMIN") {
    return (
      <ListContainer
        isLoading={props.isLoading}
        isError={props.isError}
        items={props.designaciones}
        loadingMessage="Cargando designaciones…"
        emptyMessage="No hay designaciones para el filtro seleccionado."
        errorMessage="No se pudieron cargar las designaciones"
        getKey={(d) => d.id}
        renderItem={(d) => (
          <DesignacionAdministrativaRow
            designacion={d}
            onVerDetalle={props.onVerDetalle}
          />
        )}
      />
    );
  }

  return (
    <ListContainer
      isLoading={props.isLoading}
      isError={props.isError}
      items={props.designaciones}
      loadingMessage="Cargando designaciones…"
      emptyMessage="No hay designaciones para el filtro seleccionado."
      errorMessage="No se pudieron cargar las designaciones"
      getKey={(d) => d.id}
      renderItem={(d) => (
        <DesignacionCursoRow
          designacion={d}
          onVerDetalle={props.onVerDetalle}
        />
      )}
    />
  );
}