import { create } from "zustand";
import type { Status } from "../types";

type Store = {
	status: Status;
	progress: number;
	version?: string;
	notes?: string;

	setStateFromMain: (data: Partial<Store>) => void;
};

export const useUpdaterStore = create<Store>((set) => ({
	status: "idle",
	progress: 0,

	setStateFromMain: (data) => set(data),
}));
