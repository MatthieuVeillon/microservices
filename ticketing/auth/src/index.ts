import mongoose from "mongoose";
import app from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JSON_KEY needs to be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to mongo DB");
  } catch (e) {
    console.log(e);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!");
  });
};

start();
