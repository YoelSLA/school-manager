export type Escuela = {
	id: number;
	nombre: string;
	localidad: string;
	direccion: string;
	telefono?: string;
};

export type CrearEscuelaDTO = Omit<Escuela, "id">;
export type ActualizarEscuelaDTO = Omit<Escuela, "id">;

export type CrearEscuelaFormInput = {
	nombre: string;
	localidad: string;
	direccion: string;
	telefono: string;
};
