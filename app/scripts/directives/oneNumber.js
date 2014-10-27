/* global angular, $ */

angular.module('sudoku')
	.directive('oneNumber', function () {

		return {
			require: 'ngModel',
			link: function (scope, element, attr, modelCtrl) {
					element.on('keydown', function () {
						this.setSelectionRange(1, 1);
					});

					modelCtrl.$parsers.push(function (inputValue) {

					var transformedInput = inputValue
						.replace(/[^1-9]/g, '')
						.substr(-1); 

					if (transformedInput) {
						transformedInput = parseInt(transformedInput);
					}

					if (transformedInput!=inputValue) {
						modelCtrl.$setViewValue(transformedInput);
						modelCtrl.$render();
					}

					 return transformedInput;
				});
			}
		};

	});