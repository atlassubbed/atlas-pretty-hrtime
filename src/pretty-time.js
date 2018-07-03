const { isNum, getAscendingUnits } = require("./util")

const units = getAscendingUnits({us: 1e3, ms: 1e6, sec: 1e9, min: 6e10, hr: 36e11})

module.exports = (time, precision=3) => {
  if (!isNum(time)) 
    throw new Error("requires a number in nanoseconds");
  // return first reasonable match
  for (let i = units.length; i--;){
    const { unit, factor } = units[i], nextUnit = units[i-1];
    const nextFactor = nextUnit ? nextUnit.factor : 1;
    const smallerUnitTime = Number((time/nextFactor).toFixed(precision))
    if (Math.abs(smallerUnitTime) >= factor/nextFactor){
      return (time/factor).toFixed(precision)+unit
    }
  }
  // fallback to ns if no match
  return time.toFixed(precision) + "ns"
}