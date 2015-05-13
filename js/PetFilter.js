angular.module('PetFilter', ['PetFinder'])

.filter('checkmark', function () {
  // adds a checkmark or X for true/false, respectively
  // from the Angular tutorial
  return function (input) {
    return input ? '\u2713' : '\u2718';
  };
})

.filter('address', function () {
  return function (contact) {
    return contact && (contact.city.$t + ', ' + contact.state.$t + ' ' + contact.zip.$t);
  };
})

.filter('description', function () {
  return function (description) {
    var d = description["$t"];
    return d && d.length && d.length > 0 ? (d.substring(0,500)+(d.length>500?' READ MORE...':'')) : null;
  };
})

.filter('photos', function () {
  return function (photos, size) {
    var result = [];
    for (p in photos) {
      if (photos[p]['@size'] == size) {
        result.push(photos[p]);
      }
    }
    return result;
  };
})

.filter('shelters', function (petfinder) {
  return function (input) {
    var value = input;
    // TODO
    // var callback = function (data) { value = data.petfinder.sheltername; };
    // petfinder.findShelter(input, callback.bind(this));
    return value;
  };

}).filter('sizes', function () {
  var sizes = {
    "S": "Small",
    "M": "Medium",
    "L": "Large",
    "XL": "Extra-Large"
  };
  return function (input) {
    return sizes[input] + '-sized';
  };
})

.filter('sexes', function () {
  var sexes = {
    "M": "Male",
    "F": "Female"
  };
  return function (input) {
    return sexes[input];
  };
})

.filter('status', function () {
  var status = {
    "A": "Adoptable",
    "H": "On Hold",
    "P": "Pending",
    "X": "Adopted"
  };
  return function (input) {
    return status[input];
  };
})

.filter('options', function () {
  var options = {
    "altered": "Spayed / Neutered",
    "noClaws": "No Claws",
    "hasShots": "Has Current Shots",
    "housebroken": "Housebroken",
    "noCats": "Not Good With Cats",
    "noDogs": "Not Good With Dogs",
    "noKids": "Not Good With Kids",
    "specialNeeds": "Has Special Needs"
  };
  return function (input) {
    return options[input];
  };
});