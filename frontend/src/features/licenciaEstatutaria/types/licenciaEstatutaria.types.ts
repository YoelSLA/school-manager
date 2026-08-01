export interface LicenciaEstatutariaResponseDTO {
	id: number;
	articulo: string;
	codigo: string;
	nombre: string;
	descripcion: string;
	activa: boolean;
}

export interface LicenciaEstatutariaCreateDTO {
	articulo: string;
	codigo: string;
	nombre: string;
	descripcion: string;
}
