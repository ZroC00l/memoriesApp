import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found. Please sign up to get access" });
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
    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const oldUser = await User.findOne({ email });

    /*if (!(firstName && lastName && email && password && confirmPassword)) {
      return res.status(400).json({ message: "Please fill all fields" });
    }*/
    if (oldUser) {
      return res
        .status(400)
        .json({ message: "User already exists, please sign in" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    //encrypt userpassword for new user
    const encryptedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: encryptedPassword,
      name: `${firstName} ${lastName}`,
    });

    //create JWT token for new user
    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
