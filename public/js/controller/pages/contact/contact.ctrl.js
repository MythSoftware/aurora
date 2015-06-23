auroraApp.controller('ContactCtrl', function($scope,$http ,$controller) {

  $scope.result="";
  $scope.sendMail = function(){
    var data = ({
      email : this.email,
      message : this.message
        });
    $http.post('/api/contactmessages', data).
      success(function(data, status, headers, config) {
        $scope.result = "Submission successful, thank you for your feedback.";
          }).
      error(function(data, status, headers, config) {
        $scope.result = "Submission unsuccessful, please try again.";
            });


    }
});
