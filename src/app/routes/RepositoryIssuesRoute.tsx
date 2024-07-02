import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import RepositoryIssues from "../../features/repositoryIssues/components/RepositoryIssues";
import fetchTotalPages from "../../features/repositoryIssues/utils/fetchTotalPages";
import PageSwithcing from "../../features/repositoryIssues/components/PageSwitching";
import "./RepositoryIssues.css";
import Nav from "../../features/repositoryIssues/components/Nav";
import SearchParamsTypes from "../../features/repositoryIssues/types/searchParams.interface";
import fetchLabels from "../../features/repositoryIssues/utils/fetchLabels";

type setSearchParamsType = (params: SearchParamsTypes) => void;

export default function RepositoryIssuesRoute() {
  const { user } = useParams();
  const { repo } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsObj = Object.fromEntries(
    searchParams.entries()
  ) as unknown as SearchParamsTypes;
  const status = searchParamsObj.status;
  const label = searchParamsObj.label;

  const {
    data: totalIssuesData,
    isLoading: isIssuesLoading,
    isError: isIssuesError,
  } = useQuery({
    queryKey: ["totalIssues", user, repo, status, label],
    queryFn: () => fetchTotalPages(user ?? "microsoft", repo ?? ".github", status, label),
  });
  const {
    data: labelsData,
    isLoading: isLabelsLoading,
    isError: isLabelsError,
  } = useQuery({
    queryKey: ["labels", user, repo],
    queryFn: () => fetchLabels(user ?? "microsoft", repo ?? ".github"),
  });

  if (isIssuesError || isLabelsError) return <h1>Error</h1>;

  return (
    <section className="issues">
      <Nav
        searchParamsObj={searchParamsObj}
        setSearchParams={setSearchParams as unknown as setSearchParamsType}
        labels={labelsData}
        isLoading={isLabelsLoading}
      />
      <RepositoryIssues
        user={user ?? "microsoft"}
        repo={repo ?? ".github"}
        searchParamsObj={searchParamsObj}
      />
      <PageSwithcing
        searchParamsObj={searchParamsObj}
        repoIssues={{ totalIssues: totalIssuesData ?? 0, isLoading: isIssuesLoading }}
        setSearchParams={setSearchParams as unknown as setSearchParamsType}
      />
    </section>
  );
}
