const { isNum, units } = require("./util")

module.exports = (time, dec=3) => {
  if (!isNum(time)) throw new Error("requires a number in nanoseconds");
  for (let i = 0; i < units.length; i++){
    const { name, factor } = units[i], scaledTime = time/factor;
    const maxVal = units[i+1] && units[i+1].factor/factor;
    const roundedTime = Number((scaledTime).toFixed(dec));
    // if time in cur unit is large enough to be the next unit, continue
    if (!maxVal || Math.abs(roundedTime) < maxVal){
      return (scaledTime).toFixed(dec)+name
    }
  }
}
