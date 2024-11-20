class LinearEquation {
	constructor(A, B, epsilone) {
		this.coefficients = [];
		this.coefficientIndexes = [];
		this.xValues = [];
		this.approximationCount = 1;

		this.A = A;
		this.B = B;
		this.epsilone = epsilone;

		this.findCoefficients();
		this.calcMatrixNorm();
		this.calculateZeroApproximation();
		this.calcApproximation();
	}

	findCoefficients() {
		this.A.forEach((row, i) => {
			this.xValues.push(...row.filter((value) => value === row[i]));
			this.coefficients.push(row.filter((value) => value !== row[i]));
			this.coefficientIndexes.push(
				row.map((value, i) => i).filter((index) => index !== i)
			);
		});
	}

	calcMatrixNorm() {
		this.matrixNorm = Math.max(
			...this.coefficients
				.map((row) =>
					row.reduce((valueSum, value) => Math.abs(valueSum + value), 0)
				)
				.map((value, i) => {
					if (this.xValues[i] !== 0) {
						return value / this.xValues[i];
					}
					return 0;
				})
		);
	}

	calculateZeroApproximation() {
		if (this.matrixNorm < 1) {
			this.approximation = this.xValues.map((value, i) => this.B[i] / value);
		} else {
			this.approximation = null;
		}
	}

	calcDelta(i, previousApproximation) {
		this.delta =
			(this.matrixNorm / (1 - this.matrixNorm)) *
			Math.abs(previousApproximation[i] - this.approximation[i]);
	}

	calcCoefficientSum() {
		return this.coefficients
			.map((row, i) =>
				row.map((value, j) => {
					return value * this.approximation[this.coefficientIndexes[i][j]];
				})
			)
			.map((row) => row.reduce((valueSum, value) => valueSum + value, 0));
	}

	calcApproximation() {
		if (this.approximation === null)
			return (this.approximation = 'Нет решения, матрица не сходится');

		for (let i = 0; i < this.approximation.length; i++) {
			const previousApproximation = [...this.approximation];
			const coefficientSum = this.calcCoefficientSum();

			this.approximation[i] =
				(1 / this.xValues[i]) * (this.B[i] - coefficientSum[i]);
			this.calcDelta(i, previousApproximation);
		}

		this.approximationCount++;

		if (this.delta < this.epsilone) return;
		this.calcApproximation();
	}
}

const B = [0.395, 0.432, 0.127, 0.458];
const A = [
	[3.91, 0.129, 0.283, 0.107],
	[0.217, 4.691, 0.279, 0.237],
	[0.201, 0.372, 2.987, 0.421],
	[0.531, 0.196, 0.236, 5.032],
];

const linearEquation = new LinearEquation(A, B, 0.001);
console.log(linearEquation);
