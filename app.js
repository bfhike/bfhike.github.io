angular.module('petapp', ['HomeController','PetFilter','PetCache','PetFinder'])
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);