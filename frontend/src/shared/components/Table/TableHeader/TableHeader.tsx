import clsx from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./TableHeader.module.scss";

type Props = HTMLAttributes<HTMLDivElement>;

export default function TableHeader({
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      className={clsx(styles.header, className)}
      {...props}
    >
      {children}
    </div>
  );
}