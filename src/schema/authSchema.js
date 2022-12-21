//CREATE TABLE "users"(id SERIAL PRIMARY KEY, name VARCHAR(10) NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, "confirmPassword" TEXT NOT NULL, CHECK(password IN("confirmPassword")));
//CREATE TABLE "shortUrls"(id SERIAL PRIMARY KEY, "userId" INTEGER NOT NULL REFERENCES "users"("id"), url TEXT NOT NULL, "shortUrl" TEXT NOT NULL, "visitCount" INTEGER NOT NULL, "createdAt" DATE NOT NULL DEFAULT NOW());

import joi from "joi";

const userSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().min(6).required()
});

export default userSchema;
