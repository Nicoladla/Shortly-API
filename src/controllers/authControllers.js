import connection from "../database/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = res.locals.user;

  try {
    await connection.query(
      `INSERT INTO users 
        (name, email, password, "confirmPassword") 
      VALUES 
        ($1, $2, $3, $4);`,
      [name, email, password, confirmPassword]
    );

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

export async function signIn(req, res) {
  const { userId } = res.locals;

  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: 120,
    });

    res.status(200).send(token);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
