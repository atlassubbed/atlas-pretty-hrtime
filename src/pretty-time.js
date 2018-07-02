const { isNum, toStr, getAscendingUnits } = require("./util")

const units = getAscendingUnits({ns: 1, us: 1e3, ms: 1e6, s: 1e9, m: 6e10, h: 36e11})

module.exports = (t, d=4) => {
  if (!isNum(t)) 
    throw new Error("requires a number in nanoseconds");
  // return first reasonable match
  for (let i = units.length; i--;){
    const { unit, factor } = units[i];
    const str = toStr(t, d, factor, unit);
    if (str) return str;
  }
}