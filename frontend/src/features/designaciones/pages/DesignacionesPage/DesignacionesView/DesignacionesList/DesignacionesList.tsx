
import ListContainer from "@/app/layouts/ListContainer";
import DesignacionCursoRow from "@/features/designaciones/pages/DesignacionesPage/DesignacionesView/CursosDesignacionesTable/DesignacionCursoRow";
import type {
  DesignacionAdministrativaCardDTO,
  DesignacionCursoCardDTO,
} from "@/shared/types";
import DesignacionAdministrativaCard from "../../../../components/DesignacionAdministrativa/DesignacionAdministrativaCard";

type Props =
  | {
    designaciones: DesignacionAdministrativaCardDTO[];
    filtro: "ADMIN";
    isLoading: boolean;
    isError: boolean;
    onVerDetalle: (d: DesignacionAdministrativaCardDTO) => void;
  }
  | {
    designaciones: DesignacionCursoCardDTO[];
    filtro: "CURSO";
    isLoading: boolean;
    isError: boolean;
    onVerDetalle: (d: DesignacionCursoCardDTO) => void;
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
          <DesignacionAdministrativaCard
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