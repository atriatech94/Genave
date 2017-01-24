 angular.module('myapp')
 .controller('indexController', function($scope,$location,$rootScope,$http,$httpParamSerializer) { 
     ons.ready(function() {
           ImgCache.$init();
        });
    $scope.telegram = function(){
       window.open('https://t.me/bazargnv', '_system');
       $scope.menu.toggleMenu();
    };

     $scope.instagram = function(){
       window.open('https://instagram.com/bazar.gnv', '_system');
       $scope.menu.toggleMenu();
    };

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
                    message: 'برای در خواست تبلیغات ویژه به حساب کاربری خود وارد شوید یا عضو گردید'
                }); 
                footerTab.setActiveTab(3);
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
     $scope.conf = function(){
        $scope.info_u = JSON.parse(localStorage.getItem('member_info'));  
        $scope.menu.toggleMenu();
        ons.notification.confirm({
                    title : "پیام",
                    message: 'برای ارسال درخواست تبلیغات ویژه اطمینان دارید ؟',
                    buttonLabels : ['لغو','ارسال درخواست'],
                        callback: function(idx) {
                            switch (idx) {
                                case 0:
                                   break;
                                case 1:
                                   $scope.send_msg_a($scope.info_u.id);
                                   break;
                        }
                    }
           });
      
     };

      $scope.send_msg_a = function(id){ 
           document.getElementById('loading').removeAttribute('style'); 
           $http({
                method: 'POST',
                url: base_url+'request_advs',
                data: $httpParamSerializer({user_id : id }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                document.getElementById('loading').setAttribute('style','display:none;'); 
                 if(response.data.done == 1){
                       ons.notification.alert({
                         title: 'پیام سیستم',
                         buttonLabel:"بستن " ,
                         message: response.data.msg
                   }); 
                 }
                 else
                 { 
                       ons.notification.alert({
                         title: 'خطا',
                         buttonLabel:"بستن " ,
                         message: response.data.msg
                      }); 

                 }

            }, function errorCallback(response) {
                document.getElementById('loading').setAttribute('style','display:none;'); 
                       ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'خطا در برقراری ارتباط با سرور'
                   }); 
           });
            
        };
      
 })
 .controller('homeController', function($scope,$http,$timeout) { 
      
      $scope.img_url = baner_pic;
      $scope.job_url = baner_thumb_pic;
      if(localStorage.getItem('jobs') != null){
        $scope.jobs = JSON.parse(localStorage.getItem('jobs'));
        $scope.sliders = JSON.parse(localStorage.getItem('sliders')); 
        $timeout(function(){
             $http({
                method: 'GET',
                url: base_url+'home', 
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
             }).then(function successCallback(response) {
                document.getElementById('loading').setAttribute('style','display:none;'); 
                $scope.sliders = response.data.slider; 
                $scope.jobs = response.data.bottom;
                $scope.slider_change();
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
   

        },2500);

      }
      else
      {
            document.getElementById('loading').removeAttribute('style'); 
            $http({
                method: 'GET',
                url: base_url+'home', 
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then(function successCallback(response) {
                document.getElementById('loading').setAttribute('style','display:none;'); 
                $scope.sliders = response.data.slider; 
                $scope.jobs = response.data.bottom;
                $scope.slider_change();
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
        

      }
     
       

  $scope.slider_change = function(){
    $timeout(function(){
      if(carousel2.getActiveIndex() == 0){
         carousel2.last();
      }
      else
      {
         carousel2.prev();
      }  
       $scope.slider_change();
      },3800);
 }; 
     
    
 });