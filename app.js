(function(){

var CANDIDATES =  [   {
			    "_id": "572dd765f8391243e0f0df71",
			    "name": "Prince Frye",
			    "image": "http://loremflickr.com/150/200?random=0",
			    "votes": 0
			  },
			  {
			    "_id": "572dd765b52cb803c4eeeefb",
			    "name": "Roberson Small",
			    "image": "http://loremflickr.com/150/200?random=1",
			    "votes": 0
			  },
			  {
			    "_id": "572dd7650838737071c13012",
			    "name": "Fischer Le",
			    "image": "http://loremflickr.com/150/200?random=2",
			    "votes": 0
			  },
			  {
			    "_id": "572dd765509a123e338145a8",
			    "name": "Sims Griffin",
			    "image": "http://loremflickr.com/150/200?random=3",
			    "votes": 0
			  },
			  {
			    "_id": "572dd765fdbeda127387de16",
			    "name": "Haley Levy",
			    "image": "http://loremflickr.com/150/200?random=4",
			    "votes": 0
			  }
		     ];

var app = angular.module('election', ['ngRoute', 'xeditable']);

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

app.controller('mainController', function($scope) {
  $scope.year = new Date().getFullYear();
  $scope.candidates = CANDIDATES;
});


app.controller('electionController', function($scope) {
  // get all the candidates and display them
  // when clicked add an element to the respective array


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
  function addCandidate(newCandidate) {
    candidates.push($scope.newCandidate);
    $scope.candidate = ''
  }

  function removeCandidate(candidate) {
    $scope.candidates = $scope.candidates.filter(function(c) {
      return c._id !== candidate._id;
    });
  }

  $scope.removeCandidate = removeCandidate;
  $scope.addCandidate = addCandidate;
  // list all the candidates
  // should be able to edit them
  // should be able to add new candidates

});


app.directive('headerBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'header.html'
  };
});


})();
