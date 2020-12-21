const express = require("express");
const app = express();
app.use(express.json());

const products = ["PC", "Mobile", "LCD"];

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/products", function (req, res) {
  res.send(products);
});

app.get("/api/products/:index", function (req, res) {
  if (!products[req.params.index])
    return res.status(400).send("Product no found");
  res.send(products[req.params.index]);
});

app.put("/api/products/:index", function (req, res) {
  //console.log(req.body);
  products[req.params.index] = req.body.name;
  res.send(products[req.params.index]);
});

app.delete("/api/products/:index", function (req, res) {
  products.splice(req.params.index, 1);
  res.send(products);
});

app.post("/api/products", function (req, res) {
  products.push(req.body.name);
  res.send(products);
});

app.listen(3000);
