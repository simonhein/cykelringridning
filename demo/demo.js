// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('MobileAngularUiExamples', [
  'ngRoute',
  'mobile-angular-ui',
    'ngSanitize',
    'textAngular',
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

app.controller('SpikeCtrl', ['$scope', function($scope,studentHandler ){
    studentHandler.getUser(user, function (response) {
        $scope = response.data;
    });






}]);


app.factory('studentHandler',function($http){

    var arr = ['Simon','Hans','Mads','Ronni'];

    return{
        getUser: function(user, callback){

            arr.pop('Simon');

            callback('Simon');
        },

        postUser: function(callback){

        }
    }

});



app.factory('instagram', ['$http',
        function($http) {
            return {
                fetchPopular: function(callback) {
                    // v1/tags/nofilter/media/recent
                    // v1/media/popular
                    // tags/ringridning/
                    var endPoint = "https://api.instagram.com/v1/tags/ringridning/media/recent?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";

                    $http.jsonp(endPoint).success(function(response) {
                        callback(response.data);
                    });
                }
            }
        }
    ]);
app.controller("Example", function($scope, $interval, instagram) {
      $scope.pics = [];
      $scope.have = [];
      $scope.orderBy = "-likes.count";
      $scope.getMore = function() {

        instagram.fetchPopular(function(data) {
            for(var i=0; i<data.length; i++) {
              if (typeof $scope.have[data[i].id]==="undefined") {
                $scope.pics.push(data[i]) ;
                $scope.have[data[i].id] = "1";
              }
            }
        });
      };
      $scope.getMore();

        $scope.tags = [
            'Bootstrap', 'AngularJS', 'Instagram', 'Factory'
        ]
    });
app.controller('SignupCtrl', ['$scope','siteFetcher',function ($scope,siteFetcher) {
    $scope.enableVerification = false;
    $scope.submit = function(){

        var email = $scope.email;
        var first_name = $scope.first_name;
        var last_name = $scope.last_name;
        var birthday = $scope.birthday;

        if(email!= null && first_name!= null && last_name!= null && birthday!= null){

            var user = {
                "email":email,
                "first_name":first_name,
                "last_name":last_name,
                "birthday":birthday,
            };

            siteFetcher.signUp(email,first_name,last_name,birthday)
                .then(
                    function( response ) {
                        $scope.error_msg = "Succes!"
                        $scope.enableVerification = true;

                        $scope.email = null;
                        $scope.first_name = null;
                        $scope.last_name = null;
                        $scope.birthday = null;
                    }
                );
        }else{
            $scope.error_msg = "Forkerte indtastet data"
        }
    }
}]);
app.filter('fromTo', function() {
        return function(input, from, total, lessThan) {
            from = parseInt(from);
            total = parseInt(total);
            for (var i = from; i < from + total && i < lessThan; i++) {
                input.push(i);
            }
            return input;

        }
    });
app.run(function($transform) {
  window.$transform = $transform;
});
app.config(function($routeProvider) {
    $routeProvider.when('/',              {templateUrl: 'home.html', reloadOnSearch: false});
    $routeProvider.when('/admin',        {templateUrl: 'admin.html', controller:'AdminCtrl', reloadOnSearch: false});
    $routeProvider.when('/photos',        {templateUrl: 'photos.html', reloadOnSearch: false});
    $routeProvider.when('/record_result/:groudId/:lane',     {templateUrl: 'record_result.html', controller: 'RecordResultCtrl', reloadOnSearch: false});
    $routeProvider.when('/participants', {templateUrl:'views/participants.html', controller:'ParticipantsCtrl', reloadOnSearch: false});
    $routeProvider.when('/participant/:id', {templateUrl:'views/participant.html', controller:'ParticipantCtrl', reloadOnSearch: false});
    $routeProvider.when('/checkin',         {templateUrl:'checkin.html', reloadOnSearch: false});
    $routeProvider.when('/groups',      {templateUrl: 'views/groups.html', controller:'GroupCtrl', reloadOnSearch: false});
    $routeProvider.when('/signup',      {templateUrl: 'signup.html', controller:'SignupCtrl', reloadOnSearch: false});
    $routeProvider.when('/check_in',      {templateUrl: 'check_in.html',  reloadOnSearch: false});
    $routeProvider.when('/laneSelectView/:groupId', {templateUrl: 'laneSelectView.html', controller: 'LaneSelectCtrl', reloadOnSearch: false});
    $routeProvider.when('/results/:id', {templateUrl: 'views/results.html', controller: 'ResultListCtrl', reloadOnSearch: false});
    $routeProvider.when('/result/:id', {templateUrl: 'views/result.html', controller: 'ResultCtrl', reloadOnSearch: false});
    $routeProvider.when('/login/:token', {templateUrl: 'views/login.html', controller: 'LoginCtrl', reloadOnSearch: false});
    $routeProvider.when('/spike', {templateUrl: 'views/spike.html', controller: 'SpikeCtrl', reloadOnSearch: false});




});


app.controller('LoginCtrl', ['$scope','$routeParams', function($scope,$routeParams){
    var token = $routeParams.token;
    alert($scope.isLoggedIn);
    $scope.isLoggedIn =true;
    $scope.event.event_name = "KIIIIIIIIIIG";
    if(token =! null){
        $scope.token = token;
    }




}]);


app.controller('ConfigParticipantsCtrl', ['$scope', function($scope){

}]);
app.controller('ParticipantsCtrl', ['$scope', function($scope){

}]);


app.controller('ParticipantCtrl', ['$scope','$routeParams','siteFetcher', function($scope,$routeParams,siteFetcher){
    var id = $routeParams.id;
    siteFetcher.getParticipant(id).then(
        function(response) {
            $scope.participant = response;
            $scope.results = $scope.participant.results;

            for(i=0;i<$scope.results.length-1;i++){
                console.log($scope.results[i]);
            }
        }
    );


    $scope.updateParticipant = function(participant) {
        siteFetcher.updateParticipant(id, $scope.participant).then(
            function(response) {
                var s  = response;
                console.log(s);

            }
        )
    }

}]);

app.controller('ResultListCtrl', ['$scope','$interval', '$routeParams','siteFetcher', function($scope,$interval,$routeParams,siteFetcher){
    var id = $routeParams.id;
    loadRemoteData();
    $interval(function () {

        //$scope.loadSiteData();
        loadRemoteData();
    }, 10000);



    // I load the remote data from the server.
    function loadRemoteData() {
        // The friendService returns a promise.
        siteFetcher.getGroup(id)
            .then(
                function( response ) {
                    $scope.group = response;
                }
            );
    }


}]);
app.controller('AdminCtrl', ['$scope','siteFetcher', function($scope,siteFetcher){
    $scope.undoLane = {};

    $scope.removeGroup = function(){
        var min_groups = 1;

        if(min_groups < $scope.event.groups.length){
            $scope.event.groups.pop();
        }
        if(min_groups == $scope.event.groups.length){
            $scope.removeGroupDisable = true;
        }
    };

    $scope.addShirt = function(){

        var newShirt = {
            color:'',
            number:null
        }
        $scope.event.shirts.push(newShirt);
        $scope.removeShirtDisableBtn = false;
    };

    $scope.removeShirt = function(){
        var min_shirts = 1;

        if(min_shirts < $scope.event.shirts.length){
            $scope.event.shirts.pop();
        }
        if(min_shirts == $scope.event.shirts.length){
            $scope.removeShirtDisableBtn = true;
        }

    };




    $scope.addGroup = function(){

            var newGroup = {
                group_name: "",
                group_run_alone:false,
                lanes:[
                    {
                        lane_start_number:null,
                        id:1,
                        lane_name:"",
                        lane_writer:""
                    }
                ]
            };
            $scope.event.groups.push(newGroup);


            $scope.removeGroupDisable = false;
    };



    $scope.addLane = function(group){
        var index = $scope.event.groups.indexOf(group);




        if($scope.event.max_lanes > $scope.event.groups[index].lanes.length) {

            $scope.event.groups[index].lanes.push(
                {
                    lane_start_number: 1,
                    id: 1,
                    lane_name: "Blå",
                    lane_writer: "dinemail@gmail.com"
                }
            );
        }

        var lane_number = $scope.event.groups[index].lanes.length;
        var max_lanes = $scope.event.max_lanes;

        if(max_lanes == lane_number){
            $scope.event.groups[index].addLaneDisable = true;
        }
        else{
            $scope.event.groups[index].removeLaneDisable = false;
        }



    };

    $scope.removeLane = function(group){
        var min_lanes = 1;
        var index = $scope.event.groups.indexOf(group);


        if(min_lanes < $scope.event.groups[index].lanes.length){
            $scope.event.groups[index].lanes.pop();
        }


        if(min_lanes >= $scope.event.groups[index].lanes.length){
            $scope.event.groups[index].removeLaneDisable = true;
        }
        else{
            $scope.event.groups[index].addLaneDisable = false;
        }


    };




    $scope.writers = [
        {
            lane:1, email:"simonhein@gmail.com"

        }
        ,{lane:2, email:"steffenhk@gmail.com"},{lane:3,email:"mail@kamindo.com"}];
    $scope.master = {};

    $scope.update = function(user) {
        $scope.master = angular.copy(user);
    };

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();


    var writers = [
        {
            lane: 1,
            email: ''
        },
        {
            lane: 2,
            email: ''
        },
        {
            lane: 3,
            email: ''
        }
    ];

    $scope.formDataTwo = {};
    $scope.formDataTwo.writers = writers;



}]);
app.controller('RecordResultCtrl', ['$scope','$routeParams','siteFetcher', function ($scope,$routeParams,siteFetcher) {
    var groupId = $routeParams.groupId;
    var lane = $routeParams.lane;

}]);
app.controller('LaneSelectCtrl', ['$scope','$routeParams','siteFetcher', function ($scope,$routeParams,siteFetcher) {
    var groupId = $routeParams.groupId;

    var groups = $scope.event.groups;
    $scope.group = getSelectedGroup(groupId);
    $scope.lanes = getLanes($scope.group);

    function getSelectedGroup(id){
        for(i = 0; i<groups.length-1; i++){
            var group = groups[i];
            if(group.id==id){
                return group;
            }
        }
        return null;
    }

    function getLanes(group) {
        var participants = group.participants;
        var lanes = [];
        for (i = 0; i < participants.length-1; i++) {
            participant = participants[i];
            lane = participant.lane;

            if(lanes.includes(lane)){
                console.log("true");
            }
            else{
                lanes.push(lane);
                console.log("false");
            }
        }
        return lanes

    }




}]);
app.directive('score', function() {
    return {
        templateUrl: 'score.html'
    };
});
app.controller('CheckInCtrl', ['$scope','siteFetcher', function ($scope,siteFetcher) {

    $scope.showGroupsView = true;

    $scope.loadScore = function(lane) {
        $scope.laneParticipants;
        $scope.scoreEnabled = true;
        var laneParticipants = [];
        for(i = 0 ; i<$scope.selectedGroupParticipants.length-1;i++){
            var participant = $scope.selectedGroupParticipants[i];
            if(participant.lane==lane){
                laneParticipants.push(participant)
            }
        }

        $scope.laneParticipants = laneParticipants;
        console.log($scope.laneParticipants.length);
        $scope.showScoreView = true;
        $scope.showGroupsView = false;
        $scope.showCheckInView = false;

    }



    $scope.loadLanes = function(group){
        $scope.selectedGroup = group;
        $scope.showScoreView = false;
        $scope.showGroupsView = false;
        $scope.showCheckInView = true;

        $scope.selectedGroupParticipants = $scope.selectedGroup.participants
        $scope.lanes = getLanes($scope.selectedGroupParticipants);
        console.log($scope.lanes);

        var ss = $scope.lanes;
        for(i = 0;i< ss.length;i++){
            console.log($scope.lanes[i]);
        }



    };

    $scope.lanes = ['0-7', '8-11', '12-14'];
    $scope.selection = $scope.lanes[0];
}]);
app.controller('carouselCtrl', function($scope,$http) {
        this.itemCount = 0;
        this.activeItem = null;


        $scope.person_list = person_list;
        $scope.persons = $scope.person_list;


        var isFirstLoad = true;
        var isAlternate = true;
        $scope.persons = [next,current];

        $scope.person_list = person_list;

        $scope.next_person = function () {
            return $scope.person_list.shift();
        }

        var current = $scope.next_person();
        console.log(current);
        var next = $scope.next_person();
        console.log(next);


        function record_data(result){
            if(isFirstLoad){
                isFirstLoad = false;
                var current = $scope.persons.pop();
                var next = $scope.persons.pop();
                var new_person = $scope.next_person();
                $scope.persons = [new_person,next];

            }

            else{

                var current = $scope.persons.pop();
                var next = $scope.persons.pop();
                var new_person = $scope.next_person();
                $scope.persons = [new_person,next];
            }
            //
            this.activeItem = this.activeItem || 0;
            this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
        }

        var current = $scope.next_person();
        var next = $scope.next_person();
        var isFirstLoad = true;
        var isAlternate = true;
        $scope.persons = [next,current];


        this.addItem = function(){
            var newId = this.itemCount++;
            this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
            return newId;
        };

        this.next = function(){
            console.log("Scored");
            record_data(true);
        };


        this.skip = function(){
            console.log("Skip");
            record_data(null);
        };

        this.prev = function(){
            console.log("Missed");
            record_data(null);
        };
    });
app.controller('carouselCtrl1', function($scope,$http) {


        this.itemCount = 0;
        this.activeItem = null;




        this.addItem = function(){
            var newId = this.itemCount++;
            this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
            return newId;
        };

        this.next = function(){
            console.log("Scored");
            this.activeItem = this.activeItem || 0;
            this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
            console.log($scope.persons[0].first_name);

        };


        this.skip = function(){
            console.log("Skip");
            this.activeItem = this.activeItem || 0;
            this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem + 1;
        };

        this.prev = function(){
            console.log("Missed");
            this.activeItem = this.activeItem || 0;
            this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem + 1;
        };

        $scope.persons = person_list;

    });
app.controller("GroupCtrl", function( $scope, siteFetcher,$interval) {

    $scope.event;


    // I load the remote data from the server.
    function loadRemoteData() {
        // The friendService returns a promise.
        siteFetcher.getEvent("1")
            .then(
                function( response ) {
                    $scope.event = response;
                }
            );
    }
    });
app.service("siteFetcher", function( $http, $q ) {
        // Return public API.


        return({
            signUp: signUp,
            getEvent: getEvent,
            removeFriend: removeFriend,
            getParticipant:getParticipant,
            updateParticipant:updateParticipant,
            getGroup:getGroup,
        });



        // ---
        // PUBLIC METHODS.
        // ---
        // I add a friend with the given name to the remote collection.

        function signUp(email,first_name,last_name,birthday) {
            var request = $http({
                method: "post",
                url: "http://localhost:3000/participants",
                params: {
                    action: "add"
                },
                data: {
                    email:email,
                    first_name: first_name,
                    last_name: last_name,
                    birthday:birthday

                }
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function recordData(result) {
            var request = $http({
                method: "post",
                url: "http://localhost:3000/participants/1",
                params: {
                    action: "add"
                },
                data: {
                    email:email,
                    first_name: first_name,
                    last_name: last_name,
                    birthday:birthday

                }
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function updateParticipant(id,partcipant) {
            var request = $http({
                method: "put",
                url: "http://localhost:3000/participants/"+id,
                params: {
                    action: "put"
                },
                data: partcipant
            });
            return( request.then( handleSuccess, handleError ) );
        }



        function getParticipant(id) {
            var request = $http({
                method: "get",
                url: "http://localhost:3000/participants/"+id,
                params: {
                    action: "get"
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function getGroup(group_id) {
            var request = $http({
                method: "get",
                url: "http://localhost:3000/groups/"+group_id,
                params: {
                    action: "get"
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }



        function getEvent(event_id) {
            var request = $http({
                method: "get",
                url: "http://localhost:3000/events/"+event_id,
                params: {
                    action: "get"
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }
        // I remove the friend with the given ID from the remote collection.
        function removeFriend( id ) {
            var request = $http({
                method: "delete",
                url: "api/index.cfm",
                params: {
                    action: "delete"
                },
                data: {
                    id: id
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }
        // ---
        // PRIVATE METHODS.
        // ---
        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        function handleError( response ) {
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
            ) {
                return( $q.reject( "An unknown error occurred." ) );
            }
            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );
        }
        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess( response ) {
            return( response.data );
        }
    });
app.controller("AdsCtrl", function( $scope,$interval) {
    var urlPool = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'];
    var urlPath = "img/"


    $scope.url = urlPath+urlPool[0];

        $interval(function () {







    }, 10000);

});
app.directive('ads', function(){
    return {
        templateUrl: 'views/ads.html',
        restrict: 'C',
        controller: 'AdsCtrl'
    };
});
app.directive('carousel', function(){
  return {
    templateUrl: 'score.html',
    restrict: 'C',
      controller: 'carouselCtrl'
  };
});
app.directive('carouselItem', function($drag) {
    console.log("carouselItem");
    console.log($drag);
  return {
    restrict: 'C',
    require: '^carousel',
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();

      var zIndex = function(){
        var res = 0;
        if (id === carousel.activeItem){
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function(){
        return carousel.activeItem;
      }, function(){
        elem[0].style.zIndex = zIndex();
      });

      $drag.bind(elem, {
        //
        // This is an example of custom transform function
        //
        transform: function(element, transform, touch) {
          //
          // use translate both as basis for the new transform:
          //
          var t = $drag.TRANSLATE_BOTH(element, transform, touch);

          //
          // Add rotation:
          //
          var Dx    = touch.distanceX,
              t0    = touch.startTransform,
              sign  = Dx < 0 ? -1 : 1,
              angle = sign * Math.min( ( Math.abs(Dx) / 700 ) * 30 , 30 );

          t.rotateZ = angle + (Math.round(t0.rotateZ));

          return t;
        },
        move: function(drag){
          if(Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            elem.addClass('dismiss');
          } else {
            elem.removeClass('dismiss');
          }
        },
        cancel: function(){
          elem.removeClass('dismiss');
        },
        end: function(drag) {
          elem.removeClass('dismiss');

          if(drag.distanceX >= drag.rect.width / 4) {
            scope.$apply(function() {
              carousel.next();
            });
          }

          if(drag.distanceX < 0 && Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            scope.$apply(function() {
              carousel.prev();
            });
          }



          drag.reset();
        }
      });
    }
  };
});
app.controller('MainController', ['$rootScope', '$scope', '$http', '$interval','siteFetcher', function($rootScope, $scope, $http, $interval,siteFetcher){


    loadRemoteData();


    // I load the remote data from the server.
    function loadRemoteData() {
        // The friendService returns a promise.
        siteFetcher.getEvent("1")
            .then(
                function( response ) {
                    $scope.event = response;
                }
            );
    }


    $scope.isLoggedIn = true;


    // future implementations
    $scope.enhanced_mode = false;



  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });



}]);