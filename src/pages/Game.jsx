import mainImage from "../assets/main-image.jpg";
import { useEffect, useRef, useState } from "react";
import { normalizeAxes } from "../utils";
import checkmark from "../assets/checkmark.svg";
import UserForm from "../components/UserForm";

const Game = ({ charactersLeft, setCharactersLeft }) => {
  const [clickInfo, setClickInfo] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const [checkboxes, setCheckboxes] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(null);
  const targetingBoxRef = useRef(null);
  const dropdownBoxRef = useRef(null);

  // For increasing the timer/score
  useEffect(() => {
    let interval;
    if (charactersLeft.length > 0) {
      interval = setInterval(() => {
        setScore((prev) => prev + 1);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [charactersLeft]);

  // Small message box appearing at top right.
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
      const { x, y } = normalizeAxes(clickInfo);
      // const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `http://localhost:3000/api/characters/${character.id}?x=${x}&y=${y}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setCheckboxes((prev) => [
          ...prev,
          { left: clickInfo.x, top: clickInfo.y },
        ]);

        setCharactersLeft((prev) => {
          return prev.filter((prevChar) => character.id != prevChar.id);
        });

        setMessage(`Great! You Found ${character.name}`);
      } else {
        setMessage(`Nah bruh, ${character.name} is not there.`);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setMessage(err.message);
    }
  };

  const handleClick = (event) => {
    // Retrieving the pixel position at click.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    setClickInfo({ x, y, height, width });

    // Displaying targeting circular box and dropdown box at the given pixel position
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
                className={`absolute -translate-1/2 rounded-full border-3 border-green-700 bg-gray-50`}
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

        <div className="fixed top-24 left-4 rounded-2xl bg-gray-100 p-2 text-2xl font-bold text-red-800">
          Timer: {score / 100}s
        </div>
      </div>
      {charactersLeft.length == 0 && message == null && (
        <UserForm score={score} />
      )}
    </>
  );
};

export default Game;
