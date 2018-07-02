const { describe, it } = require("mocha")
const { expect } = require("chai")
const pretty = require("../src/pretty")

// default placeholder test
describe("package", function(){
  it("should throw error if not passed a valid time number", function(){
    const invalidTimes = [new Date(), null, undefined, NaN, "", /reg/, () => {}, {}, true];
    invalidTimes.forEach(time => {
      expect(() => pretty(time)).to.throw("requires a number in nanoseconds")
    })
  })
})
