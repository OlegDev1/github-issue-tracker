import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomeRoute from "./routes/HomeRoute";
import RepositoriesRoute from "./routes/RepositoriesRoute";
import RepositoryIssuesRoute from "./routes/RepositoryIssuesRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/users/:user" element={<RepositoriesRoute />} />
      <Route path="/users/:user/issues/:repo" element={<RepositoryIssuesRoute />} />
    </Routes>
  );
}

export default App;
