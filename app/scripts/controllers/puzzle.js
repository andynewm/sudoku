/* global angular */

angular.module('sudoku')
	.controller('puzzleCtrl', ['$scope', '$location', 'solver', 'serializer',
		function ($scope, $location, solver, serializer) {

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

			$scope.$watch(function () { return $location.search().s; }, function (s) {
				if (s) {
					$scope.grid = serializer.decode(s);
				}
			});

			$scope.$watch('grid', function (grid) {
				var result = solver.solve(grid);

				$scope.invalid = !result;

				$scope.result = result && result.solution;
				$scope.unique = result && result.unique;

				$location.search('s', serializer.encode(grid));
			}, true);

			$scope.range = function (n) {
				var r = [];
				while (n--) {
					r.unshift(n);
				}
				return r;
			}

	}]);