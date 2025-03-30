import { Link } from "react-router-dom";
import Waldo from "../assets/waldo.png";
import Wizard from "../assets/wizard.png";
import Odlaw from "../assets/odlaw.png";
import WaldoLogo from "../assets/waldo-logo.png";
import { getOpacity } from "../utils";

const Header = ({ charactersLeft = null, score = null }) => {
  return (
    <header className="border-b-2 py-3 px-10 text-red-800 sticky top-0 z-10 bg-gray-50 ">
      <nav className="flex items-center justify-between gap-8">
        <ul className="flex gap-2">
          <li className="text-4xl font-bold">
            <Link to="/" className="flex items-center gap-3">
              <img src={WaldoLogo} className="h-10" alt="" />
              Where's Waldo
            </Link>
          </li>
        </ul>
        {charactersLeft && (
          <ul className="flex gap-6">
            <li style={{ opacity: getOpacity(charactersLeft, 1) }}>
              <img src={Waldo} className="h-10" alt="" />
            </li>
            <li style={{ opacity: getOpacity(charactersLeft, 2) }}>
              <img src={Wizard} className="h-10" alt="" />
            </li>
            <li style={{ opacity: getOpacity(charactersLeft, 3) }}>
              <img src={Odlaw} className="h-10" alt="" />
            </li>
          </ul>
        )}

        {score && (
          <div className="w-40 text-xl font-bold text-red-800">
            Timer: {score / 100}s
          </div>
        )}

        <ul className="flex gap-8 text-2xl font-medium">
          <li>
            <Link to="/game">Play</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
