import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <nav className="flex justify-center gap-6 bg-gray-800 text-white py-4 shadow">
        <Link className="hover:text-blue-400 transition" to="/">Home</Link>
        <Link className="hover:text-blue-400 transition" to="/admin">Admin</Link>
      </nav>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;