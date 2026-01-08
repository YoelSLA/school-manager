import { Escuela } from "@/utils/types/escuela";
import { createContext, ReactNode, useContext, useState } from "react";

type EscuelaContextType = {
  escuelaActiva: Escuela | null;
  setEscuelaActiva: (escuela: Escuela) => void;
  limpiarEscuela: () => void;
};

const EscuelaContext = createContext<EscuelaContextType | undefined>(undefined);

export function EscuelaProvider({ children }: { children: ReactNode }) {
  const [escuelaActiva, setEscuelaActivaState] = useState<Escuela | null>(
    () => {
      const guardada = localStorage.getItem("escuelaActiva");
      return guardada ? JSON.parse(guardada) : null;
    }
  );

  const setEscuelaActiva = (escuela: Escuela) => {
    setEscuelaActivaState(escuela);
    localStorage.setItem("escuelaActiva", JSON.stringify(escuela));
  };

  const limpiarEscuela = () => {
    setEscuelaActivaState(null);
    localStorage.removeItem("escuelaActiva");
  };

  return (
    <EscuelaContext.Provider
      value={{ escuelaActiva, setEscuelaActiva, limpiarEscuela }}
    >
      {children}
    </EscuelaContext.Provider>
  );
}

export function useEscuela() {
  const context = useContext(EscuelaContext);
  if (!context) {
    throw new Error("useEscuela debe usarse dentro de EscuelaProvider");
  }
  return context;
}
