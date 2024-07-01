import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import RepositoryIssues from "../../features/repositoryIssues/components/RepositoryIssues";
import fetchTotalPages from "../../features/repositoryIssues/utils/fetchTotalPages";
import PageSwithcing from "../../features/repositoryIssues/components/PageSwitching";
import "./RepositoryIssues.css";
import Nav from "../../features/repositoryIssues/components/Nav";

export default function RepositoryIssuesRoute() {
  const { user } = useParams();
  const { repo } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page")!;
  const status = searchParams.get("status"); //todo: implement open and closed issues

  const { data, isLoading, isError } = useQuery({
    queryKey: ["totalPages", user, repo, status],
    queryFn: () => fetchTotalPages(user, repo, status),
  });
  if (isError) return <h1>Error</h1>;

  return (
    <section className="issues">
      <Nav searchParams={searchParams} setSearchParams={setSearchParams} />
      <RepositoryIssues user={user} repo={repo} page={page} status={status} />
      <PageSwithcing
        page={page}
        repoIssues={{ totalIssues: data, isLoading: isLoading }}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </section>
  );
}
