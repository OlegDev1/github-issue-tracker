import axios from "axios";

export default async function fetchRepositoryIssues(
  user: string,
  repo: string,
  page: number,
  status: "opened" | "closed"
) {
  const res = await axios.get(
    `https://api.github.com/repos/${user}/${repo}/issues?page=${page}&per_page=30&state=${
      status === "opened" ? "open" : "closed"
    }`
  );
  return res.data;
}
