import { crearEscuela } from "@/services/escuelasService";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./crearEscuelaModal.css";

type EscuelaFormData = {
  nombre: string;
  localidad: string;
  direccion: string;
  telefono: string;
};

type Props = {
  onClose: () => void;
};

export default function CrearEscuelaModal({ onClose }: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EscuelaFormData>({});

  const submit = async (data: EscuelaFormData) => {
    try {
      await crearEscuela(data);

      // 2️⃣ Mostrar toast centrado con botón OK
      toast.custom((t) => (
        <div className="toast-success">
          <h4>✅ Escuela creada</h4>
          <p>La escuela se agregó correctamente</p>

          <button
            onClick={() => {
              toast.dismiss(t.id);
              onClose();
              navigate("/seleccionar-escuela");
            }}
          >
            OK
          </button>
        </div>
      ));
    } catch (error) {
      toast.error("❌ Error al crear la escuela");
    }
  };

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={handleSubmit(submit)}>
        <h2>Crear escuela</h2>

        <div className="field">
          <input
            placeholder="Nombre de la escuela"
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && (
            <span className="error">{errors.nombre.message}</span>
          )}
        </div>

        <div className="field">
          <input
            placeholder="Localidad"
            {...register("localidad", {
              required: "La localidad es obligatoria",
            })}
          />
        </div>
        <div className="field">
          <input
            placeholder="Dirección"
            {...register("direccion", {
              required: "La dirección es obligatoria",
            })}
          />
        </div>

        <div className="field">
          <input
            placeholder="Teléfono"
            {...register("telefono", {
              required: "El teléfono es obligatorio",
            })}
          />
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-outline" onClick={onClose}>
            Cancelar
          </button>

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
