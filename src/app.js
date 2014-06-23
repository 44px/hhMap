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



app.controller('MapCtrl', function($scope, Vacancies) {

	$scope.foundVacancies = [];

	// Search vacancies by query
	$scope.search = function(query) {
		// Get vacancies
		var foundVacancies = Vacancies.get({
			area: 2
		});

		foundVacancies.$promise.then(function(data) {
			console.group('Latest in SPB by query ', query);
			data.items.forEach(function(elem) {
				//console.log(elem.address);
				if (elem.address === null) {
					//console.log(elem.id, '- no address -');
				} else if (elem.address.lat && elem.address.lng) {
					//console.log(elem.id, '- point: ', elem.address.lat, elem.address.lng);
					$scope.foundVacancies.push({
						geometry: {
							type: 'Point',
							coordinates: [elem.address.lng, elem.address.lat]
						},
						properties: {
							balloonContentHeader: elem.name,
							balloonContentBody: elem.address.street + ', ' + elem.address.building,
							hintContent: elem.name
						}
					});
				} else {
					//console.log(elem.id, '- no coodrinates, use raw: ', elem.address.raw);
					//TODO: try to geocode with yandex?
				}
			});
			console.groupEnd();
		});
	};

	$scope.search();
});