 angular.module('myapp')
 .controller('loginController', function($scope,$http,$httpParamSerializer,$location,$rootScope) { 
     $scope.member = {
            phone : "",
            password : ""
     };
     $scope.submit = function(){
         
         if($scope.member.phone == "" || $scope.member.phone === undefined){
               ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'شماره موبایل را وارد کنید'
               }); 
        }
        else if($scope.member.password == "" || $scope.member.password === undefined){
                ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'کلمه عبور را وارد کنید'
                }); 
        } 
        else{
            $scope.member.phone = Number($scope.member.phone); 
            document.getElementById('loading').removeAttribute('style'); 
            $http({
                    method: 'POST',
                    url: base_url+'login',
                    data: $httpParamSerializer({phone: $scope.member.phone , password: $scope.member.password}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(response) {
                   
                    document.getElementById('loading').setAttribute('style','display:none;'); 
                    if(response.data.done == 0){
                            ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: response.data.msg
                            }); 
                    }
                    else if ( response.data.done == 1 )
                    {
                        localStorage.setItem("member_info",JSON.stringify(response.data.member_info));  
                        $rootScope.is_login = 1;  
                        $location.path('/members/panel');
                    }
                        
                }, function errorCallback(response) {
                            
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            ons.notification.alert({
                            title: 'خطا',
                            buttonLabel:"بستن " ,
                            message: 'خطا در برقراری ارتباط با سرور'
                }); 
            });

        } 
     }; 
})
.controller('registerController', function($scope,$http,$httpParamSerializer,$location,$rootScope) { 
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
      $scope.member.phone = Number($scope.member.phone);
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
      else if(typeof ($scope.member.phone) != 'number' )
             {
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'شماره تلفن وارد شده معتبر نیست !!'
                });
               
             }
         else if($scope.member.phone.toString().length != 10 )
             {
              
                ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'شماره تلفن وارد شده معتبر نیست !!'
                });
                return false;
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
         
         document.getElementById('loading').removeAttribute('style'); 
         $http({
                method: 'POST',
                url: base_url+'add_user',
                data: $httpParamSerializer({info : JSON.stringify($scope.member)}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                   document.getElementById('loading').setAttribute('style','display:none;'); 
                   if(response.data.done == 0){
                        ons.notification.alert({
                            title: 'خطا',
                            buttonLabel:"بستن " ,
                            message: response.data.msg
                         }); 
                   }
                   else if ( response.data.done == 1 )
                   {
                        ons.notification.alert({
                            title: 'پیام سیستم',
                            buttonLabel:"بستن " ,
                            message: 'ثبت نام با موفقیت انجام شد' 
                         }); 
                       localStorage.setItem("member_info",JSON.stringify(response.data.member_info));  
                       $rootScope.is_login = 1;  
                       $location.path('/members/panel');
                   }
                    
            }, function errorCallback(response) {
                        document.getElementById('loading').setAttribute('style','display:none;'); 
                        ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'خطا در برقراری ارتباط با سرور'
              }); 
        });

     }     
  };
})
.controller('panelController', function($scope,$location,$rootScope) { 
      if(localStorage.getItem('member_info') == null){
         $rootScope.is_login = 0;
         $location.path('/');
      }
      else
      {
         $scope.info = JSON.parse(localStorage.getItem('member_info'));
      }

       $scope.logout = function(){
          localStorage.removeItem('member_info');
          $rootScope.is_login = 0;
          $location.path('/');
      };

       $scope.pop = function(){
          $scope.info = JSON.parse(localStorage.getItem('member_info'));
       };
      
})
.controller('changepass', function($http,$httpParamSerializer,$scope,$location,$rootScope) { 
     $scope.password =  {
       last : "",
       newpass : "",
       confirmPass : ""
    }; 
    $scope.submit = function(){
     
      if($scope.password.last == "" || $scope.password.last === undefined){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'کلمه عبور فعلی را وارد کنید'
            }); 
      }
      else if($scope.password.newpass == "" || $scope.password.newpass === undefined){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'کلمه عبور جدید را وارد کنید'
            }); 
      }
       else if($scope.password.confirmPass == "" || $scope.password.confirmPass === undefined){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'تکرار کلمه عبور جدید را وارد کنید'
            }); 
      }
      else if($scope.password.confirmPass != $scope.password.newpass){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: ' کلمه عبور با تکرار آن مطابقت ندارد'
            }); 
      }
      else{
         $scope.info = JSON.parse(localStorage.getItem('member_info'));
          document.getElementById('loading').removeAttribute('style'); 
         $http({
                method: 'POST',
                url: base_url+'update_password',
                data: $httpParamSerializer({ password : $scope.password.newpass , oldPassword : $scope.password.last , id : $scope.info.id }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {

                document.getElementById('loading').setAttribute('style','display:none;'); 
                 if(response.data.done == 0){
                        ons.notification.alert({
                            title: 'خطا',
                            buttonLabel:"بستن " ,
                            message: response.data.msg
                         }); 
                   }
                   else if ( response.data.done == 1 )
                   {
                        ons.notification.alert({
                            title: 'پیام سیستم',
                            buttonLabel:"بستن " ,
                            message: response.data.msg 
                         }); 
                         myNavigator.popPage();
                   }
                    
            }, function errorCallback(response) {
                       
                        document.getElementById('loading').setAttribute('style','display:none;'); 
                        ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'خطا در برقراری ارتباط با سرور'
              }); 
        });

     }     
  };

      
})
.controller('editinfo', function($scope,$http,$httpParamSerializer) { 
    $scope.info = JSON.parse(localStorage.getItem('member_info'));
    $scope.member =  {
       id : $scope.info.id,
       fname : $scope.info.fname,
       lname : $scope.info.lname,
       phone : Number($scope.info.phone)
    };

    $scope.submit = function(){
      $scope.member.phone = Number($scope.member.phone);
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
      else if(typeof ($scope.member.phone) != 'number' )
             {
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'شماره تلفن وارد شده معتبر نیست !!'
                });
               
             }
         else if($scope.member.phone.toString().length != 10 )
             {
              
                ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'شماره تلفن وارد شده معتبر نیست !!'
                });
                return false;
             } 
     
         else{
         
         document.getElementById('loading').removeAttribute('style'); 
         $http({
                method: 'POST',
                url: base_url+'update_info',
                data: $httpParamSerializer({info : JSON.stringify($scope.member)}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                document.getElementById('loading').setAttribute('style','display:none;'); 
                 if(response.data.done == 0){
                        ons.notification.alert({
                            title: 'خطا',
                            buttonLabel:"بستن " ,
                            message: response.data.msg
                         }); 
                   }
                   else if ( response.data.done == 1 )
                   {
                        ons.notification.alert({
                            title: 'پیام سیستم',
                            buttonLabel:"بستن " ,
                            message: response.data.msg 
                         }); 
                       localStorage.setItem("member_info",JSON.stringify($scope.member));  
                       myNavigator.popPage();
                   }
                    
            }, function errorCallback(response) {
                        document.getElementById('loading').setAttribute('style','display:none;'); 
                        ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'خطا در برقراری ارتباط با سرور'
              }); 
        });

     }     
  };
    
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
.controller('jobInfo', function($scope,$http) { 
   
    $scope.job = {
        title : "",
        description : "",
        service : "",
        adrress : "",
        phone : "",
        telegram : "",
        instagram : "",
        website : "",
        email : "",
        cat : "",
        subcat : ""
    };
   
    $scope.change = function(cat){
        document.getElementById('loading').removeAttribute('style');     
        $http({
                method: 'GET',
                url: base_url+'get_cat_ios/cat', 
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
    };
     document.getElementById('loading').removeAttribute('style');     
     $http({
            method: 'GET',
            url: base_url+'get_cat_ios/0', 
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function successCallback(response) {
                document.getElementById('loading').setAttribute('style','display:none;'); 
               $scope.categories = response.data.category; 
        }, function errorCallback(response) {
                    document.getElementById('loading').setAttribute('style','display:none;'); 
                    ons.notification.alert({
                      title: 'خطا',
                      buttonLabel:"بستن " ,
                      message: 'خطا در برقراری ارتباط با سرور'
            }); 
          }); 
});