import axios from "axios";

export default async function fetchAssignees(user: string, repo: string, pageParam: string) {
  const res = await axios.get(
    `https://api.github.com/repos/${user}/${repo}/assignees?page=${pageParam}&per_page=30`
  );
  return res;
}
