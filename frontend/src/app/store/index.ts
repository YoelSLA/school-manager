import { configureStore } from "@reduxjs/toolkit";
import escuelaReducer from "./escuela/escuelaSlice";

export const store = configureStore({
	reducer: {
		escuela: escuelaReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
