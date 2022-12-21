import bcrypt from "bcrypt";
import connection from "../database/db.js";
import userSchema from "../schema/authSchema.js";

export async function signUpValidation(req, res, next) {
  const user = req.body;

  try {
    const { error } = userSchema.validate(user, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send({ message: errors });
    }

    const emailExist = await connection.query(
      `SELECT email FROM users WHERE email=$1;`,
      [user.email]
    );
    if (emailExist.rowCount !== 0) {
      return res.status(409).send({ message: "Email já existente!" });
    }

    if (user.password !== user.confirmPassword) {
      return res.status(422).send({ message: "As senhas não confere!" });
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    res.locals.user = {
      ...user,
      password: passwordHash,
      confirmPassword: passwordHash,
    };
    next();
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}
