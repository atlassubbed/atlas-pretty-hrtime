const isNum = n => typeof n === "number" && !isNaN(n)

const units = [
  {name: "ns", factor: 1},
  {name: "us", factor: 1e3},
  {name: "ms", factor: 1e6},
  {name: "sec", factor: 1e9},
  {name: "min", factor: 6e10},
  {name: "hr", factor: 36e11}
]

module.exports = { isNum, units }