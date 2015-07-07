auroraApp.controller('AboutCtrl', function($scope, $controller) {

  $scope.aboutmessage = 'Aurora is designed to present the user with up to date data of food recalls by state. It also includes features to search for and organize food recalls as well as populating a map based on the number of food recalls per state.'
  $scope.aboutus = 'Myth Software was founded by a pair of software developers voraciously passionate about technology the kind of people who were building computers from scratch back when other kids their age were still learning multiplication tables. Fortunately, their social skills and business acumen developed just as rapidly, creating the perfect storm to address the most difficult technology initiatives for clients in government and business. Because our certified, women-owned small business is owned and operated by skilled software engineers, we understand what technical specialists need to thrive and are able to attract and retain the best talent as a result experts who thrive in the face of technical problem-solving. Experts on a mission to stretch their capabilities every day. From cyber security and secure software development to enterprise architecture and mobile development, Myth Software has the services and contract vehicles and Washington, DC location to help you achieve your mission on time and within budget. So bring us your toughest challenges so we can put our passion and 20 years of experience to work for you.'

  $().ready(function(){
    $('[rel="tooltip"]').tooltip();

  });

  $scope.rotateCard = function (btn) {
    var $card = $(btn).closest('.card-container');
    console.log($card);
    if($card.hasClass('hover')){
      $card.removeClass('hover');
    } else {
      $card.addClass('hover');
    }
  };
  });
