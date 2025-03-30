import { useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
const Leaderboard = () => {
  const [users, setUsers] = useState(null);
  const tableCellStyle = "border-1 py-1 pr-15 pl-5";
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/users`, {
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
          <h2 className="text-3xl font-bold">Leaderboard</h2>
          {users ? (
            <table className="border-1 text-xl">
              <thead>
                <tr className="bg-gray-50">
                  <th className={tableCellStyle}>Rank</th>
                  <th className={tableCellStyle}>Name</th>
                  <th className={tableCellStyle}>Score (Time)</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td className={tableCellStyle}>{index + 1}</td>
                    <td className={tableCellStyle}>{user.username}</td>
                    <td className={tableCellStyle}>{user.score / 100}s</td>
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
