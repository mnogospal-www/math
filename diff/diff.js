function derivativeViaTwoPoints(f, point, h) {
  return (f(point + h) - f(point)) / h;
}

function derivativeViaFourPoints(f, point, h) {
  return (
    (1 / (6 * h)) *
    (-11 * f(point) + 18 * f(point + h) - 9 * f(point + 2 * h) + 2 * f(point + 3 * h))
  );
}

// function secondDerivative(f, point, h) {
//   return (
//     (1 / Math.pow(h, 2)) *
//     (2 * f(point) - 5 * f(point + 2 * h) + 4 * f(point + 2 * h) - f(point + h * 3))
//   );
// }

function delta(analitical, numerical) {
  return (analitical - numerical).toFixed(3);
}

const point = 1.2;
const f = Math.cosh;
const h = 0.01;
const analitical = 1.509;

console.log('analitical', analitical);

const viaTwoPoints = derivativeViaTwoPoints(f, point, h);
const viaFourPoints = derivativeViaFourPoints(f, point, h);
const second = secondDerivative(f, point, h);

console.log(
  `via two points | delta: ${delta(analitical, viaTwoPoints)} | value: ${viaTwoPoints} `
);

console.log(
  `via four points | delta: ${delta(
    analitical,
    viaFourPoints
  )} | value: ${viaFourPoints} | second derivative: ${second}`
);
