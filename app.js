const express = require("express");
const app = express();
const path = require("path");
const db = require("./data/database");
const encoder = require("bcryptjs");
var nodemailer = require("nodemailer");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");
const mongoDBStore = mongodbStore(session);
const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
  })
);

const sessionStore = new mongoDBStore({
  uri: "mongodb://localhost:27017",
  databaseName: "surveyproject",
  collection: "sessions",
});

app.get("/", function (req, resp, next) {
  resp.render("loginSignUp");
});

app.get("/survey", function (req, resp, next) {
  resp.render("surveyform");
});
app.post("/survey", function (req, resp, next) {
  resp.render("surveyform");
});

app.get("/responses", async function (req, resp, next) {
  const [allResponses] = await db.query("select * from responses");
  resp.render("response", { allResponses: allResponses });
});
app.post("/responses", async function (req, resp, next) {
  resp.redirect("/responses");
});
app.get("/navigate", function (req, resp, next) {
  resp.render("navigate");
});

app.get("/responses/:rID/edit", async function (req, resp, next) {
  let responseID = req.params.rID;
  const [thisResponse] = await db.query("select * from responses where id=?", [
    responseID,
  ]);
  resp.render("responseDetails", { thisResponse: thisResponse });
});
app.post("/store-response", async function (req, resp, next) {
  let thisResponse = req.body;
  await db.query(
    "insert into responses (name,email,age,role,rating,feature,suggestions) values (?,?,?,?,?,?,?)",
    [
      thisResponse.name,
      thisResponse.email,
      thisResponse.age,
      thisResponse.role,
      thisResponse.recommendation,
      thisResponse.feature,
      thisResponse.suggestions,
    ]
  );
  resp.redirect("/navigate");
});

app.get("/responses/:rID/delete", async function (req, resp, next) {
  let responseId = req.params.rID;
  await db.query("delete from responses where id=?", [responseId]);
  resp.redirect("/responses");
});
app.post("/responses/:rID/update", async function (req, resp, next) {
  let currResponse = req.body;
  await db.query(
    "update responses set name=?,email=?,age=?,role=?,rating=?,feature=?,suggestions=? where id=?",
    [
      currResponse.name,
      currResponse.email,
      currResponse.age,
      currResponse.role,
      currResponse.recommendation,
      currResponse.feature,
      currResponse.suggestions,
      req.params.rID,
    ]
  );
  resp.redirect("/responses");
});
app.post("/signup", async function (req, resp, next) {
  let newEmail = req.body.signupID;
  let newPassword = req.body.signupPassword;
  let [user] = await db.query("select * from users where emailid=?", [
    newEmail,
  ]);
  if (user.length != 0) {
    //emailID already exists
    console.log("Email-ID already exists");
    return resp.redirect("/");
  } else {
    if (!newPassword || newPassword.length < 6) {
      console.log("Invalid Password");
      return resp.redirect("/");
    } else {
      console.log("account created, Kindly Login");
      let hashedpassword = await encoder.hash(newPassword, 12);
      await db.query("insert into users (emailid,password) values (?,?)", [
        newEmail,
        hashedpassword,
      ]);
      return resp.redirect("/");
    }
  }
});
app.post("/login", async function (req, resp, next) {
  let enteredEmail = req.body.loginID;
  let enteredPassword = req.body.loginPwd;
  let [user] = await db.query("select * from users where emailid=?", [
    enteredEmail,
  ]);
  if (user.length == 0) {
    console.log("Email ID doesn't exist");
    return resp.redirect("/");
  } else {
    let thisUser = user[0];
    let isPasswordMatching = await encoder.compare(
      enteredPassword,
      thisUser.password
    );
    if (!isPasswordMatching) {
      return resp.redirect("/");
    } else {
      console.log("login successful");
      return resp.redirect("/survey");
    }
  }
});

app.get("/survey/publish", function (req, resp, next) {
  resp.render("emailForm");
});
app.post("/survey/publish", async function (req, resp, next) {
  let emailID = req.body.emailID;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your email id",
      pass: "your nodemailer password for gmail",
    },
    port: 465,
  });
  let surveypath = path.join(__dirname, "views", "surveyform.ejs");
  const data = await ejs.renderFile(surveypath);
  var mailOptions = {
    from: "your email id",
    to: emailID,
    subject: "Title",
    html: data,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("email sent: " + info.response);
    }
  });
  resp.redirect("/survey");
});

app.use((req, res, next) => {
  res.render("404");
});
// app.use(function (err, req, resp, next) {
//   resp.render("500");
// });
app.listen(3000);
