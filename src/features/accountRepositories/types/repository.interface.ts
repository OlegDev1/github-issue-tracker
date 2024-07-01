export default interface RepositoryData {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  owner: {
    login: string;
  };
}
