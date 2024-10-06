const express = require("express");
const connection = require("./config/mongoose-connection");
const job = require("./routes/jobRoute");
const cors = require("cors");

const app = express();
const cookieParser = require("cookie-parser");
const usersRouters = require("./routes/userRoute");
const clientsRouters = require("./routes/clientRoute");
let port = process.env.PORT || 3000;
const path = require("path");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/user", usersRouters);
app.use("/client", clientsRouters);
app.use("/job", job);
app.get("/", (req, res) => {
  res.render("chat");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
