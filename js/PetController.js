angular.module('PetController', ['ngRoute', 'ngCookies', 'PetFinder', 'ImageArray', 'PetModel'])
.controller('PetController',
['$scope', '$filter', '$document', '$timeout', '$route', '$routeParams', '$location', '$cookies', 'petfinder', 'imageArray', 'petmodel',
function ($scope, $filter, $document, $timeout, $route, $routeParams, $location, $cookies, petfinder, ImageArray, petmodel) {

  $scope.name = "PetController";
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  $scope.animalSelector = petmodel.animalTypes;

  /* pet global variables */
  $scope.locationCookiename = 'location';
  $scope.location = $cookies.get($scope.locationCookiename);
  $scope.updateCookie = function () {
    $cookies.put($scope.locationCookiename, $scope.location);
  };

  $scope.animal = null;
  $scope.$watch('$routeParams.animal', function () {
    $scope.animal = $routeParams.animal;
    $scope.findpets();
  });

  $scope.message = null;
  $scope.hasMessage = $scope.message != null && $scope.message.length > 0;

  $scope.petImages = new ImageArray();
  $scope.modal = new ImageArray();

  $scope.modalpet = null;

  $scope.modal.show = function (pet, petIndex) {
    $scope.modalpet = pet;
    $scope.modal.petIndex = 0;
    var bigphotos = $filter('photos')(pet.media.photos.photo, 'pn');
    for (p in bigphotos) {
      // always using petIndex == 0 because there is only one modal window
      $scope.modal.init(pet, 0, bigphotos[p]);
    }
    $('#modalWindow').modal('show');
  };

  $scope.modal.hide = function () {
    $('#modalWindow').modal('hide');
  };

  $scope.adoptableStatus = { "status": { "$t": "A"} };
  $scope.showspinner = false;

  $scope.findpets = function () {
    $scope.showspinner = true;
    var callback = function (data) {
      if (!data || !data.petfinder || !data.petfinder.pets || !data.petfinder.pets.pet) {
        $scope.message = "No pets found in that area";
      }
      else {
        $scope.pets = data.petfinder.pets.pet;
      }
      // use timeout because cached hits are too fast and this will wait until content is loaded
      $timeout(function () {
        $scope.showspinner = false;
      }, 0);
    };
    petfinder.findPets($scope.location, $scope.animal, callback.bind(this));
  };

  $scope.initTooltips = function () {
    var tooltips = function () {
      $('[data-toggle="tooltip"]').tooltip();
    };
    setTimeout(tooltips, 100);
  };

  /* auto-load for testing*/
  $document.ready(function () {
    $scope.initTooltips();
    $('.location').focus();
  });

} ]);