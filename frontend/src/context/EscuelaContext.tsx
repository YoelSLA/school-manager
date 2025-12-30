import { createContext, useContext, useState } from "react";

interface Escuela {
  id: string;
  nombre: string;
}

interface EscuelaContextType {
  escuela: Escuela | null;
  setEscuela: (escuela: Escuela) => void;
  clearEscuela: () => void;
}

const EscuelaContext = createContext<EscuelaContextType | null>(null);

export function EscuelaProvider({ children }: { children: React.ReactNode }) {
  const [escuela, setEscuelaState] = useState<Escuela | null>(null);

  const setEscuela = (escuela: Escuela) => {
    setEscuelaState(escuela);
  };

  const clearEscuela = () => {
    setEscuelaState(null);
  };

  return (
    <EscuelaContext.Provider value={{ escuela, setEscuela, clearEscuela }}>
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
