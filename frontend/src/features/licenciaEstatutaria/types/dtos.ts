export interface LicenciaEstatutariaResponseDTO {
	id: number;
	articulo: string;
	codigo: string;
	nombre: string;
	descripcion: string;
	activa: boolean;
}

export interface LicenciaEstatutariaRowDTO {
	id: number;
	articulo: string;
	codigo: string;
	nombre: string;
	descripcion: string;
	activa: boolean;
}

export interface LicenciaEstatutariaSelectDTO {
	id: number;
	articulo: string;
	codigo: string;
	descripcion: string;
}
