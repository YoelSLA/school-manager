import styles from "./PageHeader.module.scss";

type Props = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>{title}</h1>
      {subtitle && (
        <p className={styles.header__subtitle}>{subtitle}</p>
      )}
    </header>
  );
}
