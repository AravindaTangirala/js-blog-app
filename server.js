//import express
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const blogRoutes = require("./routes/blogRoutes");
const morgan = require("morgan");
// const blogroutes = require("./api/routes/blogroute");

//initialize express app
const app = express();
//Mongo Db connection
const dbURI =
  "mongodb+srv://admin:admin123@blog-app.2mrlq.mongodb.net/blog?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(PORT, () => {
      console.log(`server is liestening on ${PORT}`);
    })
  )
  .catch((err) => console.log(err));
// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
