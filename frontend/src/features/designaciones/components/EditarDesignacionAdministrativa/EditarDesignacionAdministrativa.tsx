import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import { DesignacionAdministrativaDetalleDTO, DesignacionAdministrativaUpdateDTO } from "@/utils/types";

type Props = {
	designacion: DesignacionAdministrativaDetalleDTO;
	onSubmit: (data: DesignacionAdministrativaUpdateDTO) => Promise<void>;
	isSubmitting: boolean;
};

export default function EditarDesignacionAdministrativa({
	designacion,
	onSubmit,
	isSubmitting,
}: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<DesignacionAdministrativaUpdateDTO>({
		defaultValues: {
			cupof: designacion.cupof,
			rolEducativo: designacion.rolEducativo,
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div style={{ maxWidth: 400 }}>
				{/* CUPOF */}
				<div>
					<label>Cupof</label>
					<input type="number" {...register("cupof")} />
				</div>

				{/* ROL */}
				<div>
					<label>Rol educativo</label>
					<select {...register("rolEducativo")}>
						<option value="DIRECTIVO">Directivo</option>
						<option value="SECRETARIO">Secretario</option>
						<option value="AUXILIAR">Auxiliar</option>
					</select>
				</div>

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Guardando…" : "Guardar cambios"}
				</Button>
			</div>
		</form>
	);
}
