const request = require("request");

describe("App - POST /calculator", () => {
  let server;
  beforeAll(() => {
    server = require("../app");
  });

  afterAll(() => {
    server.close();
  });

  const data = {};

  const postRequest = (done, formData) => {
    return request.post(
      "http://localhost:3000/calculator",
      {
        body: formData,
        json: true,
      },

      (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      }
    );
  };

  describe(" - sum", () => {
    beforeEach((done) => {
      postRequest(done, { Operator: "+", Value1: 4, Value2: 2 });
    });

    it(" - should make a correct sum", () => {
      expect(data.status).toEqual(200);
      expect(data.body.result).toEqual(6);
    });
  });

  describe(" - subtraction", () => {
    beforeEach((done) => {
      postRequest(done, { Operator: "-", Value1: 4, Value2: 2 });
    });

    it(" - should make a correct subtraction", () => {
      expect(data.status).toEqual(200);
      expect(data.body.result).toEqual(2);
    });
  });

  describe(" - multiplication", () => {
    beforeEach((done) => {
      postRequest(done, { Operator: "*", Value1: 4, Value2: 2 });
    });

    it(" - should make a correct multiplication", () => {
      expect(data.status).toEqual(200);
      expect(data.body.result).toEqual(8);
    });
  });

  describe(" - division", () => {
    beforeEach((done) => {
      postRequest(done, { Operator: "/", Value1: 4, Value2: 2 });
    });

    it(" - should make a correct division", () => {
      expect(data.status).toEqual(200);
      expect(data.body.result).toEqual(2);
    });
  });

  describe(" - invalid Operator", () => {
    beforeEach((done) => {
      postRequest(done, { Operator: "0", Value1: 4, Value2: 2 });
    });

    it(" - should return an Operator error", () => {
      expect(data.status).toEqual(400);
      expect(data.body.result).toEqual("Invalid Operator");
    });
  });
});
