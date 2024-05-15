require("dotenv").config();
require("express-async-errors");
const stripe = require("stripe")(
  "sk_test_51NWU4pFq9CntC2aZPxWW4edT70SaSRwx1M1YqN4bQuhh4luXO3nPRAoMiide9kFSyYIyC2NOuOLYRkvnOS6DzVkv00sTqFEZGr"
);

const express = require("express");
const fs = require("fs");
const https = require("https");
const http = require("http");
const app = express();
const users = require("./routes/users");

const passport = require("passport");
const port = process.env.PORT || 8000;
const path = require("path");

const connectDB = require("./db/connect");

const hbs = require("hbs");
const cors = require("cors");
const oneDay = 1000 * 60 * 60 * 24;
const session = require("express-session");
const cookieParser = require("cookie-parser");

const flash = require("connect-flash");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const upload = require("./middleware/upload");
const bodyParser = require("body-parser");

const publicDirectoryPath = path.join(__dirname, "./public/");
const viewPath = path.join(__dirname, "./templates/views"); //To customize path of view in hbs
const partialsPath = path.join(__dirname, "./templates/partials");
const sitemapPath = path.join(__dirname, "templates", "views", "sitemap.xml");

app.get("/create-checkout-session/:amount", async (req, res) => {
  var jsonData = {
    items: [{ name: "The Pricifiers", amount: req.params.amount }],
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: jsonData.items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              description: "Pricifiers",
            },
            unit_amount: item.amount * 100,
          },
          quantity: 1,
        };
      }),
      success_url: "http://localhost:9000/users/dashboard",
      cancel_url: "http://localhost:9000/fail",
    });
    res.redirect(session.url);
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "hbs"); // This is only needed to setup handlebars
app.set("views", viewPath);

hbs.registerPartials(partialsPath);

app.use(
  session({
    secret: "keythatwillsignedthecookie",
    saveUninitialized: true,
    resave: false, // RESAVE Means for every request to the server we need new cookie
    cookie: { maxAge: oneDay },
  })
);
app.use(passport.initialize());
app.use(passport.authenticate("session"));

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", users);

app.get("/users/dashboard", async (req, res) => {
  res.render("index");
});

app.get("/login", async (req, res) => {
  res.render("login", {
    message: req.flash("message"),
    // wrong_password: req.flash("wrong_password"),
    // user_not_found: req.flash("user_not_found"),
  });
});

app.get("/register", async (req, res) => {
  res.render("register", { message: req.flash("message") });
});

app.get("/users/features", async (req, res) => {
  res.render("users/features");
});

app.get("/users/about", async (req, res) => {
  res.render("users/about");
});

app.get("/users/pricing", async (req, res) => {
  res.render("users/pricing");
});

app.get("/users/template1", async (req, res) => {
  res.render("users/template1");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("users/dashboard"); // will always fire after session is destroyed
  });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, function () {
      console.log(`Express server listening on port ${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
