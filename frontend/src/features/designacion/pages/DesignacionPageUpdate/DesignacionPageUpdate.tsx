import { BreadcrumbPageLayout } from "@/app/layouts/pages";
import DesignacionAdministrativaUpdateForm from "../../components/DesignacionPageUpdate/DesignacionAdministrativaFormUpdate";
import DesignacionCursoUpdateForm from "../../components/DesignacionPageUpdate/DesignacionCursoFormUpdate";
import { useDesignacionPageUpdate } from "../../hooks/pages";
import styles from "./DesignacionPageUpdate.module.scss";

export default function DesignacionPageUpdate() {
	const vm = useDesignacionPageUpdate();

	return (
		<BreadcrumbPageLayout>
			<section className={styles.page}>
				<div className={styles.form}>
					{vm.isLoading && <div className={styles.state}>Cargando...</div>}

					{vm.notFound && (
						<div className={styles.state}>No se encontró la designación</div>
					)}

					{vm.designacion?.tipo === "CURSO" && (
						<DesignacionCursoUpdateForm
							designacion={vm.designacion}
							onSubmit={vm.handleEditarCurso}
							isSubmitting={vm.editarCurso.isPending}
						/>
					)}

					{vm.designacion?.tipo === "ADMINISTRATIVA" && (
						<DesignacionAdministrativaUpdateForm
							designacion={vm.designacion}
							onSubmit={vm.handleEditarAdministrativa}
							isSubmitting={vm.editarAdministrativa.isPending}
						/>
					)}
				</div>
			</section>
		</BreadcrumbPageLayout>
	);
}
