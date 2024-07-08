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
        <SelectItem value="created" key="sortByCreated">
          By date Created
        </SelectItem>
        <SelectItem value="updated" key="sortByUpdated">
          By date Updated
        </SelectItem>
        <SelectItem value="comments" key="sortByComments">
          By Comments count
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
