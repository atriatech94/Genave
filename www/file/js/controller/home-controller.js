 angular.module('myapp')
 .controller('indexController', function($scope,$location,$rootScope) { 
     
     $scope.go = function(data){
         $location.path(data);
         if($scope.menu.isMenuOpened()){
             $scope.menu.toggleMenu();
         }
     };
     
     $scope.specilal = function(){
         ons.notification.alert({
                    title: 'پیام',
                    buttonLabel:"بستن " ,
                    message: 'برای در خواست تبلیغات ویژه ابتدا عضو شوید'
                }); 
     };
      $scope.logout_1 = function(){
          localStorage.removeItem('member_info');
          localStorage.removeItem('job_info');
          localStorage.removeItem('has_job');
          $rootScope.is_login = 0;
          $location.path('/');
          $scope.menu.toggleMenu();
      };

     if(localStorage.getItem('member_info') == null){
         $rootScope.is_login = 0;
     }
     else
     {
         $rootScope.is_login = 1; 
     }
    
     $scope.toggle = function() {
         $scope.menu.toggleMenu();
     };
     //var options = new Object;
     //options.buttonLabels =["Cancel2", "OK2"] ;
     $scope.conf = function(){
         ons.notification.confirm({message: 'ارسال درخواست ویژه' , buttonLabels:["لغو", "ارسال درخواست"] , title : "پیام"} );
     }
     
 })
 .controller('homeController', function($scope,$http) { 
      
        $scope.jobBack = function(){
            $scope.place = ""; 
            $scope.products = "";  
         };
 
     
      $scope.img_url = baner_pic;
      $scope.job_url = baner_thumb_pic;
      if(localStorage.getItem('jobs') != null){
        $scope.jobs = JSON.parse(localStorage.getItem('jobs'));
      }
      else
      {
        document.getElementById('loading').removeAttribute('style'); 
      }
      if(localStorage.getItem('sliders') != null){
        $scope.sliders = JSON.parse(localStorage.getItem('sliders'));
      }
      $http({
            method: 'GET',
            url: base_url+'home', 
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function successCallback(response) {
               document.getElementById('loading').setAttribute('style','display:none;'); 
               $scope.sliders = response.data.slider; 
               $scope.jobs = response.data.bottom;
               localStorage.setItem('jobs',JSON.stringify($scope.jobs)); 
               localStorage.setItem('sliders',JSON.stringify($scope.sliders));   
                $http({
                        method: 'GET',
                        url: base_url+'update_visit', 
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                    }); 
        }, function errorCallback(response) {
                     document.getElementById('loading').setAttribute('style','display:none;'); 
                    ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'خطا در برقراری ارتباط با سرور'
                }); 
       }); 

       
        $scope.push = function(){
         if(myNavigator.topPage.data.id !== undefined){
             $scope.logo_pic = uploads_pic;
             $scope.product_thumb = product_thumb;
             let id = myNavigator.topPage.data.id; 
            document.getElementById('loading').removeAttribute('style'); 
            $http({
            method: 'GET', 
            url: base_url+'banner_ios/'+id, 
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
           }).then(function successCallback(response) {
                document.getElementById('loading').setAttribute('style','display:none;'); 
                $scope.place = response.data.place; 
                $scope.products = response.data.products;  
            
           }, function errorCallback(response) {
                    document.getElementById('loading').setAttribute('style','display:none;'); 
                    ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'خطا در برقراری ارتباط با سرور'
             });
           });

         }
            
       }   
    
 })