const axios = require("axios");
const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  console.log("event received", req.body);
  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event);
  axios.post("http://comments-srv:4006/events", event);
  axios.post("http://query-srv:4002/events", event);
  axios.post("http://moderation-srv:4003/events", event);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("listening on port 4005");
});
