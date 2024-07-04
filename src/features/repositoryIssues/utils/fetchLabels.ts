import axios from "axios";

export default async function fetchLabels(user: string, repo: string, pageParam: string) {
  const res = await axios.get(
    `https://api.github.com/repos/${user}/${repo}/labels?page=${pageParam}&per_page=30`
  );
  return res;
}
