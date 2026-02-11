import type { Escuela } from "@/features/escuelas/types/escuela.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type EscuelaState = {
	escuelaActiva: Escuela | null;
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
		setEscuelaActiva(state, action: PayloadAction<Escuela>) {
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
