import { useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
const Leaderboard = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`http://localhost:3000/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        return data;
      } catch (err) {
        console.error("Error uploading data:", err);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col items-center gap-6 p-8 text-red-900">
          <h2 className="text-3xl font-bold ">Leaderboard</h2>
          {users ? (
            <table className="border-1 text-xl">
              <thead>
                <tr>
                  <th className="border-1 p-1 pr-6 pl-6">Rank</th>
                  <th className="border-1 p-1 pr-6 pl-6">Name</th>
                  <th className="border-1 p-1 pr-6 pl-6">Score (Time)</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td className="border-1 p-1 pr-6 pl-6">{index + 1}</td>
                    <td className="border-1 p-1 pr-6 pl-6">{user.username}</td>
                    <td className="border-1 p-1 pr-6 pl-6">
                      {user.score / 100}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Loading />
          )}
        </div>
      </main>
    </>
  );
};

export default Leaderboard;
