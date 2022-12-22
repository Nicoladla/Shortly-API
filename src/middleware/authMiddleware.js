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
    res.sendStatus(500);
    console.log(err);
  }
}

export async function signInValidation(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await connection.query(`SELECT * FROM users WHERE email=$1;`, [
      email,
    ]);
    if (
      user.rowCount === 0 ||
      !bcrypt.compareSync(password, user.rows[0].password)
    ) {
      return res.status(401).send({ message: "Email ou senha incorreto!" });
    }

    res.locals.userId = user.rows[0].id;
    next();
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
