class Equation {
	constructor(epsilone, xFunctions, fiFunctions, gaps) {
		this.fi = [];
		this.approximationCount = 0;
		this.delta = [];

		this.epsilone = epsilone;
		this.xFunctions = xFunctions;
		this.fiFunctions = fiFunctions;
		this.gaps = gaps;

		this.calcFi();
		this.calcZeroApproximation();
		this.calcApproximation();
	}

	calcFi() {
		this.fi = this.fiFunctions.map((fiFunction) =>
			this.gaps.flatMap((gap) =>
				gap
					.map((value) => {
						const fiValue = fiFunction(value);
						return fiValue < 1 ? fiValue : null;
					})
					.filter((value) => value !== null)
			)
		);

		this.q = this.fi.flatMap((gap) => Math.max(...gap));
	}

	calcDelta(i, previousApproximation) {
		this.delta[i] =
			(this.q[i] / (1 - this.q[i])) *
			Math.abs(previousApproximation[i] - this.approximation[i]);
	}

	calcZeroApproximation() {
		this.approximation = this.gaps.map((gap) => (gap[0] + gap[1]) / 2);
	}

	calcApproximation() {
		const previousApproximation = [...this.approximation];

		for (let i = 0; i < this.approximation.length; i++) {
			this.approximation[i] = this.xFunctions[i](this.approximation[i]);

			this.calcDelta(i, previousApproximation);
		}

		this.approximationCount++;

		if (this.delta[0] < this.epsilone) {
			return;
		} else {
			this.calcApproximation();
		}
		if (this.delta[1] < this.epsilone) {
			return;
		} else {
			this.calcApproximation();
		}
	}
}

const xFunctions = [
	(x) => {
		return Math.exp((5 * x - 7) / 6);
	},
	(x) => {
		return (6 * Math.log(x) + 7) / 5;
	},
];

const fiFunctions = [
	(x) => {
		return 6 / (5 * x);
	},
	(x) => {
		return (5 / 6) * Math.exp((5 * x - 7) / 6);
	},
];

const gaps = [
	[0.1, 1],
	[2, 3],
];

const equation = new Equation(0.001, xFunctions, fiFunctions, gaps);
console.log(equation);
