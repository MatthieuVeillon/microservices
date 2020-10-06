import React from "react";
import axios from "axios";
import BuidClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You're signed in</h1> : <h1>You're out</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await BuidClient(context).get("/api/users/currentuser");
  return data;
};

export default LandingPage;
