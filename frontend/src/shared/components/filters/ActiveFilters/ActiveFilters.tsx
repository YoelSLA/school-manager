import type { LucideIcon } from "lucide-react";
import FilterChip from "@/shared/components/filters/FilterChip";
import styles from "./ActiveFilters.module.scss";

export type ActiveFilter = {
  key: string;
  label: string;
  icon?: LucideIcon;
  onRemove: () => void;
};

type Props = {
  filters: ActiveFilter[];
};

export default function ActiveFilters({
  filters,
}: Props) {
  return (
    <div className={styles.container}>
      {filters.length === 0 ? (
        <span className={styles.empty}>
          Sin filtros activos
        </span>
      ) : (
        filters.map((filter) => {
          const Icon = filter.icon;

          return (
            <FilterChip
              key={filter.key}
              icon={Icon ? <Icon size={14} /> : undefined}
              label={filter.label}
              onRemove={filter.onRemove}
            />
          );
        })
      )}
    </div>
  );
}