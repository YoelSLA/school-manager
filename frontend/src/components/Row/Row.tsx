import clsx from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./Row.module.scss";

type Props = HTMLAttributes<HTMLDivElement>;

export default function Row({
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      className={clsx(styles.row, className)}
      {...props}
    >
      {children}
    </div>
  );
}