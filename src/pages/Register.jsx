import { useState } from "react";
import axios from "axios";

import "../css/style2.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [number, setNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailFilled, setEmailFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);
  const [lastNameFilled, setLastNameFilled] = useState(false);
  const [firstNameFilled, setFirstNameFilled] = useState(false);
  const [numberFilled, setNumberFilled] = useState(false);
  const [confirmPasswordFilled, setConfirmPasswordFilled] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      !lastName ||
      !firstName ||
      !number ||
      !confirmPassword
    )
      return;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "password does not match confirm password",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios.post(
        `${import.meta.env.BASE_URL}/auth/register`,
        { email, password, lastName, firstName, number },
        config
      );
      Swal.fire({
        icon: "success",
        title: "Successfully signed up",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: err.response.data.message,
        showConfirmButton: false,
        timer: 10500,
        customClass: {
          container: "swal-container",
        },
      });
    }
  };

  const handleInputChange = (e, setState, setFilledState) => {
    setState(e.target.value);
    setFilledState(e.target.value !== "");
  };

  return (
    <div className="mt-80">
      <div className="container">
        <ToastContainer />
        <section id="formHolder">
          <div className="row">
            {/* Brand Box */}
            <div className="col-sm-6 brand">
              <a href="#" className="logo">
                MR <span>.HIEU</span>
              </a>
              <div className="heading">
                <h2>Hieu</h2>
                <p>Your Right Choice</p>
              </div>
              <div className="success-msg">
                <p>Great! You are one of our members now</p>
                <a href="#" className="profile">
                  Your Profile
                </a>
              </div>
            </div>
            {/* Form Box */}
            <div className="col-sm-6 form">
              <div className="signup form-peice">
                <form className="signup-form">
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className={firstNameFilled ? "hidden-label" : ""}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) =>
                        handleInputChange(e, setFirstName, setFirstNameFilled)
                      }
                      name="username"
                      id="name"
                      className="name"
                    />
                    <span className="error" />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className={lastNameFilled ? "hidden-label" : ""}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) =>
                        handleInputChange(e, setLastName, setLastNameFilled)
                      }
                      name="lastname"
                      id="lastname"
                      className="name"
                    />
                    <span className="error" />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="email"
                      className={emailFilled ? "hidden-label" : ""}
                    >
                      Email Adderss
                    </label>
                    <input
                      type="email"
                      name="emailAdress"
                      id="email"
                      className="email"
                      value={email}
                      onChange={(e) =>
                        handleInputChange(e, setEmail, setEmailFilled)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="phone"
                      className={numberFilled ? "hidden-label" : ""}
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={number}
                      onChange={(e) =>
                        handleInputChange(e, setNumber, setNumberFilled)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className={passwordFilled ? "hidden-label" : ""}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="pass"
                      value={password}
                      onChange={(e) =>
                        handleInputChange(e, setPassword, setPasswordFilled)
                      }
                    />
                    <span className="error" />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="passwordCon"
                      className={confirmPasswordFilled ? "hidden-label" : ""}
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="passwordCon"
                      id="passwordCon"
                      className="passConfirm"
                      value={confirmPassword}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          setConfirmPassword,
                          setConfirmPasswordFilled
                        )
                      }
                    />
                    <span className="error" />
                  </div>
                  <div className="CTA" style={{ paddingBottom: "20px" }}>
                    <input
                      type="submit"
                      id="submit"
                      onClick={(e) => signup(e)}
                    ></input>
                    <Link to="/login" className="switch">
                      I have an account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
