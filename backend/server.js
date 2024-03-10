const express = require("express");
const dotenv = require("dotenv").config({ path: "./.env" });
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const asyncHandler = require("./middlewares/asyncHandler");
const errorHandler = require("./middlewares/ErrorHandler");
const path = require("path");

const PORT = process.env.PORT;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://support-desk-m02r.onrender.com"],
    credentials: true,
  })
);
app.use(cookieParser());

const usersRoute = require("./routes/userRoute");
const ticketsRoute = require("./routes/ticketRoute");

app.use("/api/users", usersRoute);
app.use("/api/tickets", ticketsRoute);

const __dir = path.resolve();
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dir, "/frontend/build")));
  // any route that is not api will be redirected to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dir, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(asyncHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
