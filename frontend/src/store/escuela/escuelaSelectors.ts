import type { RootState } from "@/store";

export const selectEscuelaActiva = (state: RootState) =>
	state.escuela.escuelaActiva;
