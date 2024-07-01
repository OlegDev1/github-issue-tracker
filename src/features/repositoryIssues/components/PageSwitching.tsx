import { SetURLSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";

type PageSwithcingProps = {
  page: number;
  repoIssues: {
    totalIssues: number;
    isLoading: boolean;
  };
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export default function PageSwithcing({
  page,
  repoIssues,
  searchParams,
  setSearchParams,
}: PageSwithcingProps) {
  if (repoIssues.isLoading) return <></>;

  const totalPages = Math.ceil(repoIssues.totalIssues / 30);
  const paginationElements = [undefined, undefined, undefined];

  const searchParamsObj = Object.fromEntries(searchParams.entries());

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
