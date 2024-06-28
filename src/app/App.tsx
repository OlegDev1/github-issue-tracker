import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Repositories from "./routes/Repositories";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repositories/:user" element={<Repositories />} />
    </Routes>
  );
}

export default App;
