import React, { useState } from "react";

function Admin() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok) {
        setLoggedIn(true);
        setMessage("Welcome, Admin!");
        fetchUsers();
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Error logging in");
    }
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
      {!loggedIn ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Admin Username"
              value={loginData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          {message && (
            <p className="text-center mt-4 text-red-500 font-medium">{message}</p>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Registered Users</h2>
          {users.length === 0 ? (
            <p className="text-gray-500 text-center">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                      Username
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="py-2 px-4">{u.username}</td>
                      <td className="py-2 px-4">{u.email}</td>
                      <td className="py-2 px-4">
                        {new Date(u.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Admin;
