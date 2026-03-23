import { create } from "zustand";

export type Status =
  | "idle"
  | "checking"
  | "available"
  | "downloading"
  | "downloaded"
  | "error";

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