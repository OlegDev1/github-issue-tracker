import "./AccountRepositories.css";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../../components/ui/loadingSpinner";
import Repository from "./Repository";
import RepositoryData from "../types/repository.interface";
import fetchRepos from "../utils/fetchRepos";

type AccountRepositoriesProps = {
  user: string;
  page: number;
  searchQuery: null | string;
};

export default function AccountRepositories({ user, page, searchQuery }: AccountRepositoriesProps) {
  const { isPending, isError, data } = useQuery({
    queryKey: ["repositories", user, page, searchQuery],
    queryFn: () => fetchRepos(user, page, searchQuery),
  });

  if (isPending) return <Spinner size="large" className="loading__spinner" />;
  if (isError) return <h1>Error!</h1>;

  return (
    <ul className="repositories__list">
      {data.map((item: RepositoryData) => (
        <Repository repo={item} key={item.name} />
      ))}
    </ul>
  );
}
