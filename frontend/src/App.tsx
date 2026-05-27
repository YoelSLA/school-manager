import AppRouter from "./app/router/AppRouter";
import { useUpdaterSync } from "./infrastructure/useUpdaterSync";

export default function App() {
	useUpdaterSync();

	return <AppRouter />;
}
