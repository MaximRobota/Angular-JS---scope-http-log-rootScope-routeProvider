var spa = angular.module('spa', ['ngRoute', 'ngResource', 'ui.bootstrap']);
spa.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/home.html',
      controller: 'indexCtrl'
    })
    .when('/main', {
      templateUrl: '/main.html',
      controller: 'mainController'
    })
  $routeProvider.otherwise('/');
});
spa.controller('indexCtrl', ['$scope', '$http', '$log', '$rootScope', function ($scope, $http, $log, $rootScope) {
  $scope.data = {};
  $http.get('/json/tasks.json').then(function (response) {
      $scope.table = response.data;
      $scope.parseHeader();
  }, function () {
      $log.error('Error getting data.');
  });
  $scope.parseHeader = function () {
    var keys = [], items = [], headerTable =[];
    $scope.table.forEach(function (item) {
      Object.keys(item).forEach(function (key) {
        if (keys.indexOf(key) === -1) {
          keys.push(key);
        }
          headerTable[0] = keys[1];
          headerTable[1] = keys[13]; 
          headerTable[2] = keys[8];
          headerTable[3] = keys[7];
          headerTable[4] = keys[3];
      });
    });
    $scope.table.headerKeys = headerTable;
    $scope.table.forEach(function (item) {
      if (item.obj_status === "active") {
        items.push(item);
      }
    });
    $scope.setStyle = function (is_high_priority) {
      return is_high_priority ? "color:red; font-weight: bold" : "color:black";
    }
    $scope.table.itemsActive = items;
  };
  $scope.transitionMain = function () {
    $rootScope.task = this.tr;
  }
}]);
spa.controller('mainController', ['$scope', '$http', '$log', '$rootScope', function ($scope, $http, $log, $rootScope) {
  var refresh = function(){
    $http.get('/json/tasks.json').then(function (response) {
        $scope.table = response.data;
    }, function () {
        $log.error('Error getting data.');
    });
  }
  if($rootScope.task === undefined){
    $scope.name = "Перейдите в Index";
    $scope.goButt = false;
  }else{
    $scope.goButt = true;
    $scope.name = $rootScope.task.name;
    $scope.description = $rootScope.task.description;
    $scope.edit = function(){
      $rootScope.task.name =  $scope.name;
      $http.put('/json/tasks.json', $rootScope.task).success(function(response, status, headers, config){
        $rootScope.task = response;
        })
      .error(function(response, status, headers, config){
        $scope.error_message = response.error_message;
      });
    }
  }    
}]);