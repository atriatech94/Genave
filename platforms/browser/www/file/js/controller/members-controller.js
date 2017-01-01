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
                        console.log(response.data);
                        localStorage.setItem("member_info",JSON.stringify(response.data.member_info));  
                        if(response.data.has_job == 1){
                           localStorage.setItem("has_job",1);
                           localStorage.setItem("job_info",JSON.stringify(response.data.job_info));
                        }
                        else{
                          localStorage.setItem("has_job",0);  
                        }
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
                       localStorage.setItem("has_job",0);  
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
         $rootScope.jobStatus1 = localStorage.getItem('has_job');
      }

       $scope.logout = function(){
          localStorage.removeItem('member_info');
          localStorage.removeItem('job_info');
          localStorage.removeItem('has_job');
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
.controller('joblist', function($scope,$rootScope) { 
   if($rootScope.jobStatus1 != null)
     $scope.jobStatus = $rootScope.jobStatus1;
   else {
       $rootScope.jobStatus1 = localStorage.getItem('has_job');
   }  
   $scope.job2 = function(){
     if($rootScope.jobStatus1 == 1){
          myNavigator.pushPage('job2.html')
     }
     else{
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'ابتدا اطلاعات اولیه شغلی خود را ثبت کنید'
              }); 
     }
      
   };

   $scope.job3 = function(){
     if($rootScope.jobStatus1 == 1){
          myNavigator.pushPage('job3.html')
     }
     else{
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'ابتدا اطلاعات اولیه شغلی خود را ثبت کنید'
              }); 
     }
      
   };

   $scope.job4 = function(){
     if($rootScope.jobStatus1 == 1){
          myNavigator.pushPage('job4.html')
     }
     else{
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'ابتدا اطلاعات اولیه شغلی خود را ثبت کنید'
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
.controller('jobInfo', function($scope,$http,$httpParamSerializer,$location,$rootScope) { 
    
   $scope.info = JSON.parse(localStorage.getItem('member_info'));
    $scope.job = {
        user_id : $scope.info.id,
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

    $scope.jobStatus = localStorage.getItem('has_job');
    

     $scope.submit = function(){
       if($scope.job.cat == "" || $scope.job.cat === undefined){
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'دسته بندی شغل خود را انتخاب کنید'
                }); 
        }
        else if($scope.job.subcat == "" || $scope.job.subcat === undefined){
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'زیر دسته شغل خود را انتخاب کنید'
                }); 
        }
        else if($scope.job.title == "" || $scope.job.title === undefined){
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'عنوان کسب و کار خود را وارد کنید'
                }); 
        }
        else if($scope.job.description == "" || $scope.job.description === undefined){
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: ' توضیحات را وارد کنید'
                }); 
        }
        else if($scope.job.service == "" || $scope.job.service === undefined){
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'خدمات را وارد کنید'
                }); 
        }
        else if($scope.job.adrress == "" || $scope.job.adrress === undefined){
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: ' آدرس را وارد کنید'
                }); 
        }
       else if($scope.job.phone == "" || $scope.job.phone === undefined){
           ons.notification.alert({
                    title: 'خطا',
                    buttonLabel:"بستن " ,
                    message: 'شماره تماس را وارد کنید'
            }); 
      }
    
      else{
         
         document.getElementById('loading').removeAttribute('style'); 
         $http({
                method: 'POST',
                url: base_url+'update_job',
                data: $httpParamSerializer({info : JSON.stringify($scope.job)}),
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
                        localStorage.setItem("has_job",1);
                        localStorage.setItem("job_info",JSON.stringify(response.data.job_info));
                        $rootScope.jobStatus1 = 1;
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

   
    $scope.change = function(cat){
        document.getElementById('loading').removeAttribute('style');     
        $http({
                method: 'GET',
                url: base_url+'get_cat_ios/'+cat, 
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
               if($scope.jobStatus == 1){
                    $scope.job_info = JSON.parse(localStorage.getItem('job_info'));
                    console.log($scope.job_info);
                    $scope.job.title = $scope.job_info[0].title;
                    $scope.job.description = $scope.job_info[0].discription;
                    $scope.job.service = $scope.job_info[0].short_discription;
                    $scope.job.adrress = $scope.job_info[0].address;
                    $scope.job.phone = $scope.job_info[0].tel;
                    $scope.job.telegram = $scope.job_info[0].telegram;
                    $scope.job.instagram = $scope.job_info[0].instagram;
                    $scope.job.website = $scope.job_info[0].website;
                    $scope.job.cat = $scope.job_info[0].cat;
                    $scope.job.subcat = $scope.job_info[0].cat_id;
                    $scope.job.email = $scope.job_info[0].email;
                    $scope.change($scope.job.cat);
                    console.log( $scope.job);

                } 
        }, function errorCallback(response) {
                    document.getElementById('loading').setAttribute('style','display:none;'); 
                    ons.notification.alert({
                      title: 'خطا',
                      buttonLabel:"بستن " ,
                      message: 'خطا در برقراری ارتباط با سرور'
            }); 
          }); 


    

})
.controller('uploadImage', function($scope,$http,$httpParamSerializer,$location,$timeout) { 
        $scope.info = JSON.parse(localStorage.getItem('member_info'));
        $scope.images = [];
        $scope.image_url = uploads_pic;
        $scope.remove = function (id,image) {
          ons.notification.confirm({
                    title : "پیام",
                    message: 'برای حذف تصویر اطمینان دارید ؟',
                    buttonLabels : ['خیر','بلی'],
                        callback: function(idx) {
                            switch (idx) {
                                case 0:
                                       
                                    break;
                                case 1:
                                   $scope.Doremove(id,image);
                                   break;
                        }
                    }
           });
         
       };  
        
        
        $scope.Doremove = function(id,image){
            alert(id,image);
        };


     document.getElementById('loading').removeAttribute('style');     
     $http({
            method: 'GET',
            url: base_url+'get_user_banner/'+$scope.info.id, 
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function successCallback(response) {
               
                document.getElementById('loading').setAttribute('style','display:none;'); 
                $scope.images = response.data.banners;
      
     }, function errorCallback(response) {
                    document.getElementById('loading').setAttribute('style','display:none;'); 
                    ons.notification.alert({
                      title: 'خطا',
                      buttonLabel:"بستن " ,
                      message: 'خطا در برقراری ارتباط با سرور'
            }); 
          }); 





        $scope.showModal = function(){
          if($scope.images.length >= 4){
              ons.notification.alert({
                      title: 'خطا',
                      buttonLabel:"بستن " ,
                      message: 'شما به حداکثر تعداد تصویر خود رسیده اید'
               }); 
               return false;

          } 
          $scope.modalshow = 1;
        }
        $scope.hideModal = function(){
            $scope.modalshow = 0;
        }
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
                targetWidth : 500,
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
                 $timeout(function(){  
                      getFileEntry(imageUri);
                      document.getElementById('loading').removeAttribute('style');     
                 },0); 
                
                 function getFileEntry(imgUri) {
                    window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
                        var UploadUrl = base_url+"upload_banner";
                        ft.upload(fileEntry.nativeURL, encodeURI(UploadUrl), win, fail , options);
                      });
                }
                
                 var ft = new FileTransfer();
                 var win = function (r) { 
                     document.getElementById('loading').setAttribute('style','display:none;'); 
                     r.response = JSON.parse(r.response);
                     if(r.response.error == false)
                     {
                         ons.notification.alert({
                            title: 'پیام سیستم',
                            buttonLabel:"بستن " ,
                            message: r.response.data
                         });
                         $scope.images.unshift(r.response.filename);
                         $scope.$apply();
                     }
                     else
                     {
                         ons.notification.alert({
                            title: 'خطا',
                            buttonLabel:"بستن " ,
                            message: r.response.data
                         });
                     }
                }

                var fail = function (error) {
                     document.getElementById('loading').setAttribute('style','display:none;'); 
                     ons.notification.alert({
                         title: 'خطا',
                         buttonLabel:"بستن " ,
                         message: 'خطا در انتخاب تصویر دوباره تلاش کنید'
                      }); 
                }
                 var params = {};
                    params.user_id = $scope.info.id;
               
                var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
                    options.mimeType = "image/jpeg";
                    options.httpMethod = "POST";
                    options.params = params;
                    options.chunkedMode = false;     
         
           }, function cameraError(error) {
                   
            }, options);
        }
       
       
       
        function openFilePicker(selection) {

            var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
            var options = setOptions(srcType);
            
            navigator.camera.getPicture(function cameraSuccess(imageUri) {
                     $timeout(function(){  
                      getFileEntry(imageUri);
                      document.getElementById('loading').removeAttribute('style');     
                 },0); 
                
                 function getFileEntry(imgUri) {
                    window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
                        var UploadUrl = base_url+"upload_banner";
                        ft.upload(fileEntry.nativeURL, encodeURI(UploadUrl), win, fail , options);
                      });
                }
                
                 var ft = new FileTransfer();
                 var win = function (r) { 
                     document.getElementById('loading').setAttribute('style','display:none;'); 
                     r.response = JSON.parse(r.response);
                     if(r.response.error == false)
                     {
                         ons.notification.alert({
                            title: 'پیام سیستم',
                            buttonLabel:"بستن " ,
                            message: r.response.data
                         });
                         $scope.images.unshift(r.response.filename);
                         $scope.$apply();
                     }
                     else
                     {
                         ons.notification.alert({
                            title: 'خطا',
                            buttonLabel:"بستن " ,
                            message: r.response.data
                         });
                     }
                }

                var fail = function (error) {
                     document.getElementById('loading').setAttribute('style','display:none;'); 
                     ons.notification.alert({
                         title: 'خطا',
                         buttonLabel:"بستن " ,
                         message: 'خطا در انتخاب تصویر دوباره تلاش کنید'
                      }); 
                }
                 var params = {};
                    params.user_id = $scope.info.id;
               
                var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
                    options.mimeType = "image/jpeg";
                    options.httpMethod = "POST";
                    options.params = params;
                    options.chunkedMode = false;

            }, function cameraError(error) { 
                 

            }, options); 
        }

                

});