import { useUpdaterSync } from "./rerender/useUpdaterSync";
import AppRouter from "./router/AppRouter"

export default function App() {
  useUpdaterSync(); // 🔥 CLAVE

  return <AppRouter />;
}