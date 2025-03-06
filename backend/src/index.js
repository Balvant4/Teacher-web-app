import app from "./app.js";
import DbConnect from "./db/DbConnect.js";
import dotenv from "dotenv";

dotenv.config();

DbConnect()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.log("Error in connectin to DB", err);
  });
