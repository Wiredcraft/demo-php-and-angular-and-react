var module = angular.module('App', [
    'ngSanitize',
]);

module.directive('appSubmit', ['$log', '$http', function($log, $http) {
    return {
        // name: '',
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<button ng-click="submit()" class="btn btn-primary">Submit</button>',
        // templateUrl: '',
        link: function($scope, iElm, iAttrs, controller) {
            $scope.submit = function submit() {
                $http.post(iAttrs.url, {
                    'form': $scope.formData
                }).success(function(data) {
                    $scope.result = JSON.stringify(data);
                });
            };
        }
    };
}]);
