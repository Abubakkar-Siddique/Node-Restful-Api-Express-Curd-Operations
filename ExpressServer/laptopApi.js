const express = require("express");
const app = express();
app.use(express.json());

var laptop =
  '{"laptops":[{"model": "hp-220","name": "HP-EliteBook","specs": "8Gb-Ram, 1Gb-Hard, Core i-3 5th Gen", "price": "38000"},{"model": "dell-3468","name": "Dell Vostro","specs": "12Gb-Ram, 2Tb-Hard, Core i-5 7th Gen", "price": "88000"}]}';

var mydata = JSON.parse(laptop);

app.get("/", function (req, res) {
  res.send("Hello to Laptops Api ");
});

app.get("/api/laptops", function (req, res) {
  res.send(mydata);
});

app.get("/api/laptops/:index", function (req, res) {
  if (!mydata.laptops[req.params.index])
    return res.status(400).send("Laptop not found");
  res.send(mydata.laptops[req.params.index]);
});

app.put("/api/laptops/:index", function (req, res) {
  //console.log(req.body);
  mydata.laptops[req.params.index].model = req.body.model;
  mydata.laptops[req.params.index].name = req.body.name;
  mydata.laptops[req.params.index].specs = req.body.specs;
  mydata.laptops[req.params.index].price = req.body.price;
  laptop = JSON.stringify(mydata);
  mydata = JSON.parse(laptop);
  res.send(mydata.laptops[req.params.index]);
});

app.delete("/api/laptops/:index", function (req, res) {
  mydata.laptops.splice(req.params.index, 1);
  laptop = JSON.stringify(mydata);
  mydata = JSON.parse(laptop);
  res.send(mydata);
});

app.post("/api/laptops", function (req, res) {
  mydata.laptops.push(req.body);
  laptop = JSON.stringify(mydata);
  res.send(laptop);
});

app.listen(3000);
