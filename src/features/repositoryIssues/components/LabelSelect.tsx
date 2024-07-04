import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../../../components/ui/select";
import Label from "../types/label.interface";
import SearchParamsTypes from "../types/searchParams.interface";
import { Spinner } from "../../../components/ui/loadingSpinner";

type LabelSelectProps = {
  searchParamsObj: SearchParamsTypes;
  setSearchParams: (params: SearchParamsTypes) => void;
  isLoading: boolean;
  labels: Label[];
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
};

export default function LabelSelect({
  searchParamsObj,
  setSearchParams,
  isLoading,
  labels,
  fetchNextPage,
  isFetchingNextPage,
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
        <SelectGroup>
          {labels.pages.map((page) =>
            page.data.map((item) => (
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
            ))
          )}
          <SelectLabel>
            {isFetchingNextPage ? (
              <Spinner size="small" />
            ) : (
              <button
                onClick={() => fetchNextPage()}
                style={{ textAlign: "center", width: "100%" }}>
                Load more
              </button>
            )}
          </SelectLabel>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
