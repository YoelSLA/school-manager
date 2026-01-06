import EscuelaCard from "@/components/cards/EscuelaCard";
import { eliminarEscuela, getEscuelas } from "@/services/escuelasService";
import { Escuela } from "@/utils/types";
import { useEffect, useState } from "react";
import ConfirmarEliminarModal from "./ConfirmarEliminarModal";
import CrearEscuelaModal from "./CrearEscuelaModal";
import "./seleccionarEscuelaPage.css";

export default function SeleccionarEscuelaPage() {
  const [escuelas, setEscuelas] = useState<Escuela[]>([]);
  const [modalCrear, setModalCrear] = useState(false);
  const [editar, setEditar] = useState<Escuela | null>(null);
  const [eliminar, setEliminar] = useState<Escuela | null>(null);

  const cargar = async () => {
    const data = await getEscuelas();
    setEscuelas(data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const confirmarEliminar = async () => {
    if (!eliminar) return;
    await eliminarEscuela(eliminar.id);
    setEliminar(null);
    cargar();
  };

  return (
    <div className="seleccionar-escuela-page">
      {/* HEADER */}
      <header className="escuela-header">
        <div className="escuela-header-left">
          <h1>Seleccionar escuela</h1>
          <p className="subtitle">
            Elegí una escuela para continuar o administrá las existentes
          </p>
        </div>

        <button
          className="btn-crear-escuela"
          onClick={() => setModalCrear(true)}
        >
          + Crear escuela
        </button>
      </header>

      {/* GRID */}
      <div className="escuela-grid-wrapper">
        <div className="escuela-grid">
          {escuelas.map((e) => (
            <EscuelaCard
              key={e.id}
              escuela={e}
              onEntrar={() =>
                localStorage.setItem("escuelaActiva", e.id.toString())
              }
              onEditar={() => setEditar(e)}
              onEliminar={() => setEliminar(e)}
            />
          ))}
        </div>
      </div>

      {/* MODAL CREAR / EDITAR */}
      {(modalCrear || editar) && (
        <CrearEscuelaModal
          onClose={() => {
            setModalCrear(false);
            setEditar(null);
          }}
        />
      )}

      {/* MODAL ELIMINAR */}
      {eliminar && (
        <ConfirmarEliminarModal
          onClose={() => setEliminar(null)}
          onConfirm={confirmarEliminar}
        />
      )}
    </div>
  );
}
