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

type PageSwithcingProps = {
  searchParamsObj: SearchParamsTypes;
  repoIssues: {
    totalIssues: number;
    isLoading: boolean;
  };
  setSearchParams: (params: SearchParamsTypes) => void;
};

export default function PageSwithcing({
  searchParamsObj,
  repoIssues,
  setSearchParams,
}: PageSwithcingProps) {
  if (repoIssues.isLoading) return <></>;

  const page = +searchParamsObj.page;
  const totalPages = Math.ceil((repoIssues.totalIssues !== 0 ? repoIssues.totalIssues : 1) / 30);
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
