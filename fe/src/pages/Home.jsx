import React, { useState } from "react";

function Home() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.message);
      setFormData({ username: "", email: "", password: "" });
    } catch {
      setMessage("Error submitting user");
    } finally {
      setTimeout(() => setIsSubmitting(false), 600);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-orange-200 hover:shadow-2xl transition duration-300">
        <h2 className="text-3xl font-extrabold font-serif text-center mb-6 bg-linear-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
          User Submission Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm hover:shadow-md transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm hover:shadow-md transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm hover:shadow-md transition"
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold text-white cursor-pointer transition-all duration-300 transform ${
              isSubmitting
                ? "bg-linear-to-r from-rose-400 to-orange-400 scale-95 animate-pulse"
                : "bg-linear-to-r from-rose-500 to-orange-500 hover:scale-105 hover:shadow-lg"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-6 text-green-600 font-semibold animate-fade-in">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
