import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import Label from "../types/label.interface";

type LabelSelectProps = {
  isLoading: boolean;
  labels: Label[];
};

export default function LabelSelect({ isLoading, labels }: LabelSelectProps) {
  if (isLoading) return <></>;

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Label" />
      </SelectTrigger>
      <SelectContent>
        {labels.map((item) => (
          <SelectItem value={item.name} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  height: "12px",
                  width: "12px",
                  backgroundColor: "#" + item.color,
                  display: "inline-block",
                  borderRadius: "50%",
                }}></span>
              <span>{item.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
