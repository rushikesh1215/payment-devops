import Transaction from "../models/Transaction.js";

export const getHistory = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const data = await Transaction.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]]
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
};