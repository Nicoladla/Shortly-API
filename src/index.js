import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouters from "./routers/authRouters.js";
import shortUrlRouters from "./routers/shortUrlRouters.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(authRouters);
app.use(shortUrlRouters);

const port = process.env.PORT;
app.listen(port, () => console.log(`App running on port ${port}`));
