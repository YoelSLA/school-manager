import AppRouter from "./app/router/AppRouter";
import { useUpdaterSync } from "./infrastructure/updater/hooks/useUpdaterSync";

export default function App() {
  useUpdaterSync();

  return <AppRouter />;
}
