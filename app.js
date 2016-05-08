(function(){

var app = angular.module('election', ['firebase', 'ngRoute', 'xeditable']);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'pages/election.html',
      controller: 'electionController'
    })
    .when('/results', {
      templateUrl: 'pages/results.html',
      controller: 'resultsController'
    })
    .when('/settings', {
      templateUrl: 'pages/settings.html',
      controller: 'settingsController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.run(function(editableOptions){
  editableOptions.theme = 'bs3';
});

app.controller('mainController', function($scope, $firebaseObject) {
  $scope.year = new Date().getFullYear();
  $scope.candidates = {};
  var ref = new Firebase('https://school-election.firebaseio.com/candidates'),
      syncObject = $firebaseObject(ref);
  syncObject.$bindTo($scope, 'candidates');
});


app.controller('electionController', function($scope) {
  function addVote(candidate) {
    candidate.votes = candidate.votes + 1;
    alert(candidate._id + candidate.name + candidate.votes);
  }

  $scope.addVote = addVote;
});


app.controller('resultsController', function($scope){

  // get all the candidates and display them
  // get the length of the respective arrays and display them.
});

app.controller('settingsController', function($scope) {

  $scope.newCandidate = {};
  $scope.newCandidate.votes = 0;
  $scope.createForm= false;
  var randomID  = Math.random().toString(20).slice(2);
  function addCandidate(newCandidate) {
    $scope.candidates.push({randomID: $scope.newCandidate});
    //push to the object

    $scope.newCandidate.name  = '';
  }

  function removeCandidate(candidate) {
    $scope.candidates = $scope.candidates.filter(function(c) {
      return c._id !== candidate._id;
    });
  }
  function showCreateForm() {
    $scope.createForm = true;
  }
  $scope.showCreateForm = showCreateForm;
  $scope.removeCandidate = removeCandidate;
  $scope.addCandidate = addCandidate;

});


app.directive('headerBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'header.html'
  };
});


})();
