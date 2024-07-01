import axios from "axios";

export default async function fetchTotalPages(user, repo): Promise<number> {
  const res = await axios.get(
    `https://api.github.com/search/issues?q=repo:${user}/${repo}+is:issue+is:open&per_page=1`
  );
  return res.data.total_count;
}
