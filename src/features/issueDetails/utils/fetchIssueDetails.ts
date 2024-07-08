import axios from "axios";

export default async function fetchIssueDetails(user: string, repo: string, issue: string) {
  const res = await axios.get(`https://api.github.com/repos/${user}/${repo}/issues/${issue}`);
  return res.data;
}
