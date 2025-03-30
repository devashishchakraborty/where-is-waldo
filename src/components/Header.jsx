import { Link } from "react-router-dom";
import Waldo from "../assets/waldo.png";
import Wizard from "../assets/wizard.png";
import Odlaw from "../assets/odlaw.png";
import { getOpacity } from "../utils";

const Header = ({ charactersLeft }) => {
  return (
    <header className="border-b-2 p-3 pr-10 pl-10 text-red-800">
      <nav className="flex items-center justify-between gap-4">
        <ul className="flex gap-2">
          <li className="flex items-center text-4xl font-bold">
            <Link to="/">Where's Waldo</Link>
          </li>
        </ul>
        <ul className="flex gap-6">
          <li style={{ opacity: getOpacity(charactersLeft, 1) }}>
            <img src={Waldo} className="h-16 w-16" alt="" />
          </li>
          <li style={{ opacity: getOpacity(charactersLeft, 2) }}>
            <img src={Wizard} className="h-16 w-16" alt="" />
          </li>
          <li style={{ opacity: getOpacity(charactersLeft, 3) }}>
            <img src={Odlaw} className="h-16 w-16" alt="" />
          </li>
        </ul>
        <ul className="flex gap-4 text-2xl font-medium">
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
