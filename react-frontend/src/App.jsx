import "./App.css";
import LoginButton from "./components/LoginButton";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const { isAuthenticated } = useAuth0();


  return (
    <Router>
      <div>
        <Navbar />
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        ) : (
          <LoginButton />
        )}
      </div>
    </Router>
  );
};

export default App;