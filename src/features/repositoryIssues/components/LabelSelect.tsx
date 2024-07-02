import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import Label from "../types/label.interface";
import SearchParamsTypes from "../types/searchParams.interface";

type LabelSelectProps = {
  searchParamsObj: SearchParamsTypes;
  setSearchParams: (params: SearchParamsTypes) => void;
  isLoading: boolean;
  labels: Label[];
};

export default function LabelSelect({
  searchParamsObj,
  setSearchParams,
  isLoading,
  labels,
}: LabelSelectProps) {
  if (isLoading) return <></>;

  return (
    <Select
      onValueChange={(label) => setSearchParams({ ...searchParamsObj, label: label, page: "1" })}
      value={searchParamsObj.label}>
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
