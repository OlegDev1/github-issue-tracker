import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import RepositoryIssues from "../../features/repositoryIssues/components/RepositoryIssues";
import fetchTotalPages from "../../features/repositoryIssues/utils/fetchTotalPages";
import PageSwithcing from "../../features/repositoryIssues/components/PageSwitching";
import "./RepositoryIssues.css";

export default function RepositoryIssuesRoute() {
  const { user } = useParams();
  const { repo } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const page = +searchParams.get("page")!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["totalPages", user, repo],
    queryFn: () => fetchTotalPages(user, repo),
  });
  if (isError) return <h1>Error</h1>;

  return (
    <section className="issues">
      <RepositoryIssues user={user} repo={repo} page={page} />
      <PageSwithcing
        page={page}
        repoIssues={{ totalIssues: data, isLoading: isLoading }}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </section>
  );
}
