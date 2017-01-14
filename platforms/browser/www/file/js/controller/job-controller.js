app.controller('jobdetail', function($scope,$http) { 
    
     
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
     $scope.active_swiper =  function(gallery_active) {
       
         $scope.gallery_active = parseInt(gallery_active);
     }
     $scope.onReadySwiper = function(swiper){
         console.log($scope.gallery_active);
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
    $scope.onReadySwiper = function (swiper) {
       
         swiper.on('slideChangeStart', function() {
             swiper.update();	
         });
        

    };

    $scope.logo_pic = uploads_pic;
    $scope.product_thumb = product_thumb;
    let id = homenav.topPage.data.id; 
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

         
})