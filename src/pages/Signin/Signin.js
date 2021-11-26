import { Link } from "react-router-dom";
import { useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../app/actions/user";
import { useDispatch } from "react-redux";
import GoogleAuth from "../../components/googleLogin/googleLogin";
function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    const data = { email, password };
    dispatch(signIn(data, navigate));
  };
  return (
    <div className="s_in_c">
      <div className="s_in_cf">
        <div>
          <Link to="/" className="logoSignin">
            Sign In
          </Link>
        </div>
        <div className="s_in__c_c">
          <div className="s_in_c_in">
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="s_in_c_in">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="den_bnt" onClick={handleSubmit}>
            Log In
          </div>
        </div>
        <div>
          <p className="or_text">OR</p>
        </div>
        <div className="">
          <GoogleAuth />
        </div>
        <div>
          <p className="fotgot_text">Forgotten your password?</p>
        </div>
      </div>
      <div className="signin__text">
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Signin;
