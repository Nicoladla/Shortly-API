import connection from "../database/db.js";

export function MyshortUrlsGet(req, res) {
    const {id: userId}= res.locals.user

  try {
    const myShortUrls = connection.query(`SELECT * FROM`)

    res.status(200).send(myShortUrls)
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}