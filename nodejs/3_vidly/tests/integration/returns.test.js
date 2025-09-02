const { Rental } = require("../../models/rental");

describe("/api/returns", () => {
  let server;
  beforeEach(() => {
    server = require("../../index");
  }); // need to load server before each test
  const rental = new afterEach(async () => {
    await Genre.deleteMany({}); // remove all the genres everytime test completed
    server.close(); // need to close server after each test
  });
});
