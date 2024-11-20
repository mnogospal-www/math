function lagrangeInterpolation(points, x) {
  let totalSum = 0;

  for (let i = 0; i < points.length; i++) {
    const [xi, yi] = points[i];
    let pointSum = yi;

    for (let j = 0; j < points.length; j++) {
      if (j !== i) {
        const [xj] = points[j];
        pointSum *= (x - xj) / (xi - xj);
      }
    }

    totalSum += pointSum;
  }

  return totalSum;
}

const points = [
  [1, 0.3679],
  [1.04, 0.3535],
  [1.08, 0.3396],
  [1.12, 0.3263],
  [1.16, 0.3135],
  [1.2, 0.3012],
];

const x = 1.01;
const result = lagrangeInterpolation(points, x);

console.table(points);
console.log(`${x} = ${result}`);
