(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = [];

	function HomeController() {
		var home = this;
		home.title = 'Welcome to our App!';
	}
})();
