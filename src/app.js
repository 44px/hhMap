'use strict';

var app = angular.module('hhMap', [
	'ngResource',
	'yaMap'
]);

app.constant('API_URL', 'https://api.hh.ru');

app.factory('Vacancies', function(API_URL, $resource) {
	return $resource(API_URL + '/vacancies/:id', {}, {
		'query': {
			method: 'GET',
			isArray: false
		}
	});
});



app.controller('MapCtrl', function(Vacancies) {

	// Get new
	var vacancies = Vacancies.query();
	vacancies.$promise.then(function(data) {
		console.group('Latest @ hh.ru:');
		data.items.forEach(function(elem) {
			console.log(elem.id, elem.name);
		});
		console.groupEnd();
	});


	// Get one
	var vacancy = Vacancies.get({id:10933376});
	vacancy.$promise.then(function(data) {
		console.log('Specific vacancy:');
		console.log(data.id, data.name);
	});


	// Search
	var foundVacancies = Vacancies.get({
		area: 2
	});

	foundVacancies.$promise.then(function(data) {
		console.group('Latest in SPB:');
		data.items.forEach(function(elem) {
			console.log(elem.id, elem.name);
		});
		console.groupEnd();
	});
});