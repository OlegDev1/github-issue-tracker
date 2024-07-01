import { useQuery } from "@tanstack/react-query";
import fetchRepositoryIssues from "../utils/fetchRepositoryIssues";
import { Spinner } from "../../../components/ui/loadingSpinner";
import "./RepositoryIssues.css";
import Issue from "./Issue";
import IssueData from "../types/issue.interface";

export default function RepositoryIssues({ user, repo, page }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["repositoryIssues", user, repo, page],
    queryFn: () => fetchRepositoryIssues(user, repo, page),
  });

  if (isPending) return <Spinner size="large" className="loading__spinner" />;
  if (isError) return <h1>Error</h1>;

  return (
    <ul className="issues__list">
      {data.map((item: IssueData) => (
        <Issue issue={item} />
      ))}
    </ul>
  );
}
