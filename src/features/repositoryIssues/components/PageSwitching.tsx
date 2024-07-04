import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";
import SearchParamsTypes from "../types/searchParams.interface";
import { useQuery } from "@tanstack/react-query";
import fetchTotalPages from "../utils/fetchTotalPages";

type PageSwithcingProps = {
  searchParamsObj: SearchParamsTypes;
  setSearchParams: (params: SearchParamsTypes) => void;
  user: string;
  repo: string;
};

export default function PageSwithcing({
  searchParamsObj,
  setSearchParams,
  user,
  repo,
}: PageSwithcingProps) {
  const page = +searchParamsObj.page;
  const status = searchParamsObj.status;
  const label = searchParamsObj.label;
  const assignee = searchParamsObj.assignee;

  const {
    data: totalIssues,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["totalIssues", user, repo, status, label, assignee],
    queryFn: () => fetchTotalPages(user ?? "microsoft", repo ?? ".github", status, label, assignee),
  });

  if (isLoading || !totalIssues) return <></>;
  if (isError) return <h1>Network error</h1>;

  const totalPages = Math.ceil((totalIssues !== 0 ? totalIssues : 1) / 30);
  const paginationElements = [undefined, undefined, undefined];

  return (
    <Pagination className="pagination">
      <PaginationContent>
        {page === 1 || (
          <PaginationItem>
            <PaginationPrevious
              size="default"
              onClick={() => setSearchParams({ ...searchParamsObj, page: String(page - 1) })}
            />
          </PaginationItem>
        )}

        {paginationElements.map((item, index) => {
          return page + index <= totalPages ? (
            <PaginationItem>
              {index == 0 ? (
                <PaginationLink size="default" isActive>
                  {page + index}
                </PaginationLink>
              ) : (
                <PaginationLink
                  size="default"
                  onClick={() =>
                    setSearchParams({ ...searchParamsObj, page: String(page + index) })
                  }>
                  {page + index}
                </PaginationLink>
              )}
            </PaginationItem>
          ) : null;
        })}

        {page + 2 < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                size="default"
                onClick={() => setSearchParams({ ...searchParamsObj, page: String(totalPages) })}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {page === totalPages || (
          <PaginationItem>
            <PaginationNext
              size="default"
              onClick={() => setSearchParams({ ...searchParamsObj, page: String(page + 1) })}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
