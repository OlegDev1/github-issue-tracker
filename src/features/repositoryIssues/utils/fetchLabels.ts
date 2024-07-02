import axios from "axios";

export default async function fetchLabels(user: string, repo: string) {
  const res = await axios.get(`https://api.github.com/repos/${user}/${repo}/labels`);
  return res.data;
}
