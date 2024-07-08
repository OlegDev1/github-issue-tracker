import "./Issue.css";
import IssueData from "../types/issue.interface";
import { useNavigate } from "react-router-dom";
import getTextColor from "../utils/getTextColorByBackground";

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
      onClick={() => navigate(`/users/${user}/issues/${repo}/issue/${issue.number}`)}
      key={issue.number}>
      <div className="issue__title">
        <h1 className="issue__title-title">{issue.title}</h1>
        {issue.labels.map((item) => (
          <span
            key={item.id}
            className="label__section"
            style={{
              backgroundColor: "#" + item.color,
              color: getTextColor(item.color),
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
