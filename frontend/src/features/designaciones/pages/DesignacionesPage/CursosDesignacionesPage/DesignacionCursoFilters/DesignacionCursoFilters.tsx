import {
  BookOpen,
  CheckCircle,
  GraduationCap,
  Trash2,
} from "lucide-react";
import Button from "@/components/Button";
import SelectField from "@/components/SelectField";
import { useListarCursosSelect } from "@/features/cursos/hooks/useListarCursosSelect";
import { useListMateriasSelect } from "@/features/materias/hooks/useListMateriasSelect";
import type { CursoFiltersState } from "@/shared/types";
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
        <SelectField
          icon={<BookOpen size={14} />}
          value={filters.materiaId}
          onChange={(v) => updateFilter("materiaId", v || undefined)}
          onClear={() => updateFilter("materiaId", undefined)}
        >
          <option value="">Todas las materias</option>

          {materias.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre}
            </option>
          ))}
        </SelectField>

        <SelectField
          icon={<GraduationCap size={14} />}
          value={filters.cursoId}
          onChange={(v) => updateFilter("cursoId", v || undefined)}
          onClear={() => updateFilter("cursoId", undefined)}
        >
          <option value="">Todos los cursos</option>

          {cursos.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </SelectField>

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