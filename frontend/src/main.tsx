import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EscuelaProvider } from "./context/EscuelaContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EscuelaProvider>
      <App />
    </EscuelaProvider>
  </React.StrictMode>
);
