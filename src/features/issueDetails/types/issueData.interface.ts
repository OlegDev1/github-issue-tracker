import Label from "../../repositoryIssues/types/label.interface";

export default interface IssueData {
  state: "open" | "closed";
  title: string;
  labels: Label[];
  body: string;
  updated_at: string;
  comments: number;
  user: {
    login: string;
  };
  number: number;
}
