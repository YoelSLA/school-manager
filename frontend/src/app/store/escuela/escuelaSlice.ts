import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EscuelaResponseDTO } from "@/shared/utils/types/escuela.types";

type EscuelaState = {
	escuelaActiva: EscuelaResponseDTO | null;
};

const initialState: EscuelaState = {
	escuelaActiva: (() => {
		const guardada = localStorage.getItem("escuelaActiva");
		return guardada ? JSON.parse(guardada) : null;
	})(),
};

const escuelaSlice = createSlice({
	name: "escuela",
	initialState,
	reducers: {
		setEscuelaActiva(state, action: PayloadAction<EscuelaResponseDTO>) {
			state.escuelaActiva = action.payload;
			localStorage.setItem("escuelaActiva", JSON.stringify(action.payload));
		},
		limpiarEscuela(state) {
			state.escuelaActiva = null;
			localStorage.removeItem("escuelaActiva");
		},
	},
});

export const { setEscuelaActiva, limpiarEscuela } = escuelaSlice.actions;

export default escuelaSlice.reducer;
