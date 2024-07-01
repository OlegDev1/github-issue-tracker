import { useQuery } from "@tanstack/react-query";
import fetchRepositoryIssues from "../utils/fetchRepositoryIssues";
import { Spinner } from "../../../components/ui/loadingSpinner";

export default function RepositoryIssues({ user, repo, page }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["repositoryIssues", user, repo, page],
    queryFn: () => fetchRepositoryIssues(user, repo, page),
  });

  if (isPending) return <Spinner size="large" className="loading__spinner" />;
  if (isError) return <h1>Error</h1>;

  return (
    <ul>
      {data.map((item) => (
        <li>{item.title}</li>
      ))}
    </ul>
  );
}
