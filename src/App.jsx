import { Route, Routes, Link, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import Waldo from "./assets/waldo.png";
import Wizard from "./assets/wizard.png";
import Odlaw from "./assets/odlaw.png";
import Home from "./pages/Home";
import { useState } from "react";

function App() {
  const [charactersLeft, setCharactersLeft] = useState([
    { id: 1, name: "Waldo", image: Waldo },
    { id: 2, name: "Wizard", image: Wizard },
    { id: 3, name: "Odlaw", image: Odlaw },
  ]);
  return (
    <>
      <Header charactersLeft={charactersLeft} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/game"
            element={
              <Game
                charactersLeft={charactersLeft}
                setCharactersLeft={setCharactersLeft}
              />
            }
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
