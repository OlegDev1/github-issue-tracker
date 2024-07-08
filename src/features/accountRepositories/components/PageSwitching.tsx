import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";
import "./PageSwitching.css";

type PaginationProps = {
  page: number;
  setSearchParams: (params: { page: string }) => void;
  userRepos: {
    totalRepos: number;
    isLoading: boolean;
  };
  searchParams: URLSearchParams;
};

export default function PageSwitching({
  page,
  setSearchParams,
  userRepos,
  searchParams,
}: PaginationProps) {
  if (userRepos.isLoading) return <></>;

  const totalPages = Math.ceil(userRepos.totalRepos / 30);
  const paginationElements = [undefined, undefined, undefined];

  const searchParamsObj = Object.fromEntries(searchParams.entries());

  return (
    <Pagination className="pagination">
      <PaginationContent>
        {page === 1 || (
          <PaginationItem key="back">
            <PaginationPrevious
              size="default"
              onClick={() => setSearchParams({ ...searchParamsObj, page: String(page - 1) })}
            />
          </PaginationItem>
        )}

        {paginationElements.map((item, index) => {
          return page + index <= totalPages ? (
            <PaginationItem key={index}>
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
            <PaginationItem key="empty">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem key="totalPages">
              <PaginationLink
                size="default"
                onClick={() => setSearchParams({ ...searchParamsObj, page: String(totalPages) })}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {page === totalPages || (
          <PaginationItem key="next">
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
