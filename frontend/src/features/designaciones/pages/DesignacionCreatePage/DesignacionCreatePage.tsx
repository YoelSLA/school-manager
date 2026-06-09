import Breadcrumbs from "@/app/layouts/Breadcrumbs";
import PageLayout from "@/app/layouts/PageLayout/PageLayout";
import ErrorModal from "@/components/ModalError";
import DesignacionAdministrativaForm from "../../components/DesignacionAdministrativa/DesignacionAdministrativaCreateForm";
import DesignacionCursoForm from "../../components/DesignacionCurso/DesignacionCursoCreateForm";
import { useDesignacionCreatePage } from "../../hooks/pages/useDesignacionCreatePage";
import styles from "./DesignacionCreatePage.module.scss";
import DesignacionTabs from "./DesignacionTabs/DesignacionTabs";

export default function DesignacionCreatePage() {
	const vm = useDesignacionCreatePage();

	return (
		<PageLayout breadcrumbs={<Breadcrumbs />}>
			<section className={styles.page}>
				<div className={styles.tabs}>
					<DesignacionTabs value={vm.tipo} onChange={vm.setTipo} />
				</div>

				<div className={styles.form}>
					{vm.isCurso ? (
						<DesignacionCursoForm
							onSubmit={vm.handleCrearCurso}
							isSubmitting={vm.crearCurso.isPending}
						/>
					) : (
						<DesignacionAdministrativaForm
							onSubmit={vm.handleCrearAdministrativa}
							isSubmitting={vm.crearAdministrativa.isPending}
						/>
					)}
				</div>
			</section>

			{vm.errorModal && (
				<ErrorModal error={vm.errorModal} onClose={vm.closeErrorModal} />
			)}
		</PageLayout>
	);
}
