 angular.module('myapp')
 .controller('loginController', function() { 
    
})
.controller('registerController', function($scope,$http,$httpParamSerializer) { 
   $scope.member = {
            fname : "",
            lname : "",
            phone : "",
            pass : "",
            repass : "",
            type : "",
            visitor_code : ""
   };
  
   $scope.submit = function(){
      if($scope.member.fname == "" || $scope.member.fname === undefined){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'نام را وارد کنید'
            }); 
      }
      else if($scope.member.lname == "" || $scope.member.lname === undefined){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'نام خانوادگی را وارد کنید'
            }); 
      }
       else if($scope.member.phone == "" || $scope.member.phone === undefined){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'شماره تماس را وارد کنید'
            }); 
      }
       else if($scope.member.pass == "" || $scope.member.pass === undefined){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'کلمه عبور را وارد کنید'
            }); 
      }
      else if($scope.member.repass == "" || $scope.member.repass === undefined){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'تکرار کلمه عبور را وارد کنید'
            }); 
      }
      else if($scope.member.repass != $scope.member.pass ){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'کلمه عبور با تکرار آن مطابقت ندارد'
            }); 
      }
      else if($scope.member.visitor_code == "" || $scope.member.visitor_code === undefined){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'کد ویزیتور را وارد کنید'
            }); 
      }
      else if($scope.member.type == "" || $scope.member.type === undefined){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'نوع اکانت را انتخاب کنید'
            }); 
      }
      else{
        
         $http({
            method: 'POST',
            url: base_url+'home',
            data : $httpParamSerializer({
                info = JSON.stringify($scope.member)
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then(function successCallback(response) {
                
                //$scope.sliders = response.data.slider; 
                // $scope.jobs = response.data.bottom;
                // localStorage.setItem('jobs',JSON.stringify($scope.jobs)); 
                // localStorage.setItem('sliders',JSON.stringify($scope.sliders));   
                    
            }, function errorCallback(response) {
                        ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'خطا در برقراری ارتباط با سرور'
              }); 
        });

     }     
  };
})
.controller('panelController', function() { 

})
.controller('editinfo', function() { 
   
})
.controller('addproduct', function($scope,$timeout) { 
   
    $scope.showModal = function(){$scope.modalshow = 1;}
    $scope.hideModal = function(){$scope.modalshow = 0;}
    $scope.gallery = function(){
          $scope.hideModal();
         openFilePicker();
    };
     $scope.camera = function(){         
           $scope.hideModal();
           openCamera();
    };

 function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }

  function openCamera(selection) {

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
         console.log(imgUri);
    
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function openFilePicker(selection) {

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    
    navigator.camera.getPicture(function cameraSuccess(imageUri) {
             console.log(imageUri);

    }, function cameraError(error) { 
        console.debug("Unable to obtain picture: " + error, "app");

    }, options); 
}
      
})
 .controller('productarchive', function() { 
   
})
.controller('productdetail', function() { 
   
})