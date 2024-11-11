class Equation {
	constructor(epsilone, derivatives, xFunction, gaps) {
		this.fi = [];
		this.approximationCount = 0;
		this.delta = [];
		this.m = [];

		this.epsilone = epsilone;
		this.derivatives = derivatives;
		this.xFunction = xFunction;
		this.gaps = gaps;

		this.calcZeroApproximation();
		this.calcFi();
		this.checkCondition();
		this.calcM();
		this.calcApproximation();
	}

	calcFi() {
		this.fi = this.gaps.map((gap) =>
			gap.map((value) => this.derivatives[0](value))
		);
	}

	checkCondition() {
		this.fi
			.map((fiGap) =>
				fiGap.reduce((value, acc) => {
					return value * acc, 1;
				})
			)
			.forEach((value) =>
				value > 0 ? (this.canResolve = true) : (this.canResolve = false)
			);
	}

	fiFunction(x) {
		return x - this.xFunction(x) / this.derivatives[0](x);
	}

	calcZeroApproximation() {
		this.approximation = this.gaps.map((gap) => (gap[0] + gap[1]) / 2);
	}

	calcM() {
		this.m = this.fi.map((fiRow) =>
			Math.min(...fiRow.map((value) => Math.abs(value)))
		);
	}

	isResult(index) {
		if (this.delta[index] < this.epsilone) return;
		this.calcApproximation();
	}

	calcDelta(i) {
		this.delta[i] = this.xFunction(this.approximation[i]) / this.m[i];
	}

	calcApproximation() {
		for (let i = 0; i < this.approximation.length; i++) {
			this.approximation[i] = this.fiFunction(this.approximation[i]);
			this.calcDelta(i);
		}
		this.approximationCount++;
		this.delta.map((value, i) => this.isResult(i));
	}
}

const derivatives = [
	(x) => {
		return Math.cos(x) + 2 * x;
	},
	(x) => {
		return -Math.sin(x) + 2;
	},
];

const xFunction = (x) => {
	return Math.sin(x) + Math.pow(x, 2) - 1;
};

const gaps = [[0.1, 1]];

const equation = new Equation(0.001, derivatives, xFunction, gaps);
console.log(equation);
