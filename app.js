const express = require("express");

const app = express();

app.use(express.json());

app.post("/calculator", (request, response) => {
  let result;
  let error = false;

  switch (request.body.Operator) {
    case "+":
      result = request.body.Value1 + request.body.Value2;
      break;
    case "-":
      result = request.body.Value1 - request.body.Value2;
      break;
    case "*":
      result = request.body.Value1 * request.body.Value2;
      break;
    case "/":
      result = request.body.Value1 / request.body.Value2;
      break;
    default:
      error = true;
  }

  if (error) {
    return response.status(400).send({ result: "Invalid Operator" });
  } else {
    return response.status(200).send({ result });
  }
});

const server = app.listen(3000, () => {
  console.log("Listening on port " + server.address().port + "...");
});
module.exports = server;
