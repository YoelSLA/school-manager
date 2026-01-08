type Props = {
  materia: string;
  curso: string;
  orientacion: string;
};

export function CursoExtra({ materia, curso, orientacion }: Props) {
  return (
    <div className="designacion-extra designacion-extra--curso">
      <div>
        <span className="label">Materia</span>
        <strong>{materia}</strong>
      </div>

      <div>
        <span className="label">Curso</span>
        <strong>{curso}</strong>
      </div>

      <div>
        <span className="label">Orientación</span>
        <strong>{orientacion}</strong>
      </div>
    </div>
  );
}
