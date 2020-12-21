const express = require("express");
const app = express();
app.use(express.json());

var identify =
  '{"cnic":[{"name": "Ali","issue": "17-Nov-1997","mark": "mock on bump"},{"name": "Mian","issue": "13-dec-1999","mark": "nops"}]}';

var mydata = JSON.parse(identify);

app.get("/", function (req, res) {
  res.send("CNIC Api");
});

app.get("/api/cnic", function (req, res) {
  res.send(mydata);
});

app.get("/api/cnic/:index", function (req, res) {
  if (!mydata.cnic[req.params.index])
    return res.status(400).send("Person not found");
  res.send(mydata.cnic[req.params.index]);
});

app.put("/api/cnic/:index", function (req, res) {
  //console.log(req.body);
  mydata.cnic[req.params.index].name = req.body.name;
  mydata.cnic[req.params.index].issue = req.body.issue;
  mydata.cnic[req.params.index].mark = req.body.mark;
  identify = JSON.stringify(mydata);
  mydata = JSON.parse(identify);
  res.send(mydata.cnic[req.params.index]);
});

app.delete("/api/cnic/:index", function (req, res) {
  mydata.cnic.splice(req.params.index, 1);
  identify = JSON.stringify(mydata);
  mydata = JSON.parse(identify);
  res.send(mydata);
});

app.post("/api/cnic", function (req, res) {
  mydata.cnic.push(req.body);
  identify = JSON.stringify(mydata);
  mydata = JSON.parse(identify);
  res.send(mydata);
});

app.listen(3000);
