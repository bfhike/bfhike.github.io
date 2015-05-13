angular.module('HomeController', ['PetFinder', 'ImageArray']).controller('Home',
['$scope', '$filter', '$document', '$timeout', 'petfinder', 'imageArray',
function ($scope, $filter, $document, $timeout, petfinder, ImageArray) {

  // put it in the global scope for debugging
  //HomeControllerClosureForDebugging = function () {};

  /* auto-load for testing*/
  $document.ready(function () {
    $scope.initTooltips();
    $('.zipcode').focus();
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

  $scope.animalSelector = [
        { 'option': 'dogs', 'value': 'dog' }, { 'option': 'cats', 'value': 'cat' },
        { 'option': 'birds', 'value': 'bird' }, { 'option': 'rabbits', 'value': 'rabbit' },
        { 'option': 'pigs', 'value': 'pigs' }, { 'option': 'farm', 'value': 'barnyard' },
        { 'option': 'horses', 'value': 'horse' },
        { 'option': 'reptiles', 'value': 'reptiles' }, { 'option': 'small & furry', 'value': 'smallfurry' }
    ];

  $scope.animal = 'dog';
  $scope.zipcode = null;
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
      $timeout(function() {
        $scope.showspinner = false;
      },0);
    };
    petfinder.findPets($scope.zipcode, $scope.animal, callback.bind(this));
  };

  $scope.initTooltips = function () {
    var tooltips = function () {
      $('[data-toggle="tooltip"]').tooltip();
    };
    setTimeout(tooltips, 100);
  };

} ]);