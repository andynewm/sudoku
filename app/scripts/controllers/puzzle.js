/* global angular */

angular.module('sudoku')
	.controller('puzzleCtrl', ['$scope', 'solver',
		function ($scope, solver) {

			$scope.grid = [
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null]
			];

			$scope.invalid = false;

			$scope.result = null;

			$scope.$watch('grid', function (grid) {
				var result = solver.solve(grid);

				$scope.invalid = !result;

				$scope.result = result && result.solution;
				$scope.unique = result && result.unique;
			}, true);

			$scope.range = function (n) {
				var r = [];
				while (n--) {
					r.unshift(n);
				}
				return r;
			}

	}]);