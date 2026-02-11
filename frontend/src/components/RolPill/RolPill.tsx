import "./RolPill.scss";

type Props = {
	children: React.ReactNode;
};

export default function RolPill({ children }: Props) {
	return <span className="rol-pill">{children}</span>;
}
