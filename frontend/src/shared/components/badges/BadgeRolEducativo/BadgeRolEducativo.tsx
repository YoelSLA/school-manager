import Badge from "@/shared/components/Badge";
import type { RolEducativo } from "@/shared/types/enums";
import { ROL_EDUCATIVO_CONFIG } from "./BadgeRolEducativo.config";

type Props = {
  rolEducativo: RolEducativo;
};

export default function BadgeRolEducativo({ rolEducativo }: Props) {
  const { label, variant, icon } = ROL_EDUCATIVO_CONFIG[rolEducativo];

  return (
    <Badge variant={variant} icon={icon}>
      {label}
    </Badge>
  );
}
