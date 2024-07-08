import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../components/ui/loadingSpinner";
import fetchIssueDetails from "../../features/issueDetails/utils/fetchIssueDetails";
import IssueDetails from "../../features/issueDetails/components/IssueDetails";
import "./IssueDetails.css";

export default function IssueDetailsRoute() {
  const { user } = useParams();
  const { repo } = useParams();
  const { issue } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["issueDetails", user, repo, issue],
    queryFn: () => fetchIssueDetails(user ?? "microsoft", repo ?? ".github", issue ?? "1"),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>Network error</h1>;

  return (
    <section className="issueDetails">
      <IssueDetails issue={data} />
    </section>
  );
}
