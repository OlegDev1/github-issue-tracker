import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../../../components/ui/select";
import SearchParamsTypes from "../types/searchParams.interface";
import { Spinner } from "../../../components/ui/loadingSpinner";
import { useInfiniteQuery } from "@tanstack/react-query";
import fetchLabels from "../utils/fetchLabels";
import nextPageParam from "../utils/nextPageParam";

type LabelSelectProps = {
  searchParamsObj: SearchParamsTypes;
  setSearchParams: (params: SearchParamsTypes) => void;
  user: string;
  repo: string;
};

export default function LabelSelect({
  searchParamsObj,
  setSearchParams,
  user,
  repo,
}: LabelSelectProps) {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["lables", user, repo],
      queryFn: ({ pageParam }) => fetchLabels(user ?? "microsoft", repo ?? ".github", pageParam),
      initialPageParam: "1",
      getNextPageParam: (lastPage) => nextPageParam(lastPage),
    });

  if (isLoading) return <></>;
  if (isError || !data) return <h1>Network error</h1>;

  return (
    <Select
      onValueChange={(label) => setSearchParams({ ...searchParamsObj, label: label, page: "1" })}
      value={searchParamsObj.label ?? ""}>
      <SelectTrigger>
        <SelectValue placeholder="Label" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.pages.map((page) =>
            page.data.map((item) => (
              <SelectItem value={item.name} style={{ cursor: "pointer" }} key={item.name}>
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
              hasNextPage && (
                <button
                  onClick={() => fetchNextPage()}
                  style={{ textAlign: "center", width: "100%" }}>
                  Load more
                </button>
              )
            )}
          </SelectLabel>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
