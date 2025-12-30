import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import "./styles/index.css";

function App() {
  return (
    <BrowserRouter>
      {/* Toast global */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
        }}
      />

      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
