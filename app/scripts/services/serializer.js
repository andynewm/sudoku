angular.module('sudoku')
	.service('serializer', function () {

		function pad(string, length, char) {
			while (string.length < length) {
				string = char + string;
			}

			return string;
		}

		this.encode = function(grid) {
			return grid.map(function (row) {
				return pad(parseInt(row.map(function (cell) { return cell || 0; }).join(''), 10).toString(36), 6
				, '0');
			}).join('');
		};

		this.decode = function (hash) {
			return hash.match(/.{6}/g).map(function (row) {
				return pad(parseInt(row, 36).toString(10), 9, '0')
					.split('')
					.map(function (cell) {
					return parseInt(cell, 10) || null;
				});
			});
		};

	});