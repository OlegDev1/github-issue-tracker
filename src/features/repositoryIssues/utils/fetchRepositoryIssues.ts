import axios from "axios";

export default async function fetchRepositoryIssues(
  user: string,
  repo: string,
  page: number,
  status: "opened" | "closed",
  label: string | undefined,
  assignee: string | undefined
) {
  const res = await axios.get(
    `https://api.github.com/repos/${user}/${repo}/issues?page=${page}&per_page=30&state=${
      status === "opened" ? "open" : "closed"
    }${label !== undefined ? "&labels=" + encodeURI(label) : ""}${
      assignee !== undefined ? "&assignee=" + encodeURI(assignee) : ""
    }`
  );
  return res.data;
}
