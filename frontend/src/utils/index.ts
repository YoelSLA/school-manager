export function diasRestantes(fechaHasta: string): number {
  const [year, month, day] = fechaHasta.split("-").map(Number);

  const hoy = new Date();
  const hasta = new Date(year, month - 1, day);

  hoy.setHours(0, 0, 0, 0);
  hasta.setHours(0, 0, 0, 0);

  const diff = hasta.getTime() - hoy.getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export function formatearHora(hora: string) {
  // soporta "HH:mm" y "HH:mm:ss"
  const [hh, mm] = hora.split(":");

  return `${parseInt(hh, 10)}:${mm} Hs.`;
}
