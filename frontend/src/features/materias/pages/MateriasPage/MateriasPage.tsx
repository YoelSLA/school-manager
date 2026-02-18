import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Pagination from "@/layout/Pagination";
import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout/SidebarSectionLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";

import CrearMateriaModal from "../../components/CrearMateriaModal";
import type { CrearMateriaFormOutput } from "../../form/materias.form.types";
import { useCrearMateria } from "../../hooks/useCrearMateria";
import { useMaterias } from "../../hooks/useMaterias";
import MateriasList from "./MateriasList";

export default function MateriasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const [isModalOpen, setIsModalOpen] = useState(false);

	// 🔥 PAGINACION
	const [page, setPage] = useState(0);
	const pageSize = useDynamicPageSize();

	// Reset page si cambia tamaño
	useEffect(() => {
		setPage(0);
	}, []);

	const { data, isLoading } = useMaterias(
		escuelaActiva?.id,
		page,
		pageSize,
	);

	const materias = data?.content ?? [];
	const totalPages = data?.totalPages ?? 0;

	const { mutate: crearMateria, isPending } =
		useCrearMateria(escuelaActiva?.id);

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
							<Button onClick={handleCrearMateriaClick}>
								+ Nueva materia
							</Button>
						}
					/>
				}
				pagination={
					totalPages > 1 ? (
						<Pagination
							page={page}
							totalPages={totalPages}
							onChange={setPage}
						/>
					) : undefined
				}
			>
				<MateriasList
					materias={materias}
					isLoading={isLoading}
				/>
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
