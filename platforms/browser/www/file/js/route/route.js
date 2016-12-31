angular.module('myapp')
.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'page/home/home.html',
        controller: 'homeController',
        activetab: 'home'
    })
    .when('/search', {
        templateUrl: 'page/search/search.html',
        controller: 'searchController',
        activetab: 'search'
    })
    .when('/about', {
        templateUrl: 'page/about/about.html',
        controller: 'aboutController',
        activetab: 'about'
    })
    .when('/members/login', {
        templateUrl: 'page/members/login.html',
        controller: 'loginController',
        activetab: 'member-login'
    })
    .when('/members/register', {
        templateUrl: 'page/members/register.html',
        controller: 'registerController',
        activetab: 'member-register'
    })
    .when('/members/panel', {
        templateUrl: 'page/members/panel.html',
        controller: 'panelController',
        activetab: 'member-panel'
    })
    .when('/contact', {
        templateUrl: 'page/contact/contact.html',
        controller: 'contactController',
        activetab: 'contact'
    })
    .when('/about', {
        templateUrl: 'page/about/about.html',
        controller: 'aboutController',
        activetab: 'about'
    })
    .when('/msg', {
        templateUrl: 'page/msg/msg.html',
        controller: 'msgController',
        activetab: 'msg'
    })
    
    //$locationProvider.html5Mode(true);
}])

/*
.run(function($rootScope, $window){
    $rootScope.$on("$routeChangeStart", function(event, next, current){
        if((next.templateUrl === "pages/select/index.html") || 
           (next.templateUrl === "pages/login/index.html")){
            if(localStorage.getItem('user_id')){
                
                $window.location.assign("#/wall");
                $window.location.reload();
                // $window.path("/wall");
            }
        }else if((next.templateUrl === 'pages/register/register_one.html') || 
           (next.templateUrl === 'pages/register/register_two.html') ||
           (next.templateUrl === 'pages/register/register_three.html')){
           if(localStorage.getItem('user_id')){
                
                $window.location.assign("#/wall");
                $window.location.reload();
                // $window.path("/wall");
            }
        }else{
            if(!localStorage.getItem('user_id')){
                if((next.templateUrl === 'pages/forget_pass/index.html')){
                    $window.location.assign("#/forget_pass");
                }else{
                    $window.location.assign("#/select");
                    $window.location.reload();
                }
               
                // $window.path("/wall");
            }
        }
    });
});
*/