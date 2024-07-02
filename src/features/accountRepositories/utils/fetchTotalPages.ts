import axios from "axios";

export default async function fetchTotalPages(searchQuery: null | string, user: string) {
  if (searchQuery === null) {
    const res = await axios.get(`https://api.github.com/users/${user}`);
    return res.data.public_repos;
  }

  const res = await axios.get(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(
      `${searchQuery} user:${user}`
    )}&per_page=1`
  );
  return res.data.total_count;
}
