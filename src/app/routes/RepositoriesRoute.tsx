import { useQuery } from "@tanstack/react-query";
import AccountRepositories from "../../features/accountRepositories/components/AccountRepositories";
import PageSwitching from "../../features/accountRepositories/components/PageSwitching";
import Search from "../../features/accountRepositories/components/Search";
import { useParams, useSearchParams } from "react-router-dom";
import "./Repositories.css";
import fetchTotalPages from "../../features/accountRepositories/utils/fetchTotalPages";

export default function RepositoriesRoute() {
  const { user } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const page = +searchParams.get("page")!;
  const searchQuery = searchParams.get("query");

  const { data, isLoading } = useQuery({
    queryKey: ["totalPages", user, searchQuery],
    queryFn: () => fetchTotalPages(searchQuery, user),
  });

  return (
    <section className="repositories">
      <Search
        setSearchParams={setSearchParams}
        searchQuery={searchQuery}
        searchParams={searchParams}
      />
      <AccountRepositories user={user!} page={page} searchQuery={searchQuery} />
      <PageSwitching
        page={page}
        setSearchParams={setSearchParams}
        userRepos={{ totalRepos: data, isLoading: isLoading }}
        searchParams={searchParams}
      />
    </section>
  );
}
