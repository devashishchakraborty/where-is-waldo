import { Link } from "react-router-dom";
import mainLogo from "../assets/icon.jpeg"

const Header = () => {
  return (
    <header className="border-b-2 text-red-800 p-3 pl-18 pr-18">
      <nav className="flex gap-4 items-center justify-between">
        <ul className="flex gap-2">
          <li><img src={mainLogo} className="w-12 h-12 mix-blend-multiply" alt="" /></li>
          <li className="flex text-4xl font-bold items-center" ><Link to="/">Where's Waldo</Link></li>
        </ul>
        <ul className="flex text-2xl gap-4 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
