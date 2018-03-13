angular.module('starter.controllers', [])

.controller('homeCtrl', function($scope, $stateParams, $state) {
  $scope.gotoMap = function(){
    //alert();
    $state.go('app.map');
  }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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

.controller('PlaylistsCtrl', function($scope, $stateParams, $state) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  $scope.gotoMap = function(){
    //alert();
    $state.go('app.map');
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('w3wCtrl', function($scope, $state, $cordovaGeolocation, $http,$ionicPopup) {
  var w3w;
  var title1;
  var options =  {
    key: 'O26MD2FN'
  };
  w3w = new W3W.Geocoder(options);
  var params = {
    coords: [51.521251, -0.203586]
     //addr: 'dunes.inherit.riper'
  };

  var str = 'https://api.what3words.com/v2/reverse?coords='+params.coords+'&display=full&format=json&key=O26MD2FN';
  $http.get(str)
  .success(function(response){
    console.log(response.words);
  })
  .error(function(){
    var alertPopup = $ionicPopup.alert({
      title: 'Fild!',
      template: 'Please check your connection!'
    });
  });

  
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $http,$ionicPopup) {
  var option = {timeout: 10000, enableHighAccuracy: true};
  //$scope.title = 'title';
  var title;
  //console.log($cordovaGeolocation.getCurrentPosition(option).then(function(position){}));
  var latLng;
  var marker;
  var w3w;
  var params = {
    coords: [0, 0]
  };
  var options =  {
      key: 'O26MD2FN',
      lang: 'en'
  };
  w3w = new W3W.Geocoder(options);
  var str;
  var straddr;

  $scope.getAddr = function(){
    var alertPopup = $ionicPopup.alert({
      title: 'Address',
      template: $scope.title1
    });
  };

  function CenterControl(controlDiv, map, latlng) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginTop = '25px';
        controlUI.style.marginLeft = '150px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '10px';
        controlText.style.paddingLeft = '3px';
        controlText.style.paddingRight = '3px';
        controlText.innerHTML = '<img src="img/my-location.png" style="width:25px;">';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
          map.setCenter(latlng);
          marker.setPosition($scope.map.getCenter());
        });

      }
  
  console.log(params.coords);

  $cordovaGeolocation.getCurrentPosition(option).then(function(position){

    latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    //console.log(position.coords.latitude+' , '+position.coords.longitude);
    var mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      draggable: true,
      zoom: 15,
      // styles: [
      //       {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      //       {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      //       {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      //       {
      //         featureType: 'administrative.locality',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#d59563'}]
      //       },
      //       {
      //         featureType: 'poi',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#d59563'}]
      //       },
      //       {
      //         featureType: 'poi.park',
      //         elementType: 'geometry',
      //         stylers: [{color: '#263c3f'}]
      //       },
      //       {
      //         featureType: 'poi.park',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#6b9a76'}]
      //       },
      //       {
      //         featureType: 'road',
      //         elementType: 'geometry',
      //         stylers: [{color: '#38414e'}]
      //       },
      //       {
      //         featureType: 'road',
      //         elementType: 'geometry.stroke',
      //         stylers: [{color: '#212a37'}]
      //       },
      //       {
      //         featureType: 'road',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#9ca5b3'}]
      //       },
      //       {
      //         featureType: 'road.highway',
      //         elementType: 'geometry',
      //         stylers: [{color: '#746855'}]
      //       },
      //       {
      //         featureType: 'road.highway',
      //         elementType: 'geometry.stroke',
      //         stylers: [{color: '#1f2835'}]
      //       },
      //       {
      //         featureType: 'road.highway',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#f3d19c'}]
      //       },
      //       {
      //         featureType: 'transit',
      //         elementType: 'geometry',
      //         stylers: [{color: '#2f3948'}]
      //       },
      //       {
      //         featureType: 'transit.station',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#d59563'}]
      //       },
      //       {
      //         featureType: 'water',
      //         elementType: 'geometry',
      //         stylers: [{color: '#17263c'}]
      //       },
      //       {
      //         featureType: 'water',
      //         elementType: 'labels.text.fill',
      //         stylers: [{color: '#515c6d'}]
      //       },
      //       {
      //         featureType: 'water',
      //         elementType: 'labels.text.stroke',
      //         stylers: [{color: '#17263c'}]
      //       }
      //     ],
      streetViewControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      scaleControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    

    // $('<div/>').addClass('centerMarker').appendTo($scope.map.getDiv())
    var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
    $scope.map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));

    google.maps.event.addListener(searchBox, 'places_changed', function() {
      searchBox.set('map', null);
      var places = searchBox.getPlaces();
      var bounds = new google.maps.LatLngBounds();
      //console.log(bounds);

      var i, place;
      for (i = 0; place = places[i]; i++) {
         (function(place) {
          var icon = {
              url: 'img/map-marker.png', // url
              scaledSize: new google.maps.Size(50, 50)
              
          };
           marker = new google.maps.Marker({
             position: place.geometry.location,
             icon: icon
           });
           marker.bindTo('map', searchBox, 'map');
           google.maps.event.addListener(marker, 'map_changed', function() {
             if (!this.getMap()) {
               this.unbindAll();
             }
           });
           bounds.extend(place.geometry.location);

           var latitude = place.geometry.location.lat();
           var longitude = place.geometry.location.lng();

           str = 'https://api.what3words.com/v2/reverse?coords='+latitude+','+longitude+'&display=full&format=json&key=O26MD2FN';
            $http.get(str)
            .success(function(response){
                console.log(response.words);
                $scope.title = response.words;
            })
            .error(function(){
              var alertPopup = $ionicPopup.alert({
                title: 'Fild!',
                template: 'Please check your connection!'
              });
            });

            straddr = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
            //console.log(straddr);
            $http.get(straddr)
            .success(function(response){
                console.log(response.results[0].formatted_address);
                $scope.title1 = response.results[0].formatted_address;
            })
            .error(function(){
              var alertPopup = $ionicPopup.alert({
                title: 'Fild!',
                template: 'Please check your connection!'
              });
            });
         }(place));
      }

      $scope.map.fitBounds(bounds);
      searchBox.set('map', $scope.map);
      $scope.map.setZoom(Math.min($scope.map.getZoom(),12));
    });
    //      searchBox.set('map', null);
    latLng = $scope.map.getCenter();

    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, $scope.map, latLng);

    centerControlDiv.index = 1000;
    $scope.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);


    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      var latitude = latLng.lat();
      var longitude = latLng.lng();
      $scope.title = latitude+' , '+longitude;

      params = {
          coord: [latitude, longitude]
             //addr: 'dunes.inherit.riper'
      };

      str = 'https://api.what3words.com/v2/reverse?coords='+latitude+','+longitude+'&display=full&format=json&key=O26MD2FN';
      $http.get(str)
      .success(function(response){
          console.log(response.words);
          $scope.title = response.words;
      })
      .error(function(){
        var alertPopup = $ionicPopup.alert({
          title: 'Fild!',
          template: 'Please check your connection!'
        });
      });

      straddr = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
      //console.log(straddr);
      $http.get(straddr)
      .success(function(response){
          console.log(response.results[0].formatted_address);
          $scope.title1 = response.results[0].formatted_address;
      })
      .error(function(){
        var alertPopup = $ionicPopup.alert({
          title: 'Fild!',
          template: 'Please check your connection!'
        });
      });



      //w3w.reverse(params, callback);
      var icon = {
          url: 'img/map-marker.png', // url
          scaledSize: new google.maps.Size(50, 50)
          // scaled size
          // origin: new google.maps.Point(0,0), // origin
          // anchor: new google.maps.Point(0, 0) // anchor
      };
      marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        icon: icon
      });
     
      var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });
     
   
    });
    google.maps.event.addListener($scope.map, 'click', function (event) {
          //infoWindow.open($scope.map, marker);
          //console.log(event.latLng.lat());
          var latitude = event.latLng.lat();
          var longitude = event.latLng.lng();
          //console.log( latitude + ', ' + longitude );
          //alert( latitude + ', ' + longitude );

          $scope.map.setCenter(new google.maps.LatLng(latitude, longitude));
          marker.setPosition($scope.map.getCenter());
          params = {
            coords: [latitude, longitude]
             //addr: 'dunes.inherit.riper'
          };

          str = 'https://api.what3words.com/v2/reverse?coords='+params.coords+'&display=full&format=json&key=O26MD2FN';
          $http.get(str)
          .success(function(response){
              console.log(response.words);
              $scope.title = response.words;
          })
          .error(function(){
            var alertPopup = $ionicPopup.alert({
              title: 'Fild!',
              template: 'Please check your connection!'
            });
          });

          straddr = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+params.coords+'&sensor=true';
          $http.get(straddr)
          .success(function(response){
            console.log(response.results[0].formatted_address);
            $scope.title1 = response.results[0].formatted_address;
          })
          .error(function(){
            var alertPopup = $ionicPopup.alert({
              title: 'Fild!',
              template: 'Please check your connection!'
            });
          });

         // w3w.reverse(params, callback);
    });

    google.maps.event.addListener($scope.map, 'drag', function (event) {
          //infoWindow.open($scope.map, marker);
          //console.log(event.latLng.lat());
          // var latitude = event.latLng.lat();
          // var longitude = event.latLng.lng();
          // console.log( latitude + ', ' + longitude);
          //alert( latitude + ', ' + longitude );

          //$scope.map.setCenter(new google.maps.LatLng(latitude, longitude));
          marker.setPosition($scope.map.getCenter());
          //console.log($scope.map.getCenter().lat());
          var latitude = $scope.map.getCenter().lat();
          var longitude = $scope.map.getCenter().lng();
          
          params = {
            coords: [latitude, longitude]
             //addr: 'dunes.inherit.riper'
          };

          str = 'https://api.what3words.com/v2/reverse?coords='+params.coords+'&display=full&format=json&key=O26MD2FN';
          $http.get(str)
          .success(function(response){
              console.log(response.words);
              $scope.title = response.words;
          })
          .error(function(){
            var alertPopup = $ionicPopup.alert({
              title: 'Fild!',
              template: 'Please check your connection!'
            });
          });

          straddr = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+params.coords+'&sensor=true';
          $http.get(straddr)
          .success(function(response){
            console.log(response.results[0].formatted_address);
            $scope.title1 = response.results[0].formatted_address;
          })
          .error(function(){
            var alertPopup = $ionicPopup.alert({
              title: 'Fild!',
              template: 'Please check your connection!'
            });
          });

          //w3w.reverse(params, callback);
    });

  }, function(error){
    console.log(error);
  });
});