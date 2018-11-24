/**
 * Generates an arry from the ranges provided
 * @param {*} a
 * @param {*} b
 * @param {*} step
 */
export function ArrayGenerator(min, max, step) {
  const A = [];
  if (typeof min == "number") {
    A[0] = min;
    step = step || 1;
    while (min + step <= max) {
      A[A.length] = min += step;
    }
  } else {
    const s = "abcdefghijklmnopqrstuvwxyz";
    if (min === min.toUpperCase()) {
      max = max.toUpperCase();
      s = s.toUpperCase();
    }
    s = s.substring(s.indexOf(min), s.indexOf(max) + 1);
    A = s.split("");
  }
  return A;
}
