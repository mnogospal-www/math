class Diff {
  constructor(xTable, yTable, h) {
    this.xTable = xTable;
    this.yTable = yTable;
    this.h = h;

    this.viaTwoPoint();
    this.viaFourPoint();
  }

  viaTwoPoint() {
    this.xViaTwoPointResult = [];

    for (let i = 0; i < this.yTable.length; i++) {
      this.xViaTwoPointResult.push(
        (this.yTable[i + 1] - this.yTable[i]) / this.h
      );
    }

    this.xViaTwoPointResult.pop();
  }

  viaFourPoint() {
    this.xViaFourPointResult = [];

    for (let i = 0; i < yTable.length; i++) {
      const x = null;

      for (let j = 0; j < 4; j++) {
        switch (j) {
          case '0': {
            x =
              (1 / 6) *
              this.h *
              (-11 * yTable[i] +
                18 * yTable[i + 1] -
                9 * yTable[i + 2] +
                2 * yTable[i + 3]);
          }

          case '1': {
            x =
              (1 / 6) *
              this.h *
              (-2 * yTable[i] -
                3 * yTable[i + 1] +
                6 * yTable[i + 2] -
                yTable[i + 3]);
          }

          case '2': {
            x =
              (1 / 6) *
              this.h *
              (yTable[i] -
                6 * yTable[i + 1] +
                3 * yTable[i + 2] +
                2 * yTable[i + 3]);
          }

          case '3': {
          }
        }
      }

      this.xViaFourPointResult.push(x);
    }
  }
}

const xTable = createXTableViaH(1, 21, 0.01);
const yTable = createYTableViaCallback(xTable, Math.cosh);

const diff = new Diff(xTable, yTable, 0.01);
console.log(diff);

function createXTableViaH(firstValue, valuesCount, h) {
  const xTable = [firstValue];
  let coefficent = firstValue;

  for (let i = 0; i < valuesCount; i++) {
    coefficent += h;
    xTable.push(parseFloat(coefficent.toFixed(2)));
  }

  return xTable;
}

function createYTableViaCallback(xTable, callback) {
  const yTable = [];

  xTable.forEach((xValue) => yTable.push(callback(xValue)));

  return yTable;
}
