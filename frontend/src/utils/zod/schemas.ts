import { z } from "zod";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);

export const requiredFechaISO = (message: string) =>
	z.preprocess(emptyToUndefined, z.iso.date({ message }));

export const optionalFechaISO = () =>
	z.preprocess(emptyToUndefined, z.iso.date().optional());
