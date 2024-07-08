import { useQuery } from "@tanstack/react-query";
import fetchRepositoryIssues from "../utils/fetchRepositoryIssues";
import { Spinner } from "../../../components/ui/loadingSpinner";
import "./RepositoryIssues.css";
import Issue from "./Issue";
import IssueData from "../types/issue.interface";
import SearchParamsTypes from "../types/searchParams.interface";

type RepositoryIssuesProps = {
  user: string;
  repo: string;
  searchParamsObj: SearchParamsTypes;
};

export default function RepositoryIssues({ user, repo, searchParamsObj }: RepositoryIssuesProps) {
  const page = +searchParamsObj.page;
  const status = searchParamsObj.status;
  const label = searchParamsObj.label;
  const assignee = searchParamsObj.assignee;
  const sort = searchParamsObj.sort;

  const { data, isPending, isError } = useQuery({
    queryKey: ["repositoryIssues", user, repo, page, status, label, assignee, sort],
    queryFn: () => fetchRepositoryIssues(user, repo, page, status, label, assignee, sort),
  });

  if (isPending) return <Spinner size="large" className="loading__spinner" />;
  if (isError) return <h1>Network error</h1>;

  return (
    <ul className="issues__list">
      {data.map((item: IssueData) => (
        <Issue issue={item} />
      ))}
    </ul>
  );
}
