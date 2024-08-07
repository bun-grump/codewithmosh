const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1); //assert
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1); //assert
  });

  it("should return 0if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0); //assert
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Mosh");
    expect(result).toMatch(/Mosh/); //contains 'mosh'
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    //too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    expect(result.length).toBe(3);

    //proper way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 }); // match all attributes
    expect(result).toMatchObject({ id: 1, price: 10 }); //match only overlapping attributes
    expect(result).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    // null, undefined, NaN, '', 0, false
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("mosh");
    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  //create a mock function to override the original ones that depend on external database
  db.getCustomerSync = function (customerId) {
    console.log("Fake reading customer...");
    return { id: customerId, points: 20 };
  };
  it("should apply 10% discount if customer has more than 10 points", () => {
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled(); //asserting the mock function was called
    expect(mail.send.mock.calls[0][0]).toBe("a"); // asserting arguments passed to this function, first call first argument
    expect(mail.send.mock.calls[0][1]).toMatch(/order/); // first call second argument
  });
});
