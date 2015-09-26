/* Author: Bob Ferrero
Index is the header and navigation portion of the application
*/

angular.module('IndexController', ['ngRoute', 'PetModel'])

.controller('Index',
['$scope', '$filter', '$document', '$timeout', '$route', '$routeParams', '$location', 'petmodel',
function ($scope, $filter, $document, $timeout, $route, $routeParams, $location, petmodel) {

  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;

  $scope.petmenu = petmodel.animalTypes;
  $scope.$watch('$routeParams.animal', function () {
    $scope.animal = $routeParams.animal;
  });

  $document.ready(function () {
  });

} ])

  .controller('Another', function ($scope, $routeParams) {
    $scope.name = "Another";

    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

  })

 .config(function ($routeProvider, $locationProvider) {
   $routeProvider
   .when('/pets/:animal?', {
     templateUrl: 'pets.html',
     controller: 'PetController',
     resolve: {
       // from example code: 1 second delay
       /*
       delay: function ($q, $timeout) {
       var delay = $q.defer();
       $timeout(delay.resolve, 1000);
       return delay.promise;
       } */
     }
   });

   // this is hacky but it allows page to reload
   // must use #!/ in the URLs of any anchor tag that causes navigation
   $locationProvider.html5Mode(true);
 });

