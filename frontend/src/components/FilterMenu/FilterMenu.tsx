import * as Popover from "@radix-ui/react-popover";
import { Filter } from "lucide-react";
import type { ReactNode } from "react";
import Button from "@/shared/components/Button";
import styles from "./FilterMenu.module.scss";

type Props = {
  activeCount?: number;
  children: ReactNode;
};

export default function FilterMenu({
  activeCount = 0,
  children,
}: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className={styles.trigger}>
          <Button
            variant="secondary"
            leftIcon={<Filter size={16} />}
          >
            Filtros
          </Button>

          {activeCount > 0 && (
            <span className={styles.badge}>
              {activeCount}
            </span>
          )}
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className={styles.content}
          side="bottom"
          align="end"
          sideOffset={12}
          collisionPadding={16}
        >
          <header className={styles.header}>
            <h3 className={styles.title}>Filtros</h3>

            <p className={styles.subtitle}>
              Refiná los resultados de la búsqueda.
            </p>
          </header>

          <div className={styles.body}>
            {children}
          </div>

          <Popover.Arrow
            className={styles.arrow}
            width={16}
            height={8}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}