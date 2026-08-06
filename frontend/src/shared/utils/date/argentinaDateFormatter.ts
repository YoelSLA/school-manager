const ARG_TZ = "America/Argentina/Buenos_Aires";

export const argentinaDateFormatter = new Intl.DateTimeFormat("es-AR", {
	timeZone: ARG_TZ,
	day: "2-digit",
	month: "long",
	year: "numeric",
});
