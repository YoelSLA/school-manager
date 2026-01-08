import "../SectionBlock.css";
import "./FranjasHorarias.css";

type Props = {
  franjas: {
    dia: string;
    horaDesde: string;
    horaHasta: string;
  }[];
};

export function FranjasHorarias({ franjas }: Props) {
  return (
    <section className="section-block">
      <h4 className="section-block__title">Horarios</h4>

      <ul className="franjas-list">
        {franjas.map((f, i) => (
          <li key={i} className="franja-item">
            <strong>{f.dia}</strong>
            <span>
              {f.horaDesde} – {f.horaHasta}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
