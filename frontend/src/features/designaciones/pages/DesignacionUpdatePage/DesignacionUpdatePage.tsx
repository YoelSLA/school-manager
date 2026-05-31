import Breadcrumbs from "@/app/layouts/Breadcrumbs";
import PageLayout from "@/app/layouts/PageLayout/PageLayout";
import DesignacionAdministrativaUpdate from "../../components/DesignacionAdministrativa/DesignacionAdministrativaUpdate";
import DesignacionCursoUpdate from "../../components/DesignacionCurso/DesignacionCursoUpdate";
import { useDesignacionUpdatePage } from "../../hooks/useDesignacionesUpdatePage";
import styles from "./DesignacionUpdatePage.module.scss";

export default function DesignacionUpdatePage() {
	const vm = useDesignacionUpdatePage();

	return (
		<PageLayout breadcrumbs={<Breadcrumbs />}>
			<section className={styles.page}>
				<div className={styles.form}>
					{vm.isLoading && <div className={styles.state}>Cargando...</div>}

					{vm.notFound && (
						<div className={styles.state}>No se encontró la designación</div>
					)}

					{vm.designacion?.tipo === "CURSO" && (
						<DesignacionCursoUpdate
							designacion={vm.designacion}
							onSubmit={vm.handleEditarCurso}
							isSubmitting={vm.editarCurso.isPending}
						/>
					)}

					{vm.designacion?.tipo === "ADMINISTRATIVA" && (
						<DesignacionAdministrativaUpdate
							designacion={vm.designacion}
							onSubmit={vm.handleEditarAdministrativa}
							isSubmitting={vm.editarAdministrativa.isPending}
						/>
					)}
				</div>
			</section>
		</PageLayout>
	);
}
