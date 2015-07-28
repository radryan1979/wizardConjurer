var wizardController = (function () {
    function wizardController($scope, wizardServiceAPI) {
        this.$scope = $scope;
        this.wizardServiceAPI = wizardServiceAPI;
        // Public properties, bindable in the UI
        this.showFinish = false;
        this.wizardName = $scope.wizname;
    }
    ;
    return wizardController;
})();
//# sourceMappingURL=conjurer.directive.js.map