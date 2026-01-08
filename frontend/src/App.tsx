import { EscuelaProvider } from "@/context/EscuelaContext";
import AppRouter from "@/router/AppRouter";
import "@/styles/index.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <EscuelaProvider>
        {/* Toast global */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
          }}
        />
      </EscuelaProvider>

      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
