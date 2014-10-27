angular.module("arrays",[]).service("arrays",function(){this.flatten=function(a){return Array.prototype.concat.apply([],a)},this.partition=function(a,b){for(var c=[],d=0;d<a.length;d+=b)c.push(a.slice(d,d+b));return c}}),angular.module("sudoku",["arrays"]),angular.module("sudoku").controller("puzzleCtrl",["$scope","$location","solver","serializer",function(a,b,c,d){a.grid=[[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null]],a.invalid=!1,a.result=null,a.$watch(function(){return b.search().s},function(b){b&&(a.grid=d.decode(b))}),a.$watch("grid",function(e){var f=c.solve(e);a.invalid=!f,a.result=f&&f.solution,a.unique=f&&f.unique,b.search("s",d.encode(e))},!0),a.range=function(a){for(var b=[];a--;)b.unshift(a);return b}}]),angular.module("sudoku").factory("solver",["arrays",function(a){function b(){for(var a=[],b=0;81>b;b++)a.push({linked:[]});return g(a),a}function c(b){a.flatten(b).forEach(function(a,b){h[b].value=a})}function d(a){if(c(a),!e())return null;for(var b,d=h.filter(function(a){return!a.value}),g=0;;){if(0>g)return b?{solution:b,unique:!0}:{solution:null};if(g>=d.length){if(b)return{solution:b,unique:!1};b=f(h),d[--g].value=0,g--}var i=d[g],j=++i.value;j>9?d[g--].value=0:i.linked.every(function(a){return a.value!=i.value})&&g++}}function e(){var a=h.filter(function(a){return a.value});return a.every(function(a){return a.linked.every(function(b){return b.value!=a.value})})}function f(b){return a.partition(b.map(function(a){return a.value||0}),9)}function g(a){function b(a){return Math.floor(a/9)}function c(a){return a%9}function d(a){return 3*Math.floor(b(a)/3)+Math.floor(c(a)/3)}for(var e=0;81>e;e++)for(var f=a[e],g=e+1;81>g;g++){var h=a[g];(b(e)==b(g)||c(e)==c(g)||d(e)==d(g))&&(h.linked.push(f),f.linked.push(h))}}var h=b();return{solve:d}}]),angular.module("sudoku").service("serializer",function(){function a(a,b,c){for(;a.length<b;)a=c+a;return a}this.encode=function(b){return b.map(function(b){return a(parseInt(b.map(function(a){return a||0}).join(""),10).toString(36),6,"0")}).join("")},this.decode=function(b){return b.match(/.{6}/g).map(function(b){return a(parseInt(b,36).toString(10),9,"0").split("").map(function(a){return parseInt(a,10)||null})})}}),angular.module("sudoku").directive("oneNumber",function(){return{require:"ngModel",link:function(a,b,c,d){b.on("keydown",function(){this.setSelectionRange(1,1)}),d.$parsers.push(function(a){var b=a.replace(/[^1-9]/g,"").substr(-1);return b&&(b=parseInt(b)),b!=a&&(d.$setViewValue(b),d.$render()),b})}}}),angular.module("sudoku").directive("browsable",function(){return{link:function(a,b){b.on("keydown",function(a){switch(a.which){case 39:return $(this).closest("td").next().find("input").focus(),!1;case 38:return index=$(this).closest("td").index(),$(this).closest("tr").prev().children().eq(index).find("input").focus(),!1;case 37:return $(this).closest("td").prev().find("input").focus(),!1;case 40:return index=$(this).closest("td").index(),$(this).closest("tr").next().children().eq(index).find("input").focus(),!1}})}}});