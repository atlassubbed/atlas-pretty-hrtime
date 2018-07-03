const { isNum, getAscendingUnits } = require("./util")

const possibleScales = {us: 1e3, ms: 1e6, sec: 1e9, min: 6e10, hr: 36e11}

const units = getAscendingUnits(possibleScales)

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