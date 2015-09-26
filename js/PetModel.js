angular.module('PetModel', [])
.factory('petmodel', [function () {

  var animalTypes = [
        { 'name': 'Dogs', 'value': 'dog' }, { 'name': 'Cats', 'value': 'cat' },
        { 'name': 'Birds', 'value': 'bird' }, { 'name': 'Rabbits', 'value': 'rabbit' },
        { 'name': 'Pigs', 'value': 'pigs' }, { 'name': 'Farm', 'value': 'barnyard' },
        { 'name': 'Horses', 'value': 'horse' },
        { 'name': 'Reptiles', 'value': 'reptiles' }, { 'name': 'Rodents', 'value': 'smallfurry' }
    ];

  return {
    animalTypes : animalTypes
  };

} ]);