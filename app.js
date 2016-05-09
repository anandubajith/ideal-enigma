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
  $scope.frozen = true;
  $scope.candidates = {};
  var ref = new Firebase('https://school-election.firebaseio.com/candidates'),
      syncObject = $firebaseObject(ref);
  syncObject.$bindTo($scope, 'candidates');
});


app.controller('electionController', function($scope, $firebaseArray) {

  var ref = new Firebase('https://school-election.firebaseio.com/votes');
  var list = $firebaseArray(ref);

  function addVote(id) {
    list.$add(id).then(function(ref) {
      var id = ref.key();
      console.log("added record with id " + id);
      list.$indexFor(id); // returns location in the array
    });

  }

  $scope.addVote = addVote;
});


app.controller('resultsController', function($scope, $firebaseArray){
  var ref = new Firebase('https://school-election.firebaseio.com/votes'),
      list = $firebaseArray(ref),
      results = {};

  $scope.votes = {};

  list.$loaded(function(x) {
    result = x.map(function(y){return y['$value'];});
    console.log(result);
    $scope.votes = result.reduce(function(count, val){
      count[val] = (count[val] || 0 ) + 1;
      return count;
    }, {});

  });

});

app.controller('settingsController', function($scope) {

  $scope.newCandidate = {};
  $scope.newCandidate.votes = 0;
  $scope.createForm= false;
  var randomID  = Math.random().toString(20).slice(2);
  function addCandidate(newCandidate) {
    $scope.candidates[randomID] = $scope.newCandidate;
    $scope.createForm = false;
    randomID = Math.random().toString(20).slice(2);
  }

  function removeCandidate(id) {
    delete $scope.candidates[id];
  }
  function toggleCreateForm() {
    $scope.createForm = $scope.createForm ? false : true;
  }
  $scope.toggleCreateForm = toggleCreateForm;
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
