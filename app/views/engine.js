var identity = [
	[1, 2, 3, 4, 5, 6, 7, 8, 9],
	[4, 5, 6, 7, 8, 9, 1, 2, 3],
	[7, 8, 9, 1, 2, 3, 4, 5, 6],
	[2, 3, 1, 5, 6, 4, 8, 9, 7],
	[5, 6, 4, 8, 9, 7, 2, 3, 1],
	[8, 9, 7, 2, 3, 1, 5, 6, 4],
	[3, 1, 2, 6, 4, 5, 9, 7, 8],
	[6, 4, 5, 9, 7, 8, 3, 1, 2],
	[9, 7, 8, 3, 1, 2, 6, 4, 5]
];

var eg = [
	[5,3,0,0,0,0,0,2,8],
	[1,0,0,0,3,0,9,0,6],
	[9,8,0,0,0,4,0,3,0],
	[4,1,0,0,9,0,0,0,0],
	[2,0,5,7,0,8,3,0,4],
	[0,0,0,0,4,0,0,5,1],
	[0,2,0,9,0,0,0,4,3],
	[3,0,1,0,6,0,0,0,2],
	[7,5,0,0,0,0,0,1,9]
];

var e = [[0,3,0,0,1,0,0,0,0],
[1,0,0,0,0,4,0,0,0],
[8,6,0,0,0,0,0,0,5],
[0,2,0,0,6,1,7,0,0],
[0,0,0,5,0,3,0,0,0],
[0,0,7,9,4,0,0,1,0],
[5,0,0,0,0,0,0,3,2],
[0,0,0,1,0,0,0,0,9],
[0,0,0,0,8,0,0,6,0]];

function solve(grid) {
	var start = new Date();

	var state = blot(grid);

	do {
		pass(state);
	} while (state.some(function (cell) {
		return cell.options;
	}));
	console.log(new Date() - start);

	print(reverse(state));
}

function solveb(grid) {
	var start = new Date();

	var state = blotb(grid);

	var changeState = state.filter(function (cell) { return !cell.fixed; });

	var pointer = 0;

	while (pointer < changeState.length) {
		var cell = changeState[pointer];
		var n = ++cell.value;

		if (n > 9) {
			changeState[pointer--].value = 0;
			continue;
		}

		if(cell.groups.every(function (group) {
			return group.every(function (linkedCell) {
				return (linkedCell.pos.x == cell.pos.x && linkedCell.pos.y == cell.pos.y) || linkedCell.value != n;
			});
		})) {
			pointer++;
		}

	}

	print(reverse(state));

	console.log(new Date() - start);
}

function blotb(grid) {
	return flatten(buildGrouped(grid.map(function(row) {
		return row.map(function (cell) {
			return {
				value: cell,
				fixed: !!cell
			};
		});
	})));
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

// for each filled in, removed poss from group
// for each group, if n only has one poss, fill

function pass(state) {
	state.filter(function (cell) { return cell.value; }).forEach(function (cell) {
		cell.groups.forEach(function (group) {
			group.filter(function (linkedCell) { return linkedCell.options; }).forEach(function (linkedCell) {
				var index = linkedCell.options.indexOf(cell.value);

				if (index > -1) {
					linkedCell.options.splice(index, 1);

					if (linkedCell.options.length == 1) {
						linkedCell.value = linkedCell.options[0];
						linkedCell.options = null;
					}
				}
			});
		});
	});
}

function blot(grid) {
	return flatten(buildGrouped(grid.map(function(row) {
		return row.map(function (cell) {
			return cell
				? { value : cell }
				: { options: [1,2,3,4,5,6,7,8,9] };
		});
	})));
}

function buildGrouped(grid) {
	var colGroups = [[],[],[],[],[],[],[],[],[]];
	var rowGroups = [[],[],[],[],[],[],[],[],[]];
	var blockGroups = [[],[],[],[],[],[],[],[],[]];
	
	grid.forEach(function(row, y) {
		row.forEach(function(cell, x) {
			cell.groups = [
				rowGroups[y],
				colGroups[x],
				blockGroups[Math.floor(y/3)*3 + (Math.floor(x/3))]
			];
			
			cell.groups.forEach(function (group) {
				 group.push(cell)
			});
		});
	});

	return grid;
}

function pad(string, length, char) {
	while (string.length < length) {
		string = char + string;
	}
	
	return string;
}

function encode(grid) {
	return grid.map(function (row) {
		return pad(parseInt(row.join(''), 10).toString(36), 6
		, '0');
	}).join('');
}

function decode(hash) {
	return hash.match(/.{6}/g).map(function (row) {
		return parseInt(row, 36).toString(10).split('').map(function (cell) {
			return parseInt(cell, 10);
		});
	});
}

function randomBoard() {
	var board = JSON.parse(JSON.stringify(identity));

	scramble(board);
}

function partition(array, size) {
	var result = [];

	for (var i = 0; i < array.length; i += size) {
		result.push(array.slice(i, i + size));
	}

	return result;
}

function transpose(grid) {
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < i; j++) {
			var t = grid[i][j];
			grid[i][j] = grid[j][i];
			grid[j][i] = t;
		}
	}
}

function scramble(grid) {
	scrambleRows(grid);
	transpose(grid);
	scrambleRows(grid);
}

function scrambleRows(grid) {
	shuffle(grid, 0, 3);
	shuffle(grid, 3, 6);
	shuffle(grid, 6, 9);
}

function scrambleBlocks(grid) {

}

function print(grid) {
	grid.forEach(function (row) {
		console.log(row.join('|'));
	});
}

function shuffle(array, start, end) {
  var t, i;
  
  start = start || 0
  
  end = end || array.length;

  while (end > start) {
	i = Math.floor(Math.random() * (end-- - start)) + start;
	
	t = array[end];
	array[end] = array[i];
	array[i] = t;
  }

  return array;
}