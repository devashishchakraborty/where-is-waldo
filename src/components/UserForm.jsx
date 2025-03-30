import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const UserForm = ({ score }) => {
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/users`, {
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
    setIsSubmitting(false);
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
            className="cursor-pointer rounded-md bg-red-800 py-2 text-white transition duration-200 hover:bg-red-700 flex justify-center items-center"
          >
            {isSubmitting ? <Loading /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
