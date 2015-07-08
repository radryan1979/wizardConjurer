// the directive
(function() {
	angular.module('conjurer')
	.directive('wizardController', wizard);
	
	wizardController.$inject = [];
	
	function wizardController(){
		return {
			restrict: 'AEC',
			replace: true,
			transclude: true,
			scope: {},
			},
			
			controller: function() {
				
			},
			
			controllerAs: 'vm',
			tempalte: '<div ng-include="vm.tempalteUrl"></div>',
			compile: function(element) {
				return recursionHelper.compile(element);
			}
		}
	})
})
