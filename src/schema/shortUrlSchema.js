import joi from "joi";

const shortUrlSchema = joi.object({
  url: joi.string().uri().required(),
});

export default shortUrlSchema;
