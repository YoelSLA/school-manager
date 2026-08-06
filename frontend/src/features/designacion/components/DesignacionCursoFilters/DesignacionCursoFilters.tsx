import {
  CheckCircle,
  Trash2,
} from "lucide-react";
import { useListarCursosSelect } from "@/features/curso/hooks";
import type { CursoFiltersState } from "@/features/curso/types";
import { useListMateriasSelect } from "@/features/materia/hooks";
import { Button } from "@/shared/components";
import SelectField from "@/shared/components/form/FieldSelect";
import SelectCurso from "../SelectCurso";
import SelectMateria from "../SelectMateria";
import styles from "./DesignacionCursoFilters.module.scss";

type Props = {
  escuelaId?: number;
  filters: CursoFiltersState;
  updateParams: (params: Record<string, string | undefined>) => void;
};

export default function DesignacionCursoFilters({
  escuelaId,
  filters,
  updateParams,
}: Props) {
  const { data: cursos = [] } = useListarCursosSelect(escuelaId);
  const { data: materias = [] } = useListMateriasSelect(escuelaId);

  const updateFilter = (
    key: keyof CursoFiltersState,
    value?: string,
  ) => {
    updateParams({
      [key]: value,
      page: "0",
    });
  };

  const hasFilters =
    !!filters.materiaId ||
    !!filters.cursoId ||
    // !!filters.cargo ||
    !!filters.estado;

  return (
    <div className={styles.filtersRow}>
      <div className={styles.filters}>
        <SelectMateria
          materias={materias}
          value={filters.materiaId}
          onChange={(e) =>
            updateFilter("materiaId", e.target.value || undefined)
          }
          isLoading={!materias.length}
        />

        <SelectCurso
          cursos={cursos}
          value={filters.cursoId}
          onChange={(e) =>
            updateFilter("cursoId", e.target.value || undefined)
          }
          isLoading={!cursos.length}
        />

        {/* <SelectField
          icon={<Briefcase size={14} />}
          value={filters.cargo}
          onChange={(v) => updateFilter("cargo", v || undefined)}
          onClear={() => updateFilter("cargo", undefined)}
        >
          <option value="">Todos los cargos</option>
          <option value="TITULAR">Titular</option>
          <option value="PROVISIONAL">Provisional</option>
          <option value="SUPLENTE">Suplente</option>
        </SelectField> */}

        <SelectField
          icon={<CheckCircle size={14} />}
          value={filters.estado}
          onChange={(v) => updateFilter("estado", v || undefined)}
          onClear={() => updateFilter("estado", undefined)}
        >
          <option value="">Todos los estados</option>
          <option value="VACANTE">Vacante</option>
          <option value="CUBIERTA">Cubierta</option>
        </SelectField>
      </div>

      {hasFilters && (
        <div className={styles.actions}>
          <Button
            variant="ghost"
            leftIcon={<Trash2 size={16} />}
            onClick={() =>
              updateParams({
                materiaId: undefined,
                cursoId: undefined,
                cargo: undefined,
                estado: undefined,
                page: "0",
              })
            }
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}