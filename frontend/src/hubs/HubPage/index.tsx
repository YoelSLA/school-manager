import { HubItem } from "@/utils/types";
import "./HubPage.css";

type Props = {
  items: HubItem[];
  variant?: "default" | "decision";
  className?: string;
};

export default function HubPage({
  items,
  variant = "default",
  className,
}: Props) {
  return (
    <div className={`hub ${variant} ${className ?? ""}`}>
      <div className="hub-grid">
        {items.map((item, index) => (
          <div key={index} className="hub-card" onClick={item.onClick}>
            <div className="hub-icon">{item.icon}</div>

            <div className="hub-text">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
