import "./Issue.css";
import IssueData from "../types/issue.interface";

export default function Issue({ issue }: { issue: IssueData }) {
  return (
    <li className="issue__section">
      <h1 className="issue__title">{issue.title}</h1>
      <p className="issue__data">
        #{issue.number} by {issue.user.login}
      </p>
    </li>
  );
}
