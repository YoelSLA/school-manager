import type { RootState } from "@/app/store";

export const selectEscuelaActiva = (state: RootState) =>
	state.escuela.escuelaActiva;
