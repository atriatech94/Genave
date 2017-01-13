 app.controller('aboutController', function($scope,$http) { 
      $scope.base_img = uploads_pic;
      if(localStorage.getItem('about_us') != null){
         $scope.about_us = JSON.parse(localStorage.getItem('about_us'));
      }
      else
      {
        document.getElementById('loading').removeAttribute('style'); 
      }
      
      $http({
            method: 'GET',
            url: base_url+'about_us', 
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function successCallback(response) {
               document.getElementById('loading').setAttribute('style','display:none;'); 
               $scope.about_us = response.data.about; 
               console.log($scope.about_us);
               localStorage.setItem('about_us',JSON.stringify($scope.about_us)); 
         }, function errorCallback(response) {
                    document.getElementById('loading').setAttribute('style','display:none;'); 
                    ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'خطا در برقراری ارتباط با سرور'
                }); 
       }); 
 });