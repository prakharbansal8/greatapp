import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "../screens/Signup";
import Timeline from "../screens/Timeline/index";
import Signin from "../screens/Signin";
// import Email from "./Email";
import SinglePost from "../screens/SinglePost";

export const Routing = (props) => {
  return (
    <>
      <Switch>
        <Route exact path="/timeline" component={Timeline} />
        <Route path="/singlepost/:_id" component={SinglePost} exact />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/" component={Signup} />
      </Switch>
    </>
  );
};
