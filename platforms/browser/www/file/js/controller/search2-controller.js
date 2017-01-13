app.controller('search2Controller', function($scope,$http) { 
   if(localStorage.getItem('categories')!= null){
        $scope.categories = JSON.parse(localStorage.getItem('categories'));
      }
      else
     $http({
            method: 'GET',
            url: base_url+'get_cat_ios/0', 
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function successCallback(response) {
               document.getElementById('loading').setAttribute('style','display:none;'); 
               $scope.categories = response.data.category; 
               localStorage.setItem('categories',JSON.stringify($scope.categories)); 
        }, function errorCallback(response) {
                    document.getElementById('loading').setAttribute('style','display:none;'); 
                    ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'خطا در برقراری ارتباط با سرور'
            }); 
          }); 
})
.controller('search2ControllerCat', function($scope,$http) { 
              let cat_id = searchNav.topPage.data.cat_id; 
              $scope.subcategory_t = searchNav.topPage.data.title1;
              document.getElementById('loading').removeAttribute('style');   
                $http({
                    method: 'GET',
                    url: base_url+'get_cat_ios/'+cat_id, 
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }).then(function successCallback(response) {
                    document.getElementById('loading').setAttribute('style','display:none;'); 
                    $scope.subcategories = response.data.category; 
                }, function errorCallback(response) {
                    document.getElementById('loading').setAttribute('style','display:none;');    
                    ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'خطا در برقراری ارتباط با سرور'
                    });
                });
})
.controller('search2detail', function($scope,$http) {
               let cat_id = searchNav.topPage.data.cat_id;
               $scope.img_url = uploads_pic;
               $scope.subcategory_t = searchNav.topPage.data.title2; 
              document.getElementById('loading').removeAttribute('style'); 
              $http({
                  method: 'GET',
                  url: base_url+'banner_archive_ios/'+cat_id, 
                  headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
              }).then(function successCallback(response) {
                  document.getElementById('loading').setAttribute('style','display:none;'); 
                  $scope.jobs = response.data.jobs;  
                  console.log($scope.jobs);                  
              }, function errorCallback(response) {
                  document.getElementById('loading').setAttribute('style','display:none;'); 
                  ons.notification.alert({
                      title: 'خطا',
                      buttonLabel:"بستن " ,
                      message: 'خطا در برقراری ارتباط با سرور'
                  });
              });
}); 