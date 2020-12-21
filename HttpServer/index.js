var http = require("http");

http
  .createServer(function (req, res) {
    console.log(req.url);
    switch (req.url) {
      case "/home":
        res.write("<h1>My Home Page</h1>");
        break;

      case "/hobbies":
        res.write("<h1>My Hobbies Page</h1>");
        break;

      default:
        res.write("No page found");
        break;
    }

    res.end();
  })
  .listen(8080);
