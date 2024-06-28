import "./AccountRepositories.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "../../../components/ui/loadingSpinner";

type AccountRepositoriesProps = {
  user: string;
  page: number;
};

export default function AccountRepositories({ user, page }: AccountRepositoriesProps) {
  async function fetchRepos(user: string) {
    const resp = await axios.get(`https://api.github.com/users/${user}/repos?page=${page}`);
    return resp.data;
  }

  const { isPending, isError, data } = useQuery({
    queryKey: ["repositories", user, page],
    queryFn: () => fetchRepos(user),
  });

  if (isPending) return <Spinner size="large" className="repositories__spinner" />;
  if (isError) return <h1>Error!</h1>;

  return (
    <ul>
      {data.map((el) => (
        <li key={el.name}>{el.name}</li>
      ))}
    </ul>
  );
}
