const express = require("express");
const postRoutes = require("./routers/posts.js");
const userRoutes = require("./routers/user.js");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5000;
var cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mern-auth-template-tutorial.netlify.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
require("./db/db");
app.use("/posts", postRoutes);
app.use("/", userRoutes);
app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});
