import connection from "../database/db.js";

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
    res.status(500).send(err);
    console.log(err);
  }
}

export async function signIn(req, res) {}
