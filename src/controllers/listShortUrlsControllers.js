import connection from "../database/db.js";

export async function MyshortUrlsGet(req, res) {
  const { id: userId } = res.locals.user;

  try {
    const user = await connection.query(
      `SELECT 
        users.id, users.name, 
        SUM("shortUrls"."visitCount") AS "visitCount"
      FROM 
        users JOIN "shortUrls"
      ON
        users.id = "shortUrls"."userId"
      WHERE 
        users.id=$1
      GROUP BY
        users.id;`,
      [userId]
    );

    const shortUrls = await connection.query(
      `SELECT * FROM "shortUrls" WHERE "userId"=$1;`,
      [userId]
    );

    const myShortUrls = { ...user.rows[0], shortenedUrls: shortUrls.rows };

    res.status(200).send(myShortUrls);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function rankingGet(req, res) {
  try {
    const shortUrls = await connection.query(
      `SELECT 
        users.id, users.name,
        COUNT("shortUrls".id) AS "linksCount",
        COALESCE( SUM("shortUrls"."visitCount"), 0) AS "visitCount"
      FROM 
        "shortUrls" RIGHT JOIN users
      ON
        "shortUrls"."userId" = users.id
      GROUP BY
        users.id
      ORDER BY 
        "visitCount" DESC 
      LIMIT 10;`
    );

    console.log(shortUrls.rows);
    res.status(200).send(shortUrls.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
