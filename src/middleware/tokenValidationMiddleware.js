import connection from "../database/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const tokenValidation = jwt.verify(token, process.env.JWT_SECRET);

    const user = await connection.query(
      `SELECT id, name, email FROM users WHERE id=$1`,
      [tokenValidation.userId]
    );
    if (user.rowCount === 0) {
      return res.status(401).send({ message: "Token inválido!" });
    }

    res.locals.user = user.rows[0];
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Token inválido!" });
  }
}
