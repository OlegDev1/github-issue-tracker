import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../../../components/ui/select";
import { Spinner } from "../../../components/ui/loadingSpinner";
import { useInfiniteQuery } from "@tanstack/react-query";
import SearchParamsTypes from "../types/searchParams.interface";
import nextPageParam from "../utils/nextPageParam";
import fetchAssignees from "../utils/fetchAssignees";

type AssigneesSelectProps = {
  searchParamsObj: SearchParamsTypes;
  setSearchParams: (params: SearchParamsTypes) => void;
  user: string;
  repo: string;
};

export default function AssigneesSelect({
  searchParamsObj,
  setSearchParams,
  user,
  repo,
}: AssigneesSelectProps) {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["assignees", user, repo],
      queryFn: ({ pageParam }) => fetchAssignees(user, repo, pageParam),
      initialPageParam: "1",
      getNextPageParam: (lastPage) => nextPageParam(lastPage),
    });

  if (isLoading) return <></>;
  if (isError || !data) return <h1>Network error</h1>;

  return (
    <Select
      onValueChange={(assignee) =>
        setSearchParams({ ...searchParamsObj, assignee: assignee, page: "1" })
      }
      value={searchParamsObj.assignee ?? ""}>
      <SelectTrigger>
        <SelectValue placeholder="Assignee" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.pages.map((page) =>
            page.data.map((item) => (
              <SelectItem value={item.login} style={{ cursor: "pointer" }}>
                <span>{item.login}</span>
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
