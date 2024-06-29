import RepositoryData from "../types/repository.interface";
import "./Repository.css";

export default function Repository({ repo }: { repo: RepositoryData }) {
  return (
    <li className="repository__section">
      <h1 className="repository__title">{repo.name}</h1>
      {repo.description && <p className="repository__description">{repo.description}</p>}
      <div className="repository__details">
        {repo.language && <span className="repository__language">{repo.language}</span>}
        <span className="repository__stars">Stars: {repo.stargazers_count}</span>
      </div>
    </li>
  );
}
