import axios from "axios";

export default async function fetchTotalPages(
  user: string,
  repo: string,
  status: "opened" | "closed"
): Promise<number> {
  const res = await axios.get(
    `https://api.github.com/search/issues?q=repo:${user}/${repo}+is:issue+is:${
      status === "opened" ? "open" : "closed"
    }&per_page=1`
  );
  return res.data.total_count;
}
