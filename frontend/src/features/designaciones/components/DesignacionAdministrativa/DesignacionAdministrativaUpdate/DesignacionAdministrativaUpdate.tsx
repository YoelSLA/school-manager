import CupofAdministrativaInputField from "@/features/designaciones/components/fields/CupofAdministrativaInputField";
import RolEducativoSelectField from "@/features/designaciones/components/fields/RolEducativoSelectField";
import { useUpdateDesignacionAdministrativaForm } from "@/features/designaciones/form/hooks/useUpdateDesignacionAdministrativaForm";
import type {
	DesignacionAdministrativaDetalleDTO,
	DesignacionAdministrativaUpdateDTO,
} from "@/shared/utils/types";
import DesignacionAdministrativaFormLayout from "../DesignacionAdministrativaCreate/DesignacionAdministrativaFormLayout";
import styles from "../DesignacionAdministrativaForm/DesignacionAdministrativaForm.module.scss";

type Props = {
	designacion: DesignacionAdministrativaDetalleDTO;
	onSubmit: (data: DesignacionAdministrativaUpdateDTO) => Promise<void>;
	isSubmitting: boolean;
};

export default function DesignacionAdministrativaUpdate({
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
	} = useUpdateDesignacionAdministrativaForm({
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
