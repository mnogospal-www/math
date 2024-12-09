function calcIntegrationByRectangles(h, y) {
  let acc = 0;

  for (let i = 1; i < y.length; i++) {
    acc += y[i] * h;
  }

  return acc;
}

function calcIntegrationByTrapezoid(h, y) {
  let acc = 0;

  for (let i = 1; i < y.length; i++) {
    acc += ((y[i] + y[i - 1]) / 2) * h;
  }

  return acc;
}

function calcIntegrationBySimpsonMethod(h, y) {
  let oddSum = 0;
  let evenSum = 0;

  y.forEach((value, i) => {
    if (i % 2 === 0) {
      evenSum += value;
    } else {
      oddSum += value;
    }
  });

  return (h / 3) * (y[0] + y[y.length - 1] + 2 * evenSum + 4 * oddSum);
}

const h = 0.001;
const x = [0.724, 0.725, 0.726, 0.727, 0.728];
const y = [0.9, 0.89957, 0.89914, 0.8987, 0.89825];

console.log(calcIntegrationByRectangles(h, y));
console.log(calcIntegrationByTrapezoid(h, y));
console.log(calcIntegrationBySimpsonMethod(h, y));
