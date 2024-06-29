import "./AccountRepositories.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "../../../components/ui/loadingSpinner";
import Repository from "./Repository";
import RepositoryData from "../types/repository.interface";

type AccountRepositoriesProps = {
  user: string;
  page: number;
  searchQuery: null | string;
};

export default function AccountRepositories({ user, page, searchQuery }: AccountRepositoriesProps) {
  const fetchURL =
    searchQuery === null
      ? `https://api.github.com/users/${user}/repos?page=${page}&per_page=30`
      : `https://api.github.com/search/repositories?q=${encodeURIComponent(
          `${searchQuery} user:${user}`
        )}&page=${page}&per_page=30`;

  async function fetchRepos(fetchURL: string) {
    const resp = await axios.get(fetchURL);
    return searchQuery === null ? resp.data : resp.data.items;
  }

  const { isPending, isError, data } = useQuery({
    queryKey: ["repositories", user, page, searchQuery],
    queryFn: () => fetchRepos(fetchURL),
  });

  if (isPending) return <Spinner size="large" className="repositories__spinner" />;
  if (isError) return <h1>Error!</h1>;

  return (
    <ul className="repositories__list">
      {data.map((item: RepositoryData) => (
        <Repository repo={item} />
      ))}
    </ul>
  );
}
