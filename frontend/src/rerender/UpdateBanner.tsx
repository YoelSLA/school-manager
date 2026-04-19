import { useUpdater } from "./useUpdater";

export default function UpdateBanner() {
	const { status, progress, startDownload, restartApp, version } = useUpdater();

	if (status === "idle") return null;

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				width: "100%",
				background: "#5865f2",
				color: "white",
				padding: "10px",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			{status === "available" && (
				<>
					<span>🚀 Nueva versión {version}</span>
					<button type="button" onClick={startDownload}>
						Descargar
					</button>
				</>
			)}

			{status === "downloading" && <span>📦 Descargando {progress}%</span>}

			{status === "downloaded" && (
				<>
					<span>✅ Lista para instalar</span>
					<button type="button" onClick={restartApp}>
						Reiniciar
					</button>
				</>
			)}

			{status === "error" && (
				<>
					<span>❌ Error</span>
					<button type="button" onClick={startDownload}>
						Reintentar
					</button>
				</>
			)}
		</div>
	);
}
