import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";

import { store } from "@/store";

import "@/styles/index.css";
import "@/styles/tokens.css";

import { queryClient } from "./queryClient";
import AppRouter from "./router/AppRouter";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element #root not found");
}

const Router =
	window.location.protocol === "file:" ? HashRouter : BrowserRouter;

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Router>
					<Toaster
						position="bottom-right"
						toastOptions={{ duration: 4000 }}
					/>
					<AppRouter />
				</Router>

				{import.meta.env.DEV && (
					<ReactQueryDevtools initialIsOpen={false} />
				)}
			</QueryClientProvider>
		</Provider>
	</React.StrictMode>
);
