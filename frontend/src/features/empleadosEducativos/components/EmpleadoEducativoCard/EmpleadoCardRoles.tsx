import styles from "./EmpleadoCardRoles.module.scss";

type Props = {
	roles: string[];
};

export default function EmpleadoCardRoles({ roles }: Props) {
	return (
		<section className={styles.roles}>
			<span className={styles.roles__title}>Roles</span>

			{roles.length > 0 ? (
				<div className={styles.roles__list}>
					{roles.map((rol) => (
						<span key={rol} className={styles.roles__chip}>
							{rol}
						</span>
					))}
				</div>
			) : (
				<span className={styles.roles__empty}>Sin roles asignados</span>
			)}
		</section>
	);
}
