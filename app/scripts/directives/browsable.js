/* global angular, $ */

angular.module('sudoku')
	.directive('browsable', function () {

		return {
			link: function (scope, element) {
				element.on('keydown', function (e) {
					switch(e.which) {
						case 39:
							$(this)
								.closest('td')
								.next()
								.find('input')
								.focus();

							return false;

						case 38:
							index = $(this)
								.closest('td')
								.index();

							$(this)
								.closest('tr')
								.prev()
								.children()
								.eq(index)
								.find('input')
								.focus();

							return false;

						case 37:
							$(this)
								.closest('td')
								.prev()
								.find('input')
								.focus();

							return false;

						case 40:
							index = $(this)
								.closest('td')
								.index();

							$(this)
								.closest('tr')
								.next()
								.children()
								.eq(index)
								.find('input')
								.focus();

							return false;
					}
				});
			}
		};

	});