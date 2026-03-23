import { useUpdaterStore } from "./store";

export function useUpdater() {
  const store = useUpdaterStore();

  const updateAvailable =
    store.status === "available" || store.status === "downloading";

  const downloaded = store.status === "downloaded";

  return {
    ...store,
    updateAvailable,
    downloaded,
    startDownload: () => window.updater?.startDownload(),
    restartApp: () => window.updater?.restartApp(),
  };
}