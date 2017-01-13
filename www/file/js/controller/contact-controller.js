app.controller('contactController', function($scope,$http) { 
     $scope.base_img = uploads_pic;
      if(localStorage.getItem('contact_us') != null){
         $scope.contact_us = JSON.parse(localStorage.getItem('contact_us'));
      }
      else
      {
        document.getElementById('loading').removeAttribute('style'); 
      }
      
      $http({
            method: 'GET',
            url: base_url+'contact_us', 
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function successCallback(response) {
               document.getElementById('loading').setAttribute('style','display:none;'); 
               $scope.contact_us = response.data.contact_us; 
               console.log($scope.contact_us);
               localStorage.setItem('contact_us',JSON.stringify($scope.contact_us)); 
         }, function errorCallback(response) {
                    document.getElementById('loading').setAttribute('style','display:none;'); 
                    ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'خطا در برقراری ارتباط با سرور'
                }); 
       });


        $scope.tel = function(tel){
        ons.notification.confirm({
                    title : "پیام",
                    message: 'تماس با '+tel,
                    buttonLabels : ['لغو','تماس'],
                        callback: function(idx) {
                            switch (idx) {
                                case 0:
                                   break;
                                case 1:
                                   $scope.tel1(tel);
                                   break;
                        }
                    }
           });
      
     };
     
     $scope.tel1 = function(tel){
         window.plugins.CallNumber.callNumber(onSuccess, onError, tel);
         function onSuccess(result){
            console.log("Success:"+result);
         }

            function onError(result) {
            console.log("Error:"+result);
        }
     };  
});