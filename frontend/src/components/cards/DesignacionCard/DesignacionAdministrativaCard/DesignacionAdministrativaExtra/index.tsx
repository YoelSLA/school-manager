type Props = {
  rolEducativo: string;
};

export function AdministrativaExtra({ rolEducativo }: Props) {
  return (
    <div className="designacion-extra">
      <span className="label">Rol educativo</span>
      <strong className="value">{rolEducativo}</strong>
    </div>
  );
}
