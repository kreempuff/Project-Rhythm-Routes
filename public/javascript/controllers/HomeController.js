(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ["SpotifyFactory"];

	function HomeController(SF) {
		var vm = this;
		vm.title = 'Welcome to our App!';
	}
})();
