import Label from "./label.interface";

export default interface IssueData {
  title: string;
  number: number;
  user: {
    login: string;
  };
  labels: Label[];
}
