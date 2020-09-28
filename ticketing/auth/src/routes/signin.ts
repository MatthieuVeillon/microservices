import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/badRequestError";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be Valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const isPasswordMatching = await Password.compare(
      existingUser.password,
      password
    );

    if (!isPasswordMatching) {
      throw new BadRequestError("Invalid Credentials");
    }

    //Generate JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY! //ignore TS error as we already check the env variable inside app.ts
    );

    //store it on the session object
    req.session = { jwt: userJwt };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
