angular.module('PetFinder', ['PetCache'])
.factory('petfinder', ['$http', 'shelters', 'petcache', function ($http, shelters, petcache, constants) {

  var constants = { test: false, url: 'http://githubio-dot-bfapps.appspot.com/pets' };

  var utils = {
    getPetsCacheKey: function (location, animal) {
      return (location + animal).toLowerCase();
    },

    getPetsCacheSuccessFunction: function (location,animal,success,data) {
      // bound to getPets scope for location, animal, success
      if (data) {
        petcache.put(this.getPetsCacheKey(location, animal), data);
      }
      success(data);
    },

    getPets: function (location, animal, success) {
      if (location == null || animal == null || success == null)
        return null;

      var params = {
        count: 100,
        callback: 'JSON_CALLBACK',
        location: location,
        animal: animal,
        format: 'json'
      };
      var pets = null;
      var successwrapper = this.getPetsCacheSuccessFunction.bind(this,location,animal,success);
      $http.jsonp(constants.url, { 'params': params }).success(successwrapper);
    },

    getPetsMock: function (location, animal, success) {
      if (location == null || animal == null || success == null)
        return null;

      /* use the mock for testing */
      var successwrapper = this.getPetsCacheSuccessFunction.bind(this,location,animal,success);
      $http.get('js/petfinder-mock-multiple-pics.js').success(this.getPetsCacheSuccessFunction.bind(this,location,animal,success));
    },

    getShelterByIdCacheKey: function (shelterId) {
      return ("" + shelterId).toLowerCase();
    },

    getShelterByIdCacheSuccessFunction: function (shelterId, success, data) {
      // bound to getShelterById scope for shelterId, success
      if (data) {
        petcache.put(this.getShelterByIdCacheKey(shelterId), data);
      }
      success(data);
    },

    getShelterById: function (shelterId, success) {
      var params = {
        id: shelterId,
        callback: 'JSON_CALLBACK',
        format: 'json'
      };
      params[this.r.y()] = this.r.v();
      $http.jsonp(constants.url + 'shelter.get?', { 'params': params }).success(
        this.getShelterByIdCacheSuccessFunction.bind(this, shelterId, success)
      );
    },

    getShelterByIdMock: function (shelterId, success) {
      /* use the mock for testing */
      $http.get('js/petfinder-mock-shelterget.js').success(
        this.getShelterByIdCacheSuccessFunction.bind(this, shelterId, success)
      );
    }

  };

  return {

    findShelter: function (shelterPetId, success) {
      if (typeof success != 'function') success();

      var result = shelters.get(shelterPetId);
      if (result) {
        success(result);
      }
      else
      {
        if (constants.test)
          utils.getShelterByIdMock(shelterPetId, success);
        else
          utils.getShelterById(shelterPetId, success);
      }
    },

    findPets: function (location, animal, success) {
      if (typeof success != 'function') success();
      if (location == null || location.length < 5 || animal == null || animal.length < 2)
        success(null);

      var result = petcache.get(utils.getPetsCacheKey(location, animal));
      if (result) {
        success(result);
      }
      else
      {
        if (constants.test)
          utils.getPetsMock(location, animal, success);
        else
          utils.getPets(location, animal, success);
      }
    }

  };  // end of return statement

} ]);