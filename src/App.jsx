import { Route, Routes, Link, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./components/NotFound";
import About from "./pages/About";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
