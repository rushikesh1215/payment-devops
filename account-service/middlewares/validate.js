
import { z } from "zod";

export const addMoneySchema = z.object({
  amount: z.number().positive().max(100000) // max limit added
});

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  }  catch (err) {
    return res.status(400).json({ error: err.errors });
  }
};