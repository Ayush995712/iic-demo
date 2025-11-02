import React, { useState } from "react";

function Admin() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
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
    } finally {
      setTimeout(() => setIsLoggingIn(false), 600);
    }
  };

  const fetchUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`);
    const data = await res.json();
    setUsers(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br p-6">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-10 border border-orange-200 hover:shadow-2xl transition duration-300">
        {!loggedIn ? (
          <>
            <h2 className="text-3xl font-extrabold font-serif text-center mb-6 bg-linear-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
              Admin Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="text"
                name="username"
                placeholder="Admin Username"
                value={loginData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm hover:shadow-md transition"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm hover:shadow-md transition"
                required
              />
              <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full py-3 rounded-xl font-semibold text-white cursor-pointer transition-all duration-300 transform ${
                  isLoggingIn
                    ? "bg-linear-to-r from-rose-400 to-orange-400 scale-95 animate-pulse"
                    : "bg-linear-to-r from-rose-500 to-orange-500 hover:scale-105 hover:shadow-lg"
                }`}
              >
                {isLoggingIn ? "Signing in..." : "Login"}
              </button>
            </form>

            {message && (
              <p className="text-center mt-5 text-red-500 font-semibold animate-fade-in">
                {message}
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold font-serif mb-6 text-center bg-linear-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
              Registered Users
            </h2>

            {users.length === 0 ? (
              <p className="text-gray-500 text-center">No users found.</p>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-orange-200 shadow-md">
                <table className="min-w-full bg-white text-gray-700 rounded-2xl overflow-hidden">
                  <thead className="bg-linear-to-r from-orange-100 to-rose-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wide">
                        Username
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wide">
                        Email
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wide">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u._id}
                        className="border-t border-orange-100 hover:bg-linear-to-r hover:from-rose-50 hover:to-orange-50 transition-all duration-300 cursor-pointer"
                      >
                        <td className="py-3 px-4">{u.username}</td>
                        <td className="py-3 px-4">{u.email}</td>
                        <td className="py-3 px-4">
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
    </div>
  );
}

export default Admin;