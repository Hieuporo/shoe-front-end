import { useState } from "react";
import "../css/font-awesome.min.css";
import "../css/style1.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Login = () => {
  const { setGetUserInfo, getUserInfo } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await axios.post("api/auth/login", { email, password }, config);
      Swal.fire({
        icon: "success",
        title: "Successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });
      setGetUserInfo(!getUserInfo);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w3l-signinform mt-80">
        {/* container */}
        <div className="wrapper">
          {/* main content */}
          <div className="w3l-form-info">
            <div className="w3_info">
              <h2 style={{ marginTop: "120px" }}>Log In</h2>
              <form>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Email"
                    required=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group two-groop">
                  <input
                    type="Password"
                    placeholder="Password"
                    value={password}
                    required=""
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-primary btn-block btn-login"
                  onClick={(e) => login(e)}
                >
                  Log In
                </button>
              </form>
              <p className="account">
                Dont have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
