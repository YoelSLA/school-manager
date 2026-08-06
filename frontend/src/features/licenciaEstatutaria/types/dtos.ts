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
export interface LicenciaEstatutariaUpdateDTO {
	articulo: string;
	codigo: string;
	nombre: string;
	descripcion: string;
}

export interface LicenciaEstatutariaRowDTO {
	id: number;
	articulo: string;
	codigo: string;
	nombre: string;
	descripcion: string;
	activa: boolean;
}
