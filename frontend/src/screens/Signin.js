import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Welcome from "../components/Welcome";
import Loader from "../components/Loader";
import Header from "../components/Header/Header";
import NavCollapse from "../components/NavCollapse";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [emailerr, setemailerr] = useState("");
  const [passworderr, setpassworderr] = useState("");
  const [registered, setregistered] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [loggedUser, setloggedUser] = useState("");

  const focusChange = (event) => {
    seterrorMsg("");
    setemailerr("");
    setpassworderr("");
    setregistered("");
  };
  useEffect(() => {
    // if (localStorage.getItem("token") !== null) {
    //   console.log("loval storage.....");
    //   props.history.push({
    //     pathname: "/timeline",
    //     data: loggedUser, // your data array of objects
    //   });
    // }
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      axios
        .post(
          "http://localhost:8098/verifyToken",
          {},
          {
            headers: { authorization: token },
          }
        )
        .then((res) => {
          console.log("result", res.data.success);
          if (res.data.success)
            props.history.push({
              pathname: "/timeline",
              data: loggedUser, // your data array of objects
            });
        });
    }
  }, [loggedUser, props.history]);

  const submitForm = (event) => {
    event.preventDefault();
    setisLoading(true);
    axios
      .post("http://localhost:8098/login", { email, password })
      .then((res) => {
        seterrorMsg(res.data.status);
        // console.log("Access Token ------------>", res.data.accessToken);
        if (res.data.status === "Wrong Password") {
          setisLoading(false);
          setregistered("");
          setpassworderr(res.data.status);
          setemailerr("");
        } else if (res.data.status === "User Not Exist") {
          setisLoading(false);
          setemailerr(res.data.status);
          setpassworderr("");
          setregistered("");
        } else {
          setregistered(res.data.status);
          console.log(">>>>>>>>>>>>>>>>>>>>>>???", res.data);
          localStorage.setItem("Id", res.data.user._id);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem(
            "User",
            JSON.stringify({
              username: res.data.user.username,
              email: res.data.user.email,
              first: res.data.user.first,
              last: res.data.user.last,
            })
          );
          // localStorage.setItem("temp", res.data);
          console.log("Logged User Details------------->", res.data.user);
          setloggedUser(res.data.user);
          setisLoading(false);
          setpassworderr("");
          setemailerr("");
          console.log("loval storage.....");
          props.history.push({
            pathname: "/timeline",
            data: res.data.user, // your data array of objects
          });
        }
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  console.log("Signin Props", props);
  return (
    <div>
      <Header />
      {isLoading && <Loader isLoading={isLoading} />}
      <meta charSet="utf-8" />
      <title>Login Account</title>
      <NavCollapse />

      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="login_sec">
              <h1>Log In</h1>
              <form onSubmit={submitForm} autoComplete="off">
                <ul>
                  <li>
                    <span>
                      Email-ID&nbsp;&nbsp;<strong className="errorMsg">{emailerr}</strong>
                    </span>
                    <input
                      type="email"
                      name="email"
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      onFocus={focusChange}
                      id={errorMsg === "User Not Exist" ? "username-css" : " "}
                      placeholder="Enter your email"
                      required
                    />
                  </li>
                  <li>
                    <span>
                      Password&nbsp;&nbsp;<strong className="errorMsg">{passworderr}</strong>
                    </span>
                    <input
                      type="password"
                      name="password"
                      onFocus={focusChange}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      id={errorMsg === "Wrong Password" ? "email-css" : " "}
                      placeholder="Enter your password"
                      required
                    />
                  </li>
                  <li>
                    <input type="submit" defaultValue="Log In" />
                    <a href>Forgot Password</a>
                    &nbsp;&nbsp;<strong className="successRegister">{registered}</strong>
                  </li>
                </ul>
              </form>
              <div className="addtnal_acnt">
                I do not have any account yet.
                <a href>
                  <Link to="/">Create My Account Now !</Link>
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
export default Signin;
