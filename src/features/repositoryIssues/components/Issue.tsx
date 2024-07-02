import "./Issue.css";
import IssueData from "../types/issue.interface";

export default function Issue({ issue }: { issue: IssueData }) {
  return (
    <li className="issue__section">
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
