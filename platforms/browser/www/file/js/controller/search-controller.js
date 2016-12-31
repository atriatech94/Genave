app.controller('searchController', function($http,$scope) { 
      $scope.image_url = thumb_pic;
      if(localStorage.getItem('categories')!= null){
        $scope.categories = JSON.parse(localStorage.getItem('categories'));
      }
   $http({
            method: 'GET',
            url: base_url+'get_cat_ios/0', 
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function successCallback(response) {
               $scope.categories = response.data.category; 
               localStorage.setItem('categories',JSON.stringify($scope.categories)); 
        }, function errorCallback(response) {
                    ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'خطا در برقراری ارتباط با سرور'
            }); 
          }); 

       
       $scope.push = function(){
         if(myNavigator.topPage.data.id !== undefined){

          if(myNavigator.topPage.data.id == 1){    
            
              let cat_id = myNavigator.topPage.data.cat_id; 
                $http({
                  method: 'GET',
                  url: base_url+'get_cat_ios/'+cat_id, 
                  headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
              }).then(function successCallback(response) {
                  
                    $scope.subcategories = response.data.category; 
              }, function errorCallback(response) {
                            ons.notification.alert({
                            title: 'خطا',
                            buttonLabel:"بستن " ,
                            message: 'خطا در برقراری ارتباط با سرور'
              });
            });

          }

          if(myNavigator.topPage.data.id == 2){    
                $scope.img_url = product_thumb;
                let cat_id = myNavigator.topPage.data.cat_id; 
                $http({
                  method: 'GET',
                  url: base_url+'banner_archive_ios/'+cat_id, 
                  headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
              }).then(function successCallback(response) {
                   $scope.jobs = response.data.jobs;  
                   console.log($scope.jobs);                  
              }, function errorCallback(response) {
                            ons.notification.alert({
                            title: 'خطا',
                            buttonLabel:"بستن " ,
                            message: 'خطا در برقراری ارتباط با سرور'
              });
            });

          }

          if(myNavigator.topPage.data.id == 4){    
                $scope.logo_pic = uploads_pic;
                $scope.product_thumb = product_thumb;
                let id = myNavigator.topPage.data.job_id; 
                  $http({
                method: 'GET', 
                url: base_url+'banner_ios/'+id, 
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
              }).then(function successCallback(response) {
                    $scope.place = response.data.place; 
                    $scope.products = response.data.products;  
                
              }, function errorCallback(response) {
                        ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'خطا در برقراری ارتباط با سرور'
                });
              });

          }
       
       } 
    };  

      $scope.jobBack = function(){
         $scope.place = ""; 
         $scope.products = ""; 
     }; 

     $scope.pop_cat = function(){
         $scope.subcategories = "";
     };

     $scope.sub_cat = function(){
        $scope.jobs = "";
     };

    

})
.controller('business', function() { 

})