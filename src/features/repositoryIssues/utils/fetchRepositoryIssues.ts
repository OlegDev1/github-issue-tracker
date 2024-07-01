import axios from "axios";

export default async function fetchRepositoryIssues(user: string, repo: string, page: number) {
  const res = await axios.get(
    ` https://api.github.com/repos/${user}/${repo}/issues?page=${page}&per_page=30`
  );
  return res.data;
}
