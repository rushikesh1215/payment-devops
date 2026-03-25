
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.DB_URI) {
  throw new Error("DB_URI not defined in .env");
}
export const sequelize = new Sequelize(process.env.DB_URI, {
  logging: false
});

export const connectDB = async () => {
  try {
    
    await sequelize.authenticate();
    console.log("MySQL connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};