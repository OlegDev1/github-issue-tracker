import { useParams, useSearchParams } from "react-router-dom";
import RepositoryIssues from "../../features/repositoryIssues/components/RepositoryIssues";
import PageSwithcing from "../../features/repositoryIssues/components/PageSwitching";
import "./RepositoryIssues.css";
import Nav from "../../features/repositoryIssues/components/Nav";
import SearchParamsTypes from "../../features/repositoryIssues/types/searchParams.interface";

type setSearchParamsType = (params: SearchParamsTypes) => void;

export default function RepositoryIssuesRoute() {
  const { user } = useParams();
  const { repo } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsObj = Object.fromEntries(
    searchParams.entries()
  ) as unknown as SearchParamsTypes;

  return (
    <section className="issues">
      <Nav
        searchParamsObj={searchParamsObj}
        setSearchParams={setSearchParams as unknown as setSearchParamsType}
        user={user ?? "microsoft"}
        repo={repo ?? ".github"}
      />
      <RepositoryIssues
        user={user ?? "microsoft"}
        repo={repo ?? ".github"}
        searchParamsObj={searchParamsObj}
      />
      <PageSwithcing
        searchParamsObj={searchParamsObj}
        setSearchParams={setSearchParams as unknown as setSearchParamsType}
        user={user ?? "microsoft"}
        repo={repo ?? ".github"}
      />
    </section>
  );
}
