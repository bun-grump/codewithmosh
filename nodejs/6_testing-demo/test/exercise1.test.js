const excercise1 = require("../exercise1");

describe("exercise1", () => {
  it("should throw if input is not number", () => {
    // null, undefined, NaN, '', 0, false
    const args = [null, undefined, {}, "a"];
    args.forEach((a) => {
      expect(() => {
        excercise1.fizzBuzz(a);
      }).toThrow();
    });
  });
  it("should return 'FizzBuzz' if divisible by 3 and 5", () => {
    const result = excercise1.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });
  it("should return 'Fizz' if divisible by 3 only", () => {
    const result = excercise1.fizzBuzz(6);
    expect(result).toBe("Fizz");
  });
  it("should return 'Buzz' if divisible by 5 only", () => {
    const result = excercise1.fizzBuzz(20);
    expect(result).toBe("Buzz");
  });
});
