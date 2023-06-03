import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/hello", (req, res) => {
  res.send("Hello Food Order");
});

app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;

  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  res.send(foods);
});

// sample test method
app.get("/api/foods/search-item/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;

  const foods = sample_foods.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  res.send(foods);
});

app.get("/api/tags", (req, res) => {
  res.send(sample_tags);
});

app.get("/api/foods/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
  res.send(foods);
});

app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const foods = sample_foods.filter((food) => food.id == foodId);
  res.send(foods);
});

app.post("/api/users/login", (req, res) => {
  // Destructuring assignment
  const { email, password } = req.body;
  const user = sample_users.find(
    (retUser) => retUser.email === email && retUser.password === password
  );

  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(400).send("User name or password is incorrect");
  }
});

const generateTokenResponse = (user: any) => {
  const tokenStr = jwt.sign(
    { user: user.email, isAdmin: user.isAdmin },
    "SomeRandomText",
    { expiresIn: "30d" }
  );

  user.token = tokenStr;
  return user;
};

const port = 5000;

app.listen(port, () => {
  console.log("Website served on http://localhost: " + port);
});
