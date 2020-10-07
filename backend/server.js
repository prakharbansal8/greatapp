require("dotenv").config();
var express = require("express");
const jwt = require("jsonwebtoken");
let config = require("./config");
let middleware = require("./middleware");

var app = express();
var mongoose = require("mongoose");
var userdb = require("./user_schema");
// var verifyToken = require("./verifyToken");
var uploadSchema = require("./upload_schema");
var multer = require("multer");
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(express.static("uploads"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/ppl", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });
app.post("/uploadimage", upload.single("myfile"), (req, res) => {
  var date = new Date();
  var hr = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var ampm = date.getHours() >= 12 ? "pm" : "am";
  var qw = "" + date.getMinutes();
  var acttime = qw.length > 1 ? qw : "0" + qw;
  var aw = "" + hr;
  var wcttime = aw.length > 1 ? aw : "0" + aw;
  console.log("req.file", req.body);
  console.log("mai hu jiyan ", req.file.filename);
  let data1 = req.body;
  data1.imageupload = req.file.filename;
  data1.time = wcttime + ":" + acttime + ampm;
  uploadSchema.create(data1, function(err, result3) {
    if (err) {
      console.log("err", err);
      // res.send(err);
    } else {
      res.send(result3);
      // res.send("Register Successfully");
    }
  });
  // uploadSchema.find({}, function(err, result3) {
  //   if (err) {
  //     console.log("err", err);
  //     res.send(err);
  //   } else {
  //     res.send(result3);
  //   }
  // });
  // res.send(req.file.path + "/" + req.file.originalname);
});

app.post("/signup", (req, res) => {
  var mail = req.body.email;
  var uname = req.body.username;
  userdb.find({ email: mail }, function(err, result) {
    if (result.length > 0) {
      console.log("result", result);
      res.send("Email Already In Use");
    } else {
      //   console.log(result);
      //   console.log("User not exists", req.body);
      userdb.find({ username: uname }, function(err1, result1) {
        if (result1.length > 0) {
          console.log("Username already taken");
          res.send("Username Already Taken");
        } else {
          userdb.create(req.body, function(err, result3) {
            if (err) {
              console.log("err", err);
              res.send(err);
            } else {
              res.send("Register Successfully");
            }
          });
        }
      });
    }
  });
});

app.get("/getimages", (req, res) => {
  // console.log("Data from Backend Received", req.body);
  uploadSchema.find({}, function(err, result3) {
    if (err) {
      console.log("err", err);
      res.send(err);
    } else {
      res.send(result3);
    }
  });
  // res.send/(req.file.path + "/" + req.file.originalname);
});

app.post("/getSinglePost", (req, res) => {
  // console.log("Data from Backend Received", req.body);
  uploadSchema.find({ _id: req.body.idOfPost }, function(err, result3) {
    if (err) {
      console.log("err", err);
      res.send(err);
    } else {
      res.send(result3);
    }
  });
  // res.send/(req.file.path + "/" + req.file.originalname);
});

app.post("/addcomment", (req, res) => {
  console.log("Data from Backend Received", req.body.idOfPost);
  console.log("Data from Backend Received", req.body.comment);

  uploadSchema.findOneAndUpdate(
    { _id: req.body.idOfPost },
    { $push: { comment: req.body.comment } },
    { new: true },
    function(err, result3) {
      if (err) {
        console.log("err", err);
        res.send(err);
      } else {
        res.send(result3);
      }
    }
  );
  // res.send/(req.file.path + "/" + req.file.originalname);
});

//Login ---------------------------------------------------------------->

app.post("/login", (req, res) => {
  //   console.log("Data from Backend Received", req.body);
  var mail = req.body.email;
  // var user = { email: req.body.email };
  var pwd = req.body.password;
  userdb.find({ email: mail }, function(err, result) {
    // console.log(result[0].password);
    if (result.length > 0) {
      // console.log("result", result);
      // res.send("User Exists");
      if (result[0].password !== pwd) {
        console.log("Wrong Password");
        res.send({ status: "Wrong Password" });
      } else {
        console.log("Password correct", result[0]);
        let token = jwt.sign({ email: req.body.email }, config.secret, {
          expiresIn: "24h", // expires in 24 hours
        });
        console.log(token);
        res.json({
          success: true,
          status: "Login Successfully",
          token: token,
          user: result[0],
        });

        // const accessToken = jwt.sign(user, "" + process.env.ACCESS_TOKEN_SECRET);

        // res.json({ accessToken: accessToken, status: "Login Successfully", user: result[0] });
      }
    } else {
      res.send({ status: "User Not Exist" });
    }
  });
});
app.post("/verifyToken", middleware.checkToken, (req, res) => {
  res.send({
    success: true,
  });
});

app.listen(8098, () => {
  console.log("server is running");
});
