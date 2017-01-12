app.controller('searchController', function($http,$scope) { 
      $scope.image_url = thumb_pic;
      if(localStorage.getItem('categories')!= null){
        $scope.categories = JSON.parse(localStorage.getItem('categories'));
      }
      else
      {
        document.getElementById('loading').removeAttribute('style'); 
      }
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
.controller('subcategory', function($http,$scope) { 
              let cat_id = searchone.topPage.data.cat_id; 
              $scope.subcategory_t = searchone.topPage.data.title1;
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
.controller('subcategory2', function($http,$scope) { 
              $scope.img_url = uploads_pic;
              let cat_id = searchone.topPage.data.cat_id; 
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
})
.controller('jobdetail_search', function($http,$scope) { 
       $scope.tab = 1;
    $scope.gallery_active = 0;
     menu.setSwipeable(false);
     $scope.change = function(tab){
        $scope.tab = tab; 
         console.log(tab);
     }

     $scope.showDialog = function(gallery_active) {
        
         $scope.gallery_active = parseInt(gallery_active) - 1;
         console.log($scope.gallery_active);
         if ($scope.dialog) {
             $scope.dialog.show();
         } else {
             ons.createDialog('dialog.html', { parentScope: $scope,cancelable :true })
             .then(function(dialog) {
                 $scope.dialog = dialog;
                 dialog.show();
             }.bind(this));
         }
     }.bind(this);
     
     /* AIzaSyDy_NYhiPZ0A6jAN9t54X4IM7No7gM3uyo */
    $scope.map = "http://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAgsQ1ds-j3GBd4Yz07dHlMiiD33h1r1Jk&center=29.5838591,50.5062979&zoom=16&scale=false&size=600x300&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:mid%7Ccolor:0xf40b6f%7Clabel:%7C29.5838591,50.5062979" ;
    
    $scope.onReadySwiper = function (swiper) {
       
         swiper.on('slideChangeStart', function() {
             swiper.update();	
             console.log('1234');
         });
        

    };

    $scope.logo_pic = uploads_pic;
    $scope.product_thumb = product_thumb;
    let id = searchone.topPage.data.job_id; 
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
});



