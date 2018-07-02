const isNum = n => typeof n === "number" && !isNaN(n)

const toStr = (n, precision, factor, name) => {
  return Math.abs(n) > factor && (n/factor).toFixed(precision) + name;
}

const getAscendingUnits = scales => {
  return Object.keys(scales)
    .map(unit => ({unit, factor: scales[unit]}))
    .sort((a,b) => a.factor < b.factor)
}

module.exports = { isNum, toStr, getAscendingUnits }