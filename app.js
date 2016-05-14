(function() {

var app = angular.module('votingMachine', ['firebase', 'ngAnimate']);

app.run(function($rootScope){
	$rootScope.loggedIn = ( localStorage["firebase:session::school-election"] ) || false; // improve
});

app.controller('mainController' , function($scope, $timeout, Loader, $firebaseObject, $firebaseArray) {
  $scope.candidates = {};
  $scope.modal = false;

  var ref = new Firebase('https://school-election.firebaseio.com'),
      candidatesObject = $firebaseObject(ref.child('candidates')),
      votesArray = $firebaseArray(ref.child('votes'));

  var audio = new Audio('beep.mp3');
  candidatesObject.$bindTo($scope, 'candidates');



  function showConfirm(id) {
	$scope.currentId = id;
	Loader.show(true);
	$scope.modal = true;	
  }

  function closeModal() {
    $scope.modal = false;
    Loader.show(false);
  }

  function addVote(id) {
    votesArray.$add(id).then(function(vote) {
      Loader.show(true);
	  $scope.modal = false;

      $timeout(function(){
	    $scope.currentId = 0;
        Loader.show(false);
      }, 5000)
  	
      audio.play();
    });
  }


  $scope.addVote = addVote;
  $scope.closeModal = closeModal;
  $scope.showConfirm = showConfirm;
 
});


app.controller("AuthCtrl", ["$scope","$rootScope", "$firebaseAuth",
  function($scope, $rootScope, $firebaseAuth) {

    var ref = new Firebase('https://school-election.firebaseio.com');
    auth = $firebaseAuth(ref);
    $scope.login = function() {
      $scope.authData = null;
      $scope.error = null;
      auth.$authWithPassword({email: $scope.email, password: $scope.password})
		.then(function(authData){
			$rootScope.loggedIn = true;
		}).catch(function(err) {
			console.log(err);
		});
    };
  }
]);

app.directive('loader', [function(){
    return {
      'restrict' : 'A',
      'controller' : ['$scope', 'Loader', function($scope, Loader){
        $scope.Loader = Loader;
      }]
    }
}]);

app.factory('Loader', [function(){
    var instance = {}
    
    instance.show = function(on){
      instance.visible = on;
    }
    
    return instance;
}]);




})();
