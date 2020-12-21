const express = require("express");
const app = express();
app.use(express.json());

var students =
  '[{"registration": "121","name": "Abubakar","address": "191/A-new Chauburji Park, Lahore", "CGPA": "3.38"},{"registration": "077","name": "Ali","address": "149/J1-Johar Town, Lahore", "CGPA": "3.32"}]';

var mydata = JSON.parse(students);

app.get("/", function (req, res) {
  res.send("Hello to Students Api ");
});

app.get("/api/students", function (req, res) {
  res.send(students);
});

app.get("/api/students/:index", function (req, res) {
  if (!mydata[req.params.index])
    return res.status(400).send("Student not found");
  res.send(mydata[req.params.index]);
});

app.put("/api/students/:index", function (req, res) {
  //console.log(req.body);
  mydata[req.params.index].registration = req.body.registration;
  mydata[req.params.index].name = req.body.name;
  mydata[req.params.index].address = req.body.address;
  mydata[req.params.index].CGPA = req.body.CGPA;
  students = JSON.stringify(mydata);
  mydata = JSON.parse(students);
  res.send(mydata[req.params.index]);
});

app.delete("/api/students/:index", function (req, res) {
  mydata.splice(req.params.index, 1);
  students = JSON.stringify(mydata);
  mydata = JSON.parse(students);
  res.send(students);
});

app.post("/api/students", function (req, res) {
  mydata.push(req.body);
  students = JSON.stringify(mydata);
  mydata = JSON.parse(students);
  res.send(students);
});

app.listen(3000);
