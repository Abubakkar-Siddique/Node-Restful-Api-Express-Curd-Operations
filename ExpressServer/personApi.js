const express = require("express");
const app = express();
app.use(express.json());

var persons =
  '{"person":[{"name": "Sohaib","issue": "17-Nov-1993","mark": "nops"},{"name": "Mian Umer","issue": "13-nov-1899","mark": "stone in kidney"}]}';

var mydata = JSON.parse(persons);

app.get("/", function (req, res) {
  res.send("Person Api");
});

app.get("/api/persons", function (req, res) {
  res.send(mydata);
});

app.get("/api/persons/:index", function (req, res) {
  if (!mydata.person[req.params.index])
    return res.status(400).send("Person not found");
  res.send(mydata.person[req.params.index]);
});

app.put("/api/persons/:index", function (req, res) {
  //console.log(req.body);
  mydata.person[req.params.index].name = req.body.name;
  mydata.person[req.params.index].issue = req.body.issue;
  mydata.person[req.params.index].mark = req.body.mark;
  persons = JSON.stringify(mydata);
  mydata = JSON.parse(persons);
  res.send(mydata.person[req.params.index]);
});

app.delete("/api/persons/:index", function (req, res) {
  mydata.person.splice(req.params.index, 1);
  persons = JSON.stringify(mydata);
  mydata = JSON.parse(persons);
  res.send(mydata);
});

app.post("/api/persons", function (req, res) {
  mydata.person.push(req.body);
  persons = JSON.stringify(mydata);
  mydata = JSON.parse(persons);
  res.send(mydata);
});

app.listen(3000);
