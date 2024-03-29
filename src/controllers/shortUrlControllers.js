import connection from "../database/db.js";

export async function urlPost(req, res) {
  const { userId, url, shortUrl, visitCount, createdAt } = res.locals.urlBody;

  try {
    await connection.query(
      `INSERT INTO "shortUrls" 
            ("userId", url, "shortUrl", "visitCount", "createdAt") 
        VALUES 
            ($1, $2, $3, $4, $5)`,
      [userId, url, shortUrl, visitCount, createdAt]
    );

    res.status(201).send({ shortUrl });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function urlIdGet(req, res) {
  const { id } = req.params;

  try {
    const shortUrl = await connection.query(
      `SELECT id, url, "shortUrl" FROM "shortUrls" WHERE id=$1`,
      [id]
    );
    if (shortUrl.rowCount === 0) {
      return res.status(404).send({ message: "Url não encontrada!" });
    }

    res.status(200).send(shortUrl.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function urlOpenGet(req, res) {
  const { shortUrl } = req.params;

  try {
    const shortUrlExist = await connection.query(
      `SELECT url, "visitCount" FROM "shortUrls" WHERE "shortUrl"=$1`,
      [shortUrl]
    );
    if (shortUrlExist.rowCount === 0) {
      return res.status(404).send({ message: "Url não encontrada!" });
    }

    const {visitCount}= shortUrlExist.rows[0]
    await connection.query(
      `UPDATE "shortUrls" SET "visitCount"=$2 WHERE "shortUrl"=$1`,
      [shortUrl, visitCount+1]
    );

    res.redirect(shortUrlExist.rows[0].url);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function urlDelete(req, res) {
  const { id } = req.params;

  try {
    await connection.query(`DELETE FROM "shortUrls" WHERE id=$1`, [id]);

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}
