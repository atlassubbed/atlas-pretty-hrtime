# atlas-pretty-hrtime

Converts a time in nanoseconds to a pretty string in the most convenient units.

[![Travis](https://img.shields.io/travis/atlassubbed/atlas-pretty-hrtime.svg)](https://travis-ci.org/atlassubbed/atlas-pretty-hrtime)

---

## install

```
npm install --save atlas-pretty-hrtime
```

## why

Printing times is annoying, so this is me thinking about it once and hopefully never again. If you are doing performance testing, you will encounter time diffs between different points in your code. With this module, you don't need to worry about how to print those times in various units with varying precision -- it's done automatically for you.

## examples

The exported function takes a `time` in nanoseconds, an optional precision integer and returns a string. The default precision is `3` decimal places, and prints units up to hours.

```javascript
const pretty = require("atlas-pretty-time");
// all times in nanoseconds
const times = [  
                 // output units:
  0,             // ns
  123,           // ns
  1234,          // us
  12345,         // us
  123456,        // us
  1234567,       // ms
  12345678,      // ms
  123456789,     // ms
  1234567890,    // sec
  12345678901,   // sec
  123456789012,  // min
  1234567890123, // min
  12345678901234 // hr
]
times.forEach(time => {
  // round to 1 decimal place
  const prettyTime = pretty(time, 1);
  console.log(prettyTime)
});
// 0.0ns
// 123.0ns
// 1.2us
// 12.3us
// 123.5us
// 1.2ms
// 12.3ms
// 123.5ms
// 1.2sec
// 12.3sec
// 2.1min
// 20.6min
// 3.4hr
```

## caveats

#### units

Only accepts times in nanoseconds, because supporting multiple input units is outside the scope of this package. This package is primarily for printing time diffs, which should not be in milliseconds or seconds if you're using high resolution time. See [atlas-hrtime](https://github.com/atlassubbed/atlas-hrtime#readme).

#### fractional minutes and hours

For simplicity, this module does not decompose fractional minutes into "minutes and seconds" (and similarly with hours). This doesn't bother me much, so I'm unlikely to implement something like:

```javascript
console.log(pretty(123456789012, 1))
// 2min 3sec
```

#### specifying return units

At the moment, this is not possible, but I may implement it in the future if I need finer-grained control on the output units:

```javascript
console.log(pretty(123456789012, 1, "sec"))
// 123.5sec
```
