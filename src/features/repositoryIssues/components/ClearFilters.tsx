import { Button } from "../../../components/ui/button";
import SearchParamsTypes from "../types/searchParams.interface";

type ClearFiltersProps = {
  setSearchParams: (params: SearchParamsTypes) => void;
};

export default function ClearFilters({ setSearchParams }: ClearFiltersProps) {
  return (
    <Button
      variant="secondary"
      style={{ color: "grey" }}
      onClick={() => setSearchParams({ page: "1", status: "opened" })}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="grey"
        className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
      Clear
    </Button>
  );
}
