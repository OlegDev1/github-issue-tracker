import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import "./RepositorySearch.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RepositorySearch() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    navigate(`/users/${searchInput}?page=1`);
  }
  return (
    <main className="main">
      <h1 className="main__title">Type in the github username</h1>
      <div className="main__controls">
        <Input
          className="main__input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button className="main__button" onClick={handleSubmit}>
          Search
        </Button>
      </div>
    </main>
  );
}
