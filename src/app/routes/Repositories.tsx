import { useQuery } from "@tanstack/react-query";
import AccountRepositories from "../../features/accountRepositories/components/AccountRepositories";
import PageSwitching from "../../features/accountRepositories/components/PageSwitching";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Repositories.css";

export default function Repositories() {
  const { user } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const page = +searchParams.get("page")!;

  const { data, isLoading } = useQuery({
    queryKey: ["totalPages", user],
    queryFn: async () => {
      const res = await axios.get(`https://api.github.com/users/${user}`);
      return res.data.public_repos;
    },
  });

  return (
    <section className="repositories">
      <AccountRepositories user={user!} page={page} />
      <PageSwitching
        page={page}
        setSearchParams={setSearchParams}
        userRepos={{ totalRepos: data, isLoading: isLoading }}
      />
    </section>
  );
}
