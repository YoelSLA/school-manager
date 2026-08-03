import clsx from "clsx";
import type { KeyboardEvent, ReactNode } from "react";
import styles from "./TableRow.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
  onOpen?: () => void;
};

export default function Row({
  children,
  className,
  onOpen,
}: Props) {
  const handleKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen?.();
    }
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: Row with nested interactive actions
    <div
      className={clsx(styles.row, className)}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}