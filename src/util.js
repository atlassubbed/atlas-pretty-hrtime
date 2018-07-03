const isNum = n => typeof n === "number" && !isNaN(n)

const getAscendingUnits = scales => {
  return Object.keys(scales)
    .map(unit => ({unit, factor: scales[unit]}))
    .sort((a,b) => a.factor > b.factor)
}

module.exports = { isNum, getAscendingUnits }