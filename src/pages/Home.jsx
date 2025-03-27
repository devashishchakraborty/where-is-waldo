import mainImage from "../assets/main-image.jpg";
import { useRef, useState } from "react";
import Waldo from "../assets/waldo.png";
import Wizard from "../assets/wizard.png";
import Odlaw from "../assets/odlaw.png";

const Home = () => {
  const [clickInfo, setClickInfo] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const targetingBoxRef = useRef(null);
  const dropdownBoxRef = useRef(null);

  const [charactersLeft, setCharactersLeft] = useState([
    { id: 0, name: "Waldo", image: Waldo },
    { id: 1, name: "Wizard", image: Wizard },
    { id: 2, name: "Odlaw", image: Odlaw },
  ]);

  const handleSubmit = (event) => {
    targetingBoxRef.current.style.display = "none";
    dropdownBoxRef.current.style.display = "none";
  }

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    setClickInfo({ x, y, height, width });
    if (targetingBoxRef.current) {
      targetingBoxRef.current.style.left = `${x}px`;
      targetingBoxRef.current.style.top = `${y}px`;
      targetingBoxRef.current.style.transform = "translate(-50%, -50%)";

      targetingBoxRef.current.style.display =
        targetingBoxRef.current.style.display === "block" ? "none" : "block";
    }

    if (dropdownBoxRef.current) {
      if (width - x > 150) dropdownBoxRef.current.style.left = `${x + 20}px`;
      else dropdownBoxRef.current.style.left = `${x - 150}px`;

      if (height - y > 150) dropdownBoxRef.current.style.top = `${y}px`;
      else dropdownBoxRef.current.style.top = `${y - 150}px`;

    
      dropdownBoxRef.current.style.display =
        dropdownBoxRef.current.style.display === "block" ? "none" : "block";
    }
  };
  return (
    <>
      <div>
        Page X: {clickInfo.x}, Page Y: {clickInfo.y}, Width: {clickInfo.width}, Height: {clickInfo.height}
      </div>
      <div className="imageContainer relative">
        <img
          className="cursor-crosshair"
          src={mainImage}
          alt=""
          onClick={handleClick}
        />
        <div
          ref={targetingBoxRef}
          className="absolute hidden h-10 w-10 cursor-pointer rounded-full border-2 border-dotted bg-gray-300/50"
        ></div>
        <ul
          ref={dropdownBoxRef}
          className="absolute hidden w-30 cursor-pointer bg-gray-50 shadow-xl"
        >
          {charactersLeft.map((character) => (
            <li
              className="flex h-10 items-center p-2 hover:bg-gray-200"
              key={character.id}
              onClick={handleSubmit}
            >
              <img className="h-[100%]" src={character.image} alt="" />{" "}
              <div className="grow">{character.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
