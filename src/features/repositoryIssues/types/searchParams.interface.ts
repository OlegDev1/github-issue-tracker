export default interface SearchParamsTypes {
  page: string;
  status: "opened" | "closed";
  label?: string;
  assignee?: string;
}
