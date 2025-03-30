import { Route, Routes, Link, Navigate } from "react-router-dom";
import "./App.css";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
