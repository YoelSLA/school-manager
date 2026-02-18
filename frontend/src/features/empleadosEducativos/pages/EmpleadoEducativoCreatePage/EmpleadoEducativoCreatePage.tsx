import type { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import PageLayout from "@/layout/PageLayout/PageLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { useCrearEmpleadoEducativo } from "../../hooks/useCrearEmpleadoEducativo";
import { useEmpleadoNavigation } from "../../hooks/useEmpleadoNavigation";
import styles from "./EmpleadoEducativoCreatePage.module.scss";
import type { EmpleadoEducativoCreateOutput } from "../../form/empleadoEducativo.form.types";
import { useEmpleadoEducativoCreateForm } from "../../form/hooks/useEmpleadoEducativoCreateForm";
import EmpleadoEducativoCreateForm from "../../components/EmpleadoEducativoCreateForm";
import { getTodayArgentinaISO } from "@/utils";

export default function EmpleadoEducativoCreatePage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const crearEmpleado = useCrearEmpleadoEducativo();
	const empleadoNav = useEmpleadoNavigation();
	const hoy = getTodayArgentinaISO();
	const [agregarFecha, setAgregarFecha] = useState(false);
	const [usarHoy, setUsarHoy] = useState(false);

	const {
		form: {
			register,
			handleSubmit,
			setValue,
			setError,
			reset,
			formState: { errors, isSubmitting },
		},
	} = useEmpleadoEducativoCreateForm();

	/* =====================
		 TOGGLE AGREGAR FECHA
	===================== */
	const toggleAgregarFecha = () => {
		setAgregarFecha((prev) => {
			const nuevo = !prev;

			if (!nuevo) {
				setValue("fechaDeIngreso", undefined);
				setUsarHoy(false);
			}

			return nuevo;
		});
	};

	/* =====================
		 TOGGLE USAR HOY
	===================== */
	const toggleUsarHoy = () => {
		setUsarHoy((prev) => {
			const nuevo = !prev;
			setValue("fechaDeIngreso", nuevo ? hoy : undefined);
			return nuevo;
		});
	};

	/* =====================
		 SUBMIT
	===================== */
	const onSubmit = async (data: EmpleadoEducativoCreateOutput) => {
		if (!escuelaActiva) {
			toast.error("No hay escuela seleccionada");
			return;
		}

		try {
			await crearEmpleado.mutateAsync({
				escuelaId: escuelaActiva.id,
				data,
			});

			toast.success("Personal educativo creado correctamente");
			empleadoNav.listar();

			// Reset limpio
			reset({
				cuil: "",
				nombre: "",
				apellido: "",
				email: "",
				domicilio: "",
				telefono: "",
				fechaDeNacimiento: "",
				fechaDeIngreso: undefined,
			});

			setAgregarFecha(false);
			setUsarHoy(false);
		} catch (error: unknown) {
			const axiosError = error as AxiosError;

			if (axiosError.response?.status === 409) {
				setError("cuil", {
					type: "manual",
					message: "Ese CUIL ya está registrado",
				});
				toast.error("Ese CUIL ya está registrado");
			} else {
				toast.error("Error al crear el personal educativo");
			}
		}
	};

	return (
		<PageLayout>
			<div className={styles.page}>

				<div className={styles.container}>
					<EmpleadoEducativoCreateForm
						register={register}
						errors={errors}
						isSubmitting={isSubmitting}
						agregarFecha={agregarFecha}
						onToggleAgregarFecha={toggleAgregarFecha}
						usarHoy={usarHoy}
						onToggleUsarHoy={toggleUsarHoy}
						onSubmit={handleSubmit(onSubmit)}
					/>
				</div>

			</div>
		</PageLayout>
	);


}
