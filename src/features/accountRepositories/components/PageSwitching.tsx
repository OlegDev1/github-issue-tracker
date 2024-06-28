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
};

export default function PageSwitching({ page, setSearchParams, userRepos }: PaginationProps) {
  if (userRepos.isLoading) return <></>;

  const totalPages = Math.ceil(userRepos.totalRepos / 30);
  const paginationElements = [undefined, undefined, undefined];

  return (
    <Pagination className="pagination">
      <PaginationContent>
        {page === 1 || (
          <PaginationItem>
            <PaginationPrevious
              size="default"
              onClick={() => setSearchParams({ page: String(page - 1) })}
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
                  onClick={() => setSearchParams({ page: String(page + index) })}>
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
                onClick={() => setSearchParams({ page: String(totalPages) })}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {page === totalPages || (
          <PaginationItem>
            <PaginationNext
              size="default"
              onClick={() => setSearchParams({ page: String(page + 1) })}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
