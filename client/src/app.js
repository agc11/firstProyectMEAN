import angular from 'angular'
angular.module('olympics', [])
.controller('sportsController', function($http) {
  const that = this;
  $http.get('/sports').then((response => {
    that.sports = response.data
  }))
});
