import "./Issue.css";
import IssueData from "../types/issue.interface";
import { useNavigate } from "react-router-dom";

export default function Issue({
  issue,
  user,
  repo,
}: {
  issue: IssueData;
  user: string;
  repo: string;
}) {
  const navigate = useNavigate();

  return (
    <li
      className="issue__section"
      onClick={() => navigate(`/users/${user}/issues/${repo}/issue/${issue.number}`)}>
      <div className="issue__title">
        <h1 className="issue__title-title">{issue.title}</h1>
        {issue.labels.map((item) => (
          <span
            className="label__section"
            style={{
              backgroundColor: "#" + item.color,
            }}>
            <p className="label__text">{item.name}</p>
          </span>
        ))}
      </div>
      <p className="issue__data">
        #{issue.number} by {issue.user.login}
      </p>
    </li>
  );
}
