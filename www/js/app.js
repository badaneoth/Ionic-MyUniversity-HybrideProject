// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var url="http://192.168.1.43/universite/";
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform,$ionicPopup) {
  $ionicPlatform.ready(function() {
    // Check for network connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
              title: 'No Internet Connection',
              content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
            })
            .then(function(result) {
              if(!result) {
                ionic.Platform.exitApp();
              }
            });
      }
    }
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function ($stateProvider,$urlRouterProvider) {

  $stateProvider.state("etablissements",{
    url:"/etablissements",
    templateUrl:"templates/Etablissements.html",
    controller:"EtablissementCtrl"
  });
  $stateProvider.state("formations",{
    url:"/formations/:idEtablissement",
    templateUrl:"templates/Formations.html",
    controller:"FormationsCtrl"
  });

  $stateProvider.state("universite",{
    url:"/universite",
    templateUrl:"templates/Universite.html",
    controller:"UniversiteCtrl"
  });
  $stateProvider.state("geo",{
    url:"/geo",
    templateUrl:"templates/Geolocalisation.html",
    controller:"GeolocalisationCtrl"
  });
  $urlRouterProvider.otherwise("universite")

});
app.controller("UniversiteCtrl",function($http,$scope){
$scope.universite={
  nomUniversite :"Université artois Lens",
  president:"Pasquale Mammone",
  site:"www.univ-artois.fr",
  email:"saoip-arras@univ-artois.fr",
  tel:"03 21 60 37 00",
  fax:"03 21 60 37 37",
  adresse:"9, rue du Temple - BP 10665 - 62030 ARRAS CEDEX - France"
};

});

app.controller("EtablissementCtrl",function($http,$scope,$state){
$scope.etablissements=[];
  $scope.url=url;
  $http.get(url+"etablissements_uh2c.php")
      .success(function (data) {
        $scope.etablissements=data;
      })
      .error(function (err) {
        console.log(err);
      });
  $scope.chargerFormations=function(idEt){
  $state.go("formations",{
  idEtablissement:idEt
  });
  }


});
app.controller("FormationsCtrl",function($http,$scope,$stateParams){
  $scope.idEtablissement=$stateParams.idEtablissement;
  $scope.formations=[];
  $http.get("http://localhost/universite/formations.php?idEtablissement="+$scope.idEtablissement)
      .success(function (data) {
        $scope.formations=data;
      })
      .error(function (err) {
        console.log(err);
      });

});
app.controller("GeolocalisationCtrl",function($http,$scope){


});