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
