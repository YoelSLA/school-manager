import CupofAdministrativaInputField from "@/components/forms/inputs/CupofAdministrativaInputField";
import RolEducativoSelectField from "@/components/forms/selects/RolEducativoSelectField";
import type {
	DesignacionAdministrativaDetalleDTO,
	DesignacionAdministrativaUpdateDTO,
} from "@/utils/types";
import { useEditarDesignacionAdministrativaForm } from "../../form/hooks/useEditDesignacionAdministrativaForm";
import styles from "../CreateDesignacionAdministrativa/AdministrativaForm/AdministrativaForm.module.scss";
import DesignacionAdministrativaFormLayout from "../CreateDesignacionAdministrativa/DesignacionAdministrativaFormLayout";

type Props = {
	designacion: DesignacionAdministrativaDetalleDTO;
	onSubmit: (data: DesignacionAdministrativaUpdateDTO) => Promise<void>;
	isSubmitting: boolean;
};

export default function UpdateDesignacionAdministrativa({
	designacion,
	onSubmit,
	isSubmitting,
}: Props) {
	const {
		form: {
			register,
			handleSubmit,
			formState: { errors },
		},
		franjas: { fields, append, remove },
	} = useEditarDesignacionAdministrativaForm({
		designacion,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.header}>
				<h1 className={styles.title}>Editar designación</h1>
				<p className={styles.subtitle}>
					Modificá los datos de la designación administrativa
				</p>
			</div>

			<DesignacionAdministrativaFormLayout
				left={
					<div className={styles.left}>
						<CupofAdministrativaInputField
							register={register}
							error={errors.cupof?.message}
						/>

						<RolEducativoSelectField
							register={register}
							error={errors.rolEducativo?.message}
							disabled={isSubmitting}
						/>
					</div>
				}
				fields={fields}
				register={register}
				append={append}
				remove={remove}
				isSubmitting={isSubmitting}
			/>
		</form>
	);
}
