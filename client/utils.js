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

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateEmail(email) {
  return emailRegex.test(email);
}

export function Success(template, message) {
  template.loading.set(false);
  template.success.set(message);
  window.scrollTo(0, 0);
  setTimeout(() => {
    template.success.set(false);
  }, 8000);
}

export function Failure(template, message) {
  template.loading.set(false);
  template.error.set(message);
  window.scrollTo(0, 0);
  setTimeout(() => {
    template.error.set(false);
  }, 8000);
  throw message;
}

export function Loading(template) {
  template.success.set(false);
  template.error.set(false);
  template.loading.set(true);
}
