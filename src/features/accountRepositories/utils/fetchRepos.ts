import axios from "axios";

export default async function fetchRepos(user: string, page: number, searchQuery: string | null) {
  const resp = await axios.get(
    searchQuery === null
      ? `https://api.github.com/users/${user}/repos?page=${page}&per_page=30`
      : `https://api.github.com/search/repositories?q=${encodeURIComponent(
          `${searchQuery} user:${user}`
        )}&page=${page}&per_page=30`
  );
  return searchQuery === null ? resp.data : resp.data.items;
}
