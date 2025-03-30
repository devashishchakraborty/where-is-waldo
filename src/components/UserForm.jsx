import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserForm = ({ score }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    try {
      // const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, score }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      navigate("/leaderboard");
    } catch (err) {
      console.error("Error uploading data:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-80 rounded-lg bg-white p-6 shadow-lg">
        <form
          action="#"
          onSubmit={handleUserSubmit}
          className="flex flex-col gap-4"
        >
          <label htmlFor="username" className="font-medium text-gray-700">
            Enter Username to record score:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-red-800 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-red-800 py-2 text-white transition duration-200 hover:bg-red-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
