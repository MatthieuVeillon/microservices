import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users/currentuser", (req, res) => {
  res.send("Hi There");
});

app.listen(() => {
  console.log("Listening on port 3000!!!!");
});
