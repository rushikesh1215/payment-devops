import { z } from "zod";

export const sendSchema = z.object({
  receiverPhone: z.string().regex(/^[0-9]{10}$/),
  amount: z.number().positive().max(50000)
});

// OR fix validation message (optional clearer error)
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.errors?.[0]?.message || "Invalid input"
    });
  }
};