angular.module('bfAngApp', 
['ngRoute','ngCookies','IndexController','PetController','PetFilter','PetCache','PetFinder','PetModel'])
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(true);
}]);