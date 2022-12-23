import dayjs from "dayjs";
import { nanoid } from "nanoid";

import connection from "../database/db.js";
import shortUrlSchema from "../schema/shortUrlSchema.js";

export async function shortUrlValidation(req, res, next) {
  const { url } = req.body;
  const { id: userId } = res.locals.user;

  try {
    const { error } = shortUrlSchema.validate({ url }, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      res.status(422).send({ message: errors });
    }

    const urlExist = await connection.query(
      `SELECT url FROM "shortUrls" WHERE "userId"=$1 AND url=$2`,
      [userId, url]
    );
    if (urlExist.rowCount !== 0) {
      return res.status(409).send({ message: "Url já cadastrada!" });
    }

    const shortUrl = nanoid();
    const date = dayjs();

    const urlBody = {
      userId,
      url,
      shortUrl,
      visitCount: 0,
      createdAt: date,
    };

    res.locals.urlBody = urlBody;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
