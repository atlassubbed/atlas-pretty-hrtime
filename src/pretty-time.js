const { isNum } = require("./util")

const units = [
  {unit: "us", factor: 1e3},
  {unit: "ms", factor: 1e6},
  {unit: "sec", factor: 1e9},
  {unit: "min", factor: 6e10},
  {unit: "hr", factor: 36e11}
]

module.exports = (time, precision=3) => {
  if (!isNum(time)) 
    throw new Error("requires a number in nanoseconds");
  // returns first largest match
  for (let i = units.length; i--;){
    const { unit, factor } = units[i], smallerUnit = units[i-1];
    const smallerFactor = smallerUnit ? smallerUnit.factor : 1;
    const roundedTimeInSmallerUnit = Number((time/smallerFactor).toFixed(precision))
    if (Math.abs(roundedTimeInSmallerUnit) >= factor/smallerFactor){
      return (time/factor).toFixed(precision)+unit
    }
  }
  // fallback to ns if no match
  return time.toFixed(precision) + "ns"
}