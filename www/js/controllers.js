angular.module('starter.controllers', [])

.value('student_key', '')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicTabsDelegate) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('testimonialCtrl', function($scope, $stateParams, $http) {
  $http.get('http://infosys.esy.es/ion/json_testimonials.php')
  .success(function(response){
    $scope.testimonials = response.testimonial_data;
  });
})

.controller('composeCtrl', function($scope, $stateParams, $http) {
  $http.get('http://infosys.esy.es/ion/json_student_list.php')
  .success(function(response){
    $scope.emails = response.student_list_data;
  });
})

.controller('inboxCtrl', function($scope, $stateParams, $http) {
  $http.get('http://infosys.esy.es/ion/json_inbox.php')
  .success(function(response){
    $scope.inboxes = response.convo_data;
  });
})

.controller('outboxCtrl', function($scope, $stateParams, $http) {
  $http.get('http://infosys.esy.es/ion/json_outbox.php')
  .success(function(response){
    $scope.outboxes = response.convo_data;
  });
})


.controller('eventsCtrl', function($scope, $stateParams, $http) {
  $http.get('http://infosys.esy.es/ion/json_events.php')
  .success(function(response){
    $scope.events = response.event_data;
  });
})

.controller('signInCtrl', function($scope, $stateParams, $http) {
  $scope.txtUsername = '';
  $scope.txtPassword = '';

  $scope.signIn = function(){
    $http.post('http://infosys.esy.es/ion/json_login.php',
      {'username' : this.txtUsername, 'password': this.txtPassword})
    .success(function(data){
     // console.log(data);
      if(data[0]['logged'] == '1')
      {
        //console.log('logged in');
        this.student_key = 'student key here';
        console.log(student_key);
        window.location = '#/app/dashboard';
      }else{
        //console.log('unable to login');
        $scope.unable = true;

      }
      //console.log(data[0]['logged']);
    })
  }
}) //end controller

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
