const { describe, it } = require("mocha")
const { expect } = require("chai")
const prettyTime = require("../src/pretty-time")

// default placeholder test
describe("package", function(){
  it("should throw error if not passed a valid time number", function(){
    const invalidTimes = [new Date(), null, undefined, NaN, "", /reg/, () => {}, {}, true];
    invalidTimes.forEach(time => {
      expect(() => prettyTime(time)).to.throw("requires a number in nanoseconds")
    })
  })

  // for each unit: test smallest vl, mid-range val, and potentially next-unit val
  const scales = [
    {factor: 1, unit: "ns", examples: [0, 2e2, 999.999]},
    {factor: 1e3, unit: "us", examples: [1e3, 2e5, 999999]},
    {factor: 1e6, unit: "ms", examples: [1e6, 2e8, 999999000]},
    {factor: 1e9, unit: "sec", examples: [1e9, 2e10, 59999000000]},
    {factor: 6e10, unit: "min", examples: [6e10, 12e11, 3599970000000]},
    {factor: 36e11, unit: "hr", examples: [36e11, 72e12, Infinity]}
  ]

  scales.forEach((scale, i) => {
    const { factor, unit, examples } = scale; 
    describe(`should correctly format times ~ O(${unit})`, function(){
      it(`should work with positive times`, function(){
        examples.forEach(example => {
          const pretty = prettyTime(example);
          const expected = (example/factor).toFixed(3) + unit
          expect(pretty).to.equal(expected);
        })
      })
      it(`should work with negative times`, function(){
        examples.forEach(example => {
          const pretty = prettyTime(-example);
          const expected = (-example/factor).toFixed(3) + unit;
          expect(pretty).to.equal(expected);
        })
      })
      it("should work with custom precision", function(){
        examples.forEach(example => {
          const pretty = prettyTime(example, 5);
          const expected = (example/factor).toFixed(5) + unit;
          expect(pretty).to.equal(expected)
        })
      })
      if (scale.unit !== "hr"){
        const { factor: nextLargestFactor, unit: nextLargestUnit } = scales[i+1];
        it(`should format in ${nextLargestUnit} if rounded time ~ O(${nextLargestUnit})`, function(){
          const example = examples[examples.length-1];
          const pretty = prettyTime(example, 1);
          const expected = (example/nextLargestFactor).toFixed(1) + nextLargestUnit;
          expect(pretty).to.equal(expected)
        })
      }
    })
  })
})
