angular.module('arrays', [])
	.service('arrays', function () {

		this.flatten = function (array) {
			return Array.prototype.concat.apply([], array);
		}

		this.partition = function (array, size) {
			var r = [];

			for(var i = 0; i < array.length; i += size) {
				r.push(array.slice(i, i + size));
			}

			return r;
		}

	});