const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const calendarRouter = require("./routers/calendarRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config("./.env");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use("/auth", authRouter);
app.use("/calendar", calendarRouter);

const PORT = process.env.PORT;

dbConnect();
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
