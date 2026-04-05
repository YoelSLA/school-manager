import type { AxiosError } from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	crearEmpleadoEducativoSchema,
	type EmpleadoEducativoCreateDTO,
} from "../../form/schemas/crearEmpleadoEducativo.schema";

import PageLayout from "@/layout/PageLayout/PageLayout";
import Breadcrumbs from "@/layout/Breadcrumbs";

import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";

import { getTodayArgentinaISO } from "@/utils";

import { useCrearEmpleadoEducativo } from "../../hooks/useCrearEmpleadoEducativo";
import { useEmpleadoNavigation } from "../../hooks/useEmpleadoNavigation";

import FormActions from "@/components/FormActions";

import styles from "./EmpleadoEducativoCreatePage.module.scss";
import DatosPersonalesSection from "../../components/EmpleadoEducativoCreateForm/DatosPersonalesSection";
import ContactoSection from "../../components/EmpleadoEducativoCreateForm/ContactoSection";
import IngresoSection from "../../components/EmpleadoEducativoCreateForm/IngresoSection";

export default function EmpleadoEducativoCreatePage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const crearEmpleado = useCrearEmpleadoEducativo();
	const empleadoNav = useEmpleadoNavigation();

	const hoy = getTodayArgentinaISO();

	const [agregarFecha, setAgregarFecha] = useState(false);
	const [usarHoy, setUsarHoy] = useState(false);

	/* =====================
		 FORM DIRECTO (SIN HOOK)
	===================== */

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		reset,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<EmpleadoEducativoCreateDTO>({
		resolver: zodResolver(crearEmpleadoEducativoSchema),
		defaultValues: {
			cuil: "",
			nombre: "",
			apellido: "",
			domicilio: undefined,
			telefono: undefined,
			email: "",
			fechaDeNacimiento: "",
			fechaDeIngreso: undefined, // 💥 CLAVE
		},
		mode: "onSubmit",
		criteriaMode: "all",
		shouldFocusError: true,
	});

	console.log("👀 WATCH:", watch());

	/* =====================
		 DEBUG
	===================== */

	useEffect(() => {
		console.log("🧠 ERRORS EN PAGE:", errors);
	}, [errors]);

	/* =====================
		 TOGGLES
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

	const _onSubmit = async (data: EmpleadoEducativoCreateDTO) => {
		console.log("🔥 onSubmit ejecutado");
		console.log("📦 data:", data);

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

	/* =====================
		 RENDER
	===================== */

	return (
		<PageLayout breadcrumbs={<Breadcrumbs />}>
			<div className={styles.page}>
				<div className={styles.container}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							console.log("🚨 SUBMIT HTML DISPARADO");
							return handleSubmit(
								(data) => {
									console.log("✅ RHF SUBMIT OK", data);
								},
								(errors) => {
									console.log("❌ RHF VALIDATION ERRORS", errors);
								}
							)(e);
						}}
					>
						<div className={styles.grid}>
							<div className={styles.datos}>
								<DatosPersonalesSection
									register={register}
									errors={errors}
								/>
							</div>

							<div className={styles.rightColumn}>
								<ContactoSection
									register={register}
									errors={errors}
								/>

								<IngresoSection
									register={register}
									errors={errors}
									agregarFecha={agregarFecha}
									onToggleAgregarFecha={toggleAgregarFecha}
									usarHoy={usarHoy}
									onToggleUsarHoy={toggleUsarHoy}
								/>
							</div>

							<div className={styles.actions}>
								<FormActions
									isSubmitting={isSubmitting}
									label="Guardar"
									align="right"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</PageLayout>
	);
}