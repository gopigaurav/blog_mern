import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BlogPage from "./pages/BlogPage/BlogPage";
import AlanAi from "./pages/AlanAi/AlanAi";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedIn } from "./app/actions/user";
// <Route path="/news" element={<Navigate to="" />} />
function App() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoggedIn());
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BlogPage />} />
          <Route path="/news" element={<AlanAi />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
