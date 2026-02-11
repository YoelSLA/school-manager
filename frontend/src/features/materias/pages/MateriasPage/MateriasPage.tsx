import { useState } from "react";
import Button from "@/components/Button";
import SidebarPageLayout from "@/layout/SidebarPageLayout";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import CrearMateriaModal from "../../components/CrearMateriaModal";
import type { CrearMateriaFormOutput } from "../../form/materias.form.types";
import { useCrearMateria } from "../../hooks/useCrearMateria";
import { useMaterias } from "../../hooks/useMaterias";
import MateriasList from "./MateriasList";

export default function MateriasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const { data: materias = [], isLoading } = useMaterias(escuelaActiva?.id);

	const { mutate: crearMateria, isPending } = useCrearMateria(
		escuelaActiva?.id,
	);

	const handleCrearMateriaClick = () => {
		setIsModalOpen(true);
	};

	const handleCrearMateria = (data: CrearMateriaFormOutput) => {
		if (!escuelaActiva) return;

		crearMateria(data, {
			onSuccess: () => {
				setIsModalOpen(false);
			},
		});
	};

	return (
		<>
			<SidebarPageLayout
				sidebar={
					<SidebarSectionLayout
						title="Materias"
						subtitle="Listado de materias de la escuela"
						actions={
							<Button onClick={handleCrearMateriaClick}>+ Nueva materia</Button>
						}
					/>
				}
			>
				<MateriasList materias={materias} isLoading={isLoading} />
			</SidebarPageLayout>

			{isModalOpen && escuelaActiva && (
				<CrearMateriaModal
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleCrearMateria}
					isSubmitting={isPending}
				/>
			)}
		</>
	);
}
