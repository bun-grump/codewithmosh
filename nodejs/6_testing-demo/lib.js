// Testing numbers
module.exports.absolute = function (number) {
  return number >= 0 ? number : -number;
};

// Testing syrings
module.exports.greet = function (name) {
  return "Welcome " + name;
};

// Testing arrays
module.exports.getCurrencies = function () {
  return ["USD", "AUD", "EUR"];
};

// testing objects
module.exports.getProduct = function (productId) {
  return { id: productId, price: 10 };
};

// Testing exceptions
module.exports.registerUser = function (username) {
  if (!username) throw new Error("Username is required");
  return { id: new Date().getTime(), username: username };
};

// testing functions that depend on external databases
const db = require("./db");
module.exports.applyDiscount = function (order) {
  const customer = db.getCustomerSync(order.customerId);
  if (customer.points > 10) order.totalPrice *= 0.9;
};

const mail = require("./mail");

module.exports.notifyCustomer = function (order) {
  const customer = db.getCustomerSync(order.customerId);
  mail.send(customer.email, "Your order was placed successfully");
};
