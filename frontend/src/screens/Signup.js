import React, { useState } from "react";
// import logo from './logo.svg';
import axios from "axios";
// import "../../public/css/register.css";
import { Link } from "react-router-dom";
import Welcome from "../components/Welcome";
import Loader from "../components/Loader";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NavCollapse from "../components/NavCollapse";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [first, setfirst] = useState("");
  const [last, setlast] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [emailerr, setemailerr] = useState("");
  const [usernameerr, setusernameerr] = useState("");
  const [registered, setregistered] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const focusChange = (event) => {
    seterrorMsg("");
    setemailerr("");
    setusernameerr("");
    setregistered("");
  };

  const submitForm = (event) => {
    event.preventDefault();
    setisLoading(true);
    setTimeout(() => {
      axios
        .post("http://localhost:8098/signup", { username, password, email, first, last })
        .then((res) => {
          seterrorMsg(res.data);
          if (res.data === "Email Already In Use") {
            setisLoading(false);
            setregistered("");
            setemailerr(res.data);
            setusernameerr("");
          } else if (res.data === "Username Already Taken") {
            setisLoading(false);
            setusernameerr(res.data);
            setemailerr("");
          } else {
            setisLoading(false);
            setregistered(res.data);
            setusernameerr("");
            setemailerr("");
          }
        })
        .catch((err) => {
          console.log("errr", err);
        });
    }, 5000);
  };

  console.log(props);
  return (
    <div>
      <Header />
      {isLoading && <Loader isLoading={isLoading} />}
      <NavCollapse />

      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="register_sec">
              <form id="registrationForm" onSubmit={submitForm} autocomplete="off">
                <h1>Create An Account</h1>
                <ul>
                  <li>
                    <span>
                      Username&nbsp;&nbsp;<strong className="errorMsg">{usernameerr}</strong>
                    </span>
                    <input
                      type="text"
                      name="username"
                      onChange={(event) => {
                        setusername(event.target.value);
                      }}
                      onFocus={focusChange}
                      id={errorMsg === "Username Already Taken" ? "username-css" : " "}
                      placeholder="Enter your username"
                      required
                    />
                  </li>
                  <li>
                    <span>Password</span>
                    <input
                      type="password"
                      name="password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      placeholder="Enter your password"
                      required
                    />
                  </li>
                  <li>
                    <span>
                      Email&nbsp;&nbsp;<strong className="errorMsg">{emailerr}</strong>
                    </span>
                    <input
                      type="email"
                      name="email"
                      // id="email"
                      id={errorMsg === "Email Already In Use" ? "email-css" : " "}
                      // {this.state.temp}
                      onFocus={focusChange}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      placeholder="Enter your email"
                      required
                    />
                  </li>
                  <li>
                    <span>First Name</span>
                    <input
                      type="text"
                      name="first"
                      onChange={(event) => {
                        setfirst(event.target.value);
                      }}
                      placeholder="Enter your first name"
                      required
                    />
                  </li>
                  <li>
                    <span>Last Name</span>
                    <input
                      type="text"
                      name="last"
                      onChange={(event) => {
                        setlast(event.target.value);
                      }}
                      placeholder="Enter your last name"
                      required
                    />
                  </li>

                  <li>
                    <input type="submit" defaultValue="Register" />
                    &nbsp;&nbsp;<strong className="successRegister">{registered}</strong>
                  </li>
                </ul>
              </form>
              <div className="addtnal_acnt">
                I already have an account.
                <a href>
                  <Link to="/login">Login My Account !</Link>
                </a>
              </div>
            </div>
          </div>
          <Welcome />
        </div>
      </div>
      <div className="clear" />
    </div>
  );
};
export default Signup;
