import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "../src/screens/Signup";
import Timeline from "../src/screens/Timeline/index";
import Signin from "./screens/Signin";
// import Email from "./Email";
import SinglePost from "./screens/SinglePost";
import PrivateRoute from "./PrivateRoute";

const Routing = (props) => {
  return (
    <>
      <Switch>
        <Route exact path="/timeline" component={Timeline} />
        <Route path="/singlepost/:_id" component={SinglePost} exact />
        {/* <Route path="/singlepost/:_id" component={SinglePost} /> */}
        <Route exact path="/login" component={Signin} />

        <Route exact path="/" component={Signup} />
      </Switch>
    </>
  );
};
export default Routing;
