const multiply = require("../utils/multiply");
const chai = require("chai");
const expect = chai.expect;

describe("testing multiply utility", () => {
  it("should return 42 for 7 * 6", () => {
    expect(multiply(7, 6)).to.equal(42);
  });

  it("should return 0 for 0 * 1000", () => {
    expect(multiply(0, 1000)).to.equal(0);
  });

  it("should return -20 for -4 * 5", () => {
    expect(multiply(-4, 5)).to.equal(-20);
  });

  it("should return NaN for non-numeric input", () => {
    expect(multiply("a", 3)).to.be.NaN;
  });
});
