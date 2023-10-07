require("dotenv").config();
const flash = require("connect-flash");
const express = require("express");
const path = require("path");
const engine = require("express-edge");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const fileUpload = require("express-fileupload");
const MongoStore = require("connect-mongo");
const { default: edge } = require("edge.js");
// Controllers
const listenPort = require("./controllers/listenPort");
const createPost = require("./controllers/createPost");
const homePost = require("./controllers/homePost");
const AboutPage = require("./controllers/About");
const allPosts = require("./controllers/allPost");
const singlePost = require("./controllers/singlePost");
const postData = require("./controllers/postData");
const contact = require("./controllers/contact");
const emailIdS = require("./controllers/emailSend");
const storeUser = require("./controllers/StoreUsers");
const logoutController = require("./controllers/logoutController");
const contactController = require("./controllers/contactController");
//
//

// Middleware
const loginMiddleware = require("./middleware/loginMiddleware");
const StorePost = require("./middleware/StorePost");
const authMiddleware = require("./middleware/auth");
const signupMiddleware = require("./middleware/signupMiddleware");
//

// const multer = require("multer");
// const Storage = multer.diskStorage({
//   destination: "upload",
//   filename: (req, file, cb) => {
//     cb(null, Date.now);
//   },
// }); // Store the file in memory as a Buffer
// const upload = multer({ storage: Storage }).single("testImage");

//
//

// mongoose
//   .connect("mongodb://localhost/node-js-blog")
//   .then((success) => console.log("connected to Database"))
//   .catch((error) => console.log(error));

//

const app = new express();
mongoose
  .connect(process.env.DB_URL)
  .then((success) => console.log("connected to Database"))
  .catch((error) => console.log(error));

app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);
const cacheControlMaxAge = 3600;
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: cacheControlMaxAge * 1000,
  })
);

const LoginUser = require("./controllers/loginUser");
const Login = require("./controllers/Login");
const SignUp = require("./controllers/SignUp");

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});

app.use(flash());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(engine);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", `${__dirname}/views`);

//

// Routes
app.get("/", homePost);
app.get("/about", AboutPage);
app.get("/allPosts", allPosts);
app.get("/post/new", authMiddleware, createPost);
app.get("/post/:id", singlePost);
app.post("/post/store", authMiddleware, postData);
app.post("/post/emailId", emailIdS);
app.get("/contact", contact);
app.get("/auth/logout", logoutController);
app.get("/auth/login", loginMiddleware, Login);
app.get("/auth/signup", signupMiddleware, SignUp);
app.post("/user/login", LoginUser);
app.post("/post/contactdata", contactController.submit);
app.post("/users/register", storeUser);
app.use((req, res) => res.render("not-found"));
app.listen(4000, listenPort);
