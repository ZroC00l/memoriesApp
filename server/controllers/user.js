import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect login credentials" });
    }
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json(existingUser);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!(firstName && lastName && email && password)) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res
        .status(400)
        .json({ message: "User already exists, please sign in" });
    }
    //encrypt userpassword for new user
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });

    //create JWT token for new user
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
    //save new user to database
    newUser.token = token;
    //send token to client
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};
