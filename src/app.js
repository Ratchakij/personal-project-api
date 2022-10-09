require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");

const notFound = require("./middlewares/notFound");
const error = require("./middlewares/error");

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors()); // ทำให้ server รับ req ที่มาจากต่าง domain ได้ (sharing ข้อมูลข้าม Domain หรือ ข้าม origin)
app.use(express.json()); // แปลงข้อมูลที่มีรูปแบบ JSON String ให้อยู่ในรูป JSON Object
app.use(express.urlencoded({ extended: false })); // แปลงข้อมูลจาก form ในรูปแบบ url encode เป็น Object

app.use("/auth", authRoute);
app.use("/product", productRoute);

app.use(notFound);
app.use(error);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on port: ${port}`));
