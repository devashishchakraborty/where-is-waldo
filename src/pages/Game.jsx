import mainImage from "../assets/main-image.jpg";
import { useEffect, useRef, useState } from "react";
import Waldo from "../assets/waldo.png";
import Wizard from "../assets/wizard.png";
import Odlaw from "../assets/odlaw.png";
import { normalizeAxes } from "../utils";
import checkmark from "../assets/checkmark.svg";

const Game = () => {
  const [clickInfo, setClickInfo] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const [checkboxes, setCheckboxes] = useState([]);
  const targetingBoxRef = useRef(null);
  const dropdownBoxRef = useRef(null);
  const [message, setMessage] = useState(null);

  const [charactersLeft, setCharactersLeft] = useState([
    { id: 1, name: "Waldo", image: Waldo },
    { id: 2, name: "Wizard", image: Wizard },
    { id: 3, name: "Odlaw", image: Odlaw },
  ]);

  useEffect(() => {
    if (!message) return;

    const timeoutId = setTimeout(() => {
      setMessage(null);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [message]);

  const handleSubmit = async (character) => {
    targetingBoxRef.current.style.display = "none";
    dropdownBoxRef.current.style.display = "none";

    try {
      // const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `http://localhost:3000/api/check-character`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            characterId: character.id,
            ...normalizeAxes(clickInfo),
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setMessage(`Great! You Found ${character.name}`);
        setCheckboxes((prev) => [
          ...prev,
          { left: clickInfo.x, top: clickInfo.y },
        ]);
        setCharactersLeft((prev) => {
          return prev.filter((prevChar) => character.id != prevChar.id);
        });
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } else {
        setMessage(`Nah bruh, ${character.name} is not there.`);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setMessage(err.message);
    }
  };

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    setClickInfo({ x, y, height, width });

    // Displaying targeting circular box and dropdown box
    if (targetingBoxRef.current) {
      targetingBoxRef.current.style.left = `${x}px`;
      targetingBoxRef.current.style.top = `${y}px`;
      targetingBoxRef.current.style.transform = "translate(-50%, -50%)";

      targetingBoxRef.current.style.display =
        targetingBoxRef.current.style.display === "block" ? "none" : "block";
    }

    // Make the dropdown box appear within view
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
      <div className="imageContainer relative">
        <img
          className="cursor-crosshair"
          src={mainImage}
          alt=""
          onClick={(e) => (charactersLeft.length > 0 ? handleClick(e) : false)}
        />
        {checkboxes.length > 0 &&
          checkboxes.map((checkbox) => {
            return (
              <img
                key={checkbox.left + checkbox.top}
                src={checkmark}
                className={`absolute rounded-full border-3 border-green-700 -translate-1/2 bg-gray-50`}
                style={{
                  left: `${parseInt(checkbox.left)}px`,
                  top: `${parseInt(checkbox.top)}px`,
                }}
              />
            );
          })}
        {message && (
          <div className="fixed top-24 right-4 transform animate-[fadeUp_1s_ease_backwards] rounded-xs bg-white p-4 shadow">
            <div>{message}</div>
          </div>
        )}

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
              onClick={() => handleSubmit(character)}
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

export default Game;
