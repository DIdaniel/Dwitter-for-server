import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as userRepository from "../data/auth.js";

// TODO : Make it secure!
const jwtSecretKey = "";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `$[username] already exists` });
  }

  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });

  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "맞지 않는 유저이거나 비번이댜" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "맞지 않는 유저이거나 비번이댜" });
  }
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}
