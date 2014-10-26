function solve(grid) {

	var state = blot(grid);

	var changeState = state.filter(function (cell) { return !cell.fixed; });

	var pointer = 0;

	while (pointer < changeState.length) {
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

	return reverse(state);
}

function blot(grid) {
	var infoGrid = grid.map(function(row) {
		return row.map(function (cell) {
			return {
				value: cell,
				fixed: !!cell,
				linked: []
			};
		});
	});

	var list = flatten(infoGrid);
	addLinks(list);

	return list;
}

function reverse(state) {
	return partition(state.map(function (cell) {
		return cell.value || 0;
	}), 9);
}

function flatten(array) {
	return Array.prototype.concat.apply([], array);
}

function partition(array, size) {
	var r = [];

	for(var i = 0; i < array.length; i += size) {
		r.push(array.slice(i, i + size));
	}

	return r;
}

function addLinks(list) {
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
		var cell = list[i];
		for (var j = i + 1; j < 81; j++) {
			var otherCell = list[j];
			if (row(i) == row(j) || column(i) == column(j) || block(i) == block(j)) {
				otherCell.linked.push(cell);
				cell.linked.push(otherCell);
			}
		}
	}
}