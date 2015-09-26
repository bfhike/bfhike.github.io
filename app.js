angular.module('bfAngApp', ['ngRoute','IndexController','PetController','PetFilter','PetCache','PetFinder','PetModel'])
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(true);
}]);