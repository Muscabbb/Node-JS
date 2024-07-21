const express = require("express");
const mongoose = require("mongoose");
const article = require("./models/artcle");

const app = express();
mongoose
  .connect(
    "mongodb+srv://musab:lkLcVq0MOOxpLxxo@cluster0.9r682mt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error.message);
  });
// musab
// lkLcVq0MOOxpLxxo

// mongodb+srv://<username>:<password>@cluster0.9r682mt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.use(express.json());

app.get("/", (req, res) => {
  let num = 0;
  for (let i = 0; i < 100; i++) {
    num += i + "-";
  }
  // const articleData = [
  //   {
  //     title: "Understanding the Basics of HTML, CSS, and JavaScript",
  //     body: "HTML, CSS, and JavaScript are the fundamental technologies for building web pages. This article explores their roles and how they work together to create interactive and visually appealing websites.",
  //   },
  //   {
  //     title: "Getting Started with Responsive Web Design",
  //     body: "Responsive design ensures your website looks great on all devices. Learn the principles of responsive design and how to implement them using CSS media queries.",
  //   },
  //   {
  //     title: "Introduction to CSS Flexbox and Grid Layouts",
  //     body: "Flexbox and Grid are powerful CSS layout models that make it easier to design flexible and complex layouts. This article covers the basics and provides examples of how to use them effectively.",
  //   },
  //   {
  //     title: "JavaScript ES6 Features You Should Know",
  //     body: "ES6 introduced many new features to JavaScript, such as arrow functions, classes, and template literals. Discover these features and how they can improve your code.",
  //   },
  //   {
  //     title: "Building Single Page Applications with React",
  //     body: "React is a popular JavaScript library for building user interfaces. Learn how to create a single-page application (SPA) using React and its component-based architecture.",
  //   },
  //   {
  //     title: "An Introduction to Vue.js: A Progressive JavaScript Framework",
  //     body: "Vue.js is a versatile framework for building user interfaces. This article introduces Vue.js, its core concepts, and how to create a simple application.",
  //   },
  //   {
  //     title: "Mastering State Management in React with Redux",
  //     body: "Managing state in complex applications can be challenging. Learn how Redux can help you manage state predictably and efficiently in your React applications.",
  //   },
  //   {
  //     title: "Getting Started with TypeScript for Front-End Development",
  //     body: "TypeScript is a superset of JavaScript that adds static types. Discover the benefits of using TypeScript in your front-end projects and how to get started.",
  //   },
  // ];

  // articleData.forEach((data) => {
  //   article.create({
  //     title: data?.title,
  //     body: data?.body,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });
  // });

  // document.querySelector("p").innerHTML = num;
  // res.sendFile(__dirname + "/views/test.html");

  console.log();

  res.render("test.ejs", {
    title: "my title",
    name: req.body.name,
    numbers: num,
  });
});

app.post("/article", (req, res) => {
  article.create({
    title: req.query?.title,
    body: req.query?.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log(req.query?.title);
  console.log(req.query?.body);
  res.send("well");
});

app.get("/article", async (req, res) => {
  const allArticles = await article.find();
  // console.log(allArticles);
  res.render("articles.ejs", { articles: [...allArticles] });
  // res.render("test.ejs", { articles: [...allArticles] });
});

app.get("/article/:articleId", async (req, res) => {
  try {
    res.json(await article.findById(req.params.articleId));
  } catch (error) {
    console.log(
      "an error occur while trying to find the specific article by id ",
      req.params.articleId
    );
    res.send("something went wrong!");
  }
});

app.delete("/article/:articleId", async (req, res) => {
  try {
    res.json(
      (await article.findByIdAndDelete(req.params.articleId)) &&
        "deleted successfully"
    );
  } catch (error) {
    console.log(
      "an error occur while trying to find the specific article by id ",
      req.params.articleId
    );
    res.send("something went wrong!");
  }
});

app.get("/:num1/:num2", (req, res) => {
  try {
    res.send(`${+req.params.num1 + +req.params.num2}`);
  } catch (error) {
    res.send("can't calculate this type of sum!");
  }
});

app.get("/sayWelcome", (req, res) => {
  try {
    res.json({
      message: `welcome to my app ${req.body.name}`,
      name: req.body.name,
      age: req.query.age || 15,
    });
  } catch (error) {
    res.send("define ur name");
  }
});

app.get("/query", (req, res) => {
  try {
    res.send(`${req.query.name}`);
  } catch (error) {
    res.send("define ur name");
  }
});

app.listen(1000, () => {
  console.log("Listening on port 1000");
});
