import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import SearchParamsTypes from "../types/searchParams.interface";

type LabelSelectProps = {
  searchParamsObj: SearchParamsTypes;
  setSearchParams: (params: SearchParamsTypes) => void;
};

export default function SortSelect({ searchParamsObj, setSearchParams }: LabelSelectProps) {
  return (
    <Select
      onValueChange={(sort: "created" | "updated" | "comments") =>
        setSearchParams({ ...searchParamsObj, sort: sort, page: "1" })
      }
      value={searchParamsObj.sort ?? ""}>
      <SelectTrigger>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="created">By date Created</SelectItem>
        <SelectItem value="updated">By date Updated</SelectItem>
        <SelectItem value="comments">By Comments count</SelectItem>
      </SelectContent>
    </Select>
  );
}
