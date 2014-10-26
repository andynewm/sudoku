angular.module('sudoku')
	.factory('solver', function (arrays) {

		function buildState() {
			var cells = [];

			for (var i = 0; i < 81; i++) {
				cells.push({
					linked: []
				});
			}

			addLinks(cells);

			return cells;
		}

		var state = buildState();

		function setStateValue(grid) {
			arrays.flatten(grid).forEach(function (cell, index) {
				state[index].value = cell;
			});
		}

		function solve(grid) {

			setStateValue(grid);

			if (!validate()) {
				return null;
			}

			var changeState = state.filter(function (cell) { return !cell.value; });

			var pointer = 0;

			var solution;

			while (true) {
				if (pointer < 0) {
					if (solution) {
						return {
							solution: solution,
							unique: true
						};
					}
					return {
						solution: null
					};
				}

				if (pointer >= changeState.length) {
					if (solution) {
						return {
							solution: solution,
							unique: false
						};
					}
					solution = reverse(state);
					changeState[--pointer].value = 0;
					pointer--;
				}

				var cell = changeState[pointer];
				var n = ++cell.value;

				if (n > 9) {
					changeState[pointer--].value = 0;
					continue;
				}

				if (cell.linked.every(function (linkedCell) {
					return linkedCell.value != cell.value;
				})) {
					pointer++;
				}
			}
		}

		function validate() {

			var toCheck = state.filter(function (cell) { return cell.value; });

			return toCheck.every(function (cell) {
				return cell.linked.every(function (linkedCell) {
					return linkedCell.value != cell.value;
				});
			});

		}

		function reverse(state) {
			return arrays.partition(state.map(function (cell) {
				return cell.value || 0;
			}), 9);
		}

		function addLinks(cells) {
			function row(n) {
				return Math.floor(n/9);
			}

			function column(n) {
				return n % 9;
			}

			function block(n) {
				return Math.floor(row(n) / 3) * 3 + Math.floor(column(n) / 3);
			}

			for (var i = 0; i < 81; i++) {
				var cell = cells[i];
				for (var j = i + 1; j < 81; j++) {
					var otherCell = cells[j];
					if (row(i) == row(j) || column(i) == column(j) || block(i) == block(j)) {
						otherCell.linked.push(cell);
						cell.linked.push(otherCell);
					}
				}
			}
		}

		return {
			solve: solve
		};

	});