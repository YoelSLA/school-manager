import type { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import PageLayout from "@/layout/PageLayout/PageLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";

import EmpleadoEducativoForm from "../../components/EmpleadoEducativoForm/EmpleadoEducativoForm";
import type { EmpleadoEducativoFormOutput } from "../../form/empleadoEducativo.form.types";
import { useEmpleadoEducativoForm } from "../../form/hooks/useEmpleadoEducativoForm";
import { useCrearEmpleadoEducativo } from "../../hooks/useCrearEmpleadoEducativo";

import styles from "./EmpleadoEducativoCreatePage.module.scss";

export default function EquipoEducativoCreatePage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const navigate = useNavigate();
	const crearEmpleado = useCrearEmpleadoEducativo();

	// Fecha actual formateada
	const hoy = new Date().toLocaleDateString("en-CA", {
		timeZone: "America/Argentina/Buenos_Aires",
	});

	// 🔥 Estados limpios
	const [agregarFecha, setAgregarFecha] = useState(false);
	const [usarHoy, setUsarHoy] = useState(false);
	const [cuilExiste, setCuilExiste] = useState(false);

	const {
		form: {
			register,
			handleSubmit,
			setValue,
			setError,
			reset,
			formState: { errors, isSubmitting },
		},
	} = useEmpleadoEducativoForm();

	/* =====================
		 TOGGLE AGREGAR FECHA
	===================== */
	const toggleAgregarFecha = () => {
		setAgregarFecha((prev) => {
			const nuevo = !prev;

			if (!nuevo) {
				// Si se desactiva → limpiar fecha
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
	const onSubmit = async (data: EmpleadoEducativoFormOutput) => {
		if (!escuelaActiva) {
			toast.error("No hay escuela seleccionada");
			return;
		}

		if (cuilExiste) {
			toast.error("Ese CUIL ya está registrado");
			return;
		}

		try {
			await crearEmpleado.mutateAsync({
				escuelaId: escuelaActiva.id,
				data,
			});

			toast.success("Personal educativo creado correctamente");
			navigate("/empleadosEducativos");

			// 🔥 Reset limpio
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
			setCuilExiste(false);
		} catch (error: unknown) {
			const axiosError = error as AxiosError;

			if (axiosError.response?.status === 409) {
				setError("cuil", {
					type: "manual",
					message: "Ese CUIL ya está registrado",
				});
				setCuilExiste(true);
				toast.error("Ese CUIL ya está registrado");
			} else {
				toast.error("Error al crear el personal educativo");
			}
		}
	};

	return (
		<PageLayout>
			<div className={styles.page}>
				<EmpleadoEducativoForm
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
		</PageLayout>
	);
}
