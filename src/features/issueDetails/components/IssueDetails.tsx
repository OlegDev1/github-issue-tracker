import IssueData from "../types/issueData.interface";
import getMarkdownit from "../utils/getMarkdownit";
import "./IssueDetails.css";
import BackButton from "../../../components/ui/backButton";

type IssueDetailsProps = {
  issue: IssueData;
};

export default function IssueDetails({ issue }: IssueDetailsProps) {
  const md = getMarkdownit();

  return (
    <main className="issue__main">
      <nav className="issueDetails__nav">
        <BackButton />
        <div className="issueDetails__title section">
          <h1 className="issueDetails__title title">{issue.title}</h1>
          <span className="issueDetails__title number"> #{issue.number}</span>
        </div>
      </nav>
      <div
        className="issueDetails__body"
        dangerouslySetInnerHTML={{ __html: md.render(issue.body) }}></div>
    </main>
  );
}
