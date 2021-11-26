import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [loggedIn, user]);
  const handleSubmit = () => {
    localStorage.clear();
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  Blogs
                </Link>
              </li>
            </ul>
            <form class="d-flex">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {user === "" ? (
                  <li class="nav-item" onClick={() => navigate("/signin")}>
                    <a class="nav-link active" aria-current="page">
                      login
                    </a>
                  </li>
                ) : (
                  <li class="nav-item"  onClick={handleSubmit}>
                    <a class="nav-link active" aria-current="page">
                      logout
                    </a>
                  </li>
                )}

                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    {user?.name}
                  </a>
                </li>
                <li>
                  <Avatar
                    className=""
                    alt={user?.name}
                    src={user?.pic}
                  ></Avatar>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
