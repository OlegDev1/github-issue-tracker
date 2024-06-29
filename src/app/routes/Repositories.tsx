import { useQuery } from "@tanstack/react-query";
import AccountRepositories from "../../features/accountRepositories/components/AccountRepositories";
import PageSwitching from "../../features/accountRepositories/components/PageSwitching";
import Search from "../../features/accountRepositories/components/Search";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Repositories.css";

export default function Repositories() {
  const { user } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const page = +searchParams.get("page")!;
  const searchQuery = searchParams.get("query");

  const { data, isLoading } = useQuery({
    queryKey: ["totalPages", user, searchQuery],
    queryFn: () => fetchTotalPages(searchQuery),
  });

  async function fetchTotalPages(searchQuery: null | string) {
    if (searchQuery === null) {
      const res = await axios.get(`https://api.github.com/users/${user}`);
      return res.data.public_repos;
    }

    const res = await axios.get(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        `${searchQuery} user:${user}`
      )}&per_page=1`
    );
    return res.data.total_count;
  }

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
