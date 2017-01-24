app.controller('searchController', function($http,$scope,$timeout) { 
      $scope.image_url = thumb_pic;
      if(localStorage.getItem('categories')!= null){
        $scope.categories = JSON.parse(localStorage.getItem('categories'));
         $timeout(function(){ 
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
         },3000);
      }
      else
      {
        document.getElementById('loading').removeAttribute('style'); 
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
      }
  


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
       $scope.telegram = function(telegram){
       window.open('https://t.me/'+telegram, '_system');
       
    };

     $scope.instagram = function(instagram){
       window.open('https://instagram.com/'+instagram, '_system');
       
    };
    
    $scope.website = function(website){
       window.open( website , '_system');
       
    };

     $scope.share = function(pic){
         let a = $scope.swiper.activeIndex;
         let src = $scope.swiper.slides[a].querySelector("img[src]").getAttribute("src");
         window.plugins.socialsharing.share('نرم افزار بازار گناوه', $scope.place.title, src , null)
     };
 
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

    $scope.tab = 1; 
    $scope.gallery_active = 0;
     menu.setSwipeable(false);
     $scope.change = function(tab){
        $scope.tab = tab; 
        if(tab == 2){
            $scope.products =  $scope.products1;
        }
     }
     $scope.swiper = {};
     var on_ready = 0;
     $scope.active_swiper =  function(gallery_active) {
         $scope.gallery_active = parseInt(gallery_active);
         if(on_ready==1)
         $scope.swiper.slideTo($scope.gallery_active);
     }  
   
     $scope.onReadySwiper = function(swiper){
        
         $scope.swiper = swiper; 
         on_ready = 1;
         swiper.slideTo($scope.gallery_active);
     }
     $scope.showDialog = function(gallery_active) {
         if ($scope.dialog) {
             $scope.dialog.show();
         } else {
             ons.createDialog('jobs_gallery.html', { parentScope: $scope,cancelable :true })
             .then(function(dialog) {
                 $scope.dialog = dialog;
                 dialog.show();
             }.bind(this));
         }
     }.bind(this);
     
     /* AIzaSyDy_NYhiPZ0A6jAN9t54X4IM7No7gM3uyo */
    $scope.map = "http://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAgsQ1ds-j3GBd4Yz07dHlMiiD33h1r1Jk&center=29.5838591,50.5062979&zoom=16&scale=false&size=600x300&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:mid%7Ccolor:0xf40b6f%7Clabel:%7C29.5838591,50.5062979" ;
    

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
        $scope.products1 = response.data.products;  
            
           }, function errorCallback(response) {
                    document.getElementById('loading').setAttribute('style','display:none;'); 
                    ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'خطا در برقراری ارتباط با سرور'
             });
           });
});



