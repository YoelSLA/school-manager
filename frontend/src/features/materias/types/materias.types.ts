export type MateriaResponseDTO = {
	id: number;
	nombre: string;
	abreviatura: string;
	cantidadModulos: number;
};

export type CrearMateriaDTO = {
	nombre: string;
	abreviatura: string;
	cantidadModulos: number;
};

export type MateriaNombreDTO = {
	id: number;
	nombre: string;
};

export type MateriaEditDTO = {
	nombre: string;
	abreviatura: string;
	cantidadModulos: number;
};
