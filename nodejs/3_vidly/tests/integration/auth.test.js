const { User } = require("../../models/user");
const { Genre } = require("../../models/genre");
const request = require("supertest");

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../index");
  }); // need to load server before each test
  afterEach(async () => {
    await Genre.deleteMany({}); // remove all the genres everytime test completed
    server.close(); // need to close server after each test
  });

  let token;

  const exec = async () => {
    // pick any request to test
    return await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
