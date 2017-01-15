 angular.module('myapp')
 .controller('loginController', function($scope,$http,$timeout,$httpParamSerializer,$location,$rootScope) { 
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
                        if(response.data.has_job == 1){
                           localStorage.setItem("has_job",1);
                           localStorage.setItem("job_info",JSON.stringify(response.data.job_info));
                        }
                        else{
                          localStorage.setItem("has_job",0);  
                        }
                        
                        $rootScope.is_login = 1; 
                        //footerTab.loadPage('tab-home.html');
                        
                        $timeout(function(){
                            footerTab.setActiveTab(3);
                        },0)

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
.controller('registerController', function($scope,$timeout,$http,$httpParamSerializer,$location,$rootScope) { 
   
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
                        $timeout(function(){
                            footerTab.setActiveTab(3);
                        },0)
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
.controller('panelController', function($scope,$location,$rootScope,$http) { 
     if(localStorage.getItem('member_info') == null){
         $rootScope.is_login = 0;
         footerTab.setActiveTab(0);
      }
      else
      {
         $scope.info = JSON.parse(localStorage.getItem('member_info'));
         $rootScope.jobStatus1 = localStorage.getItem('has_job');
          
         $http({
                method: 'GET',
                url: base_url+'validate_account/'+$scope.info.id, 
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then(function successCallback(response) {
                 
                 if(response.data.done == 1)
                 {
                        $rootScope.is_login = 0;
                        localStorage.removeItem('member_info');
                        localStorage.removeItem('job_info');
                        localStorage.removeItem('has_job');
                        footerTab.setActiveTab(0);
                        ons.notification.alert({
                           title: 'پیام',
                           buttonLabel:"بستن " ,
                           message: response.data.msg
                        }); 
                 }
           
         }, function errorCallback(response) {
                 
            }); 



      }

       $scope.logout = function(){
           $rootScope.is_login = 0;
           localStorage.removeItem('member_info');
           localStorage.removeItem('job_info');
           localStorage.removeItem('has_job');
           footerTab.setActiveTab(0);
      };

        $scope.pop = function(){
          $scope.info = JSON.parse(localStorage.getItem('member_info'));
        };
        
        $scope.push_kala = function(){
           
        if($rootScope.jobStatus1 == 1){
           panelnav.pushPage('page5.html');
       }
       else{
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'ابتدا اطلاعات اولیه شغلی خود را ثبت کنید'
              }); 
          }
        };

     $scope.push_archive = function(){
           
      if($rootScope.jobStatus1 == 1){
          panelnav.pushPage('page6.html');
       }
       else{
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'ابتدا اطلاعات اولیه شغلی خود را ثبت کنید'
              }); 
          }
        };

        $scope.push_work = function(){
           
      if($rootScope.jobStatus1 == 1){
          panelnav.pushPage('page7.html');
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
                         panelnav.popPage();
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
                       panelnav.popPage();
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
          panelnav.pushPage('job2.html');
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
          panelnav.pushPage('job3.html');
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
          panelnav.pushPage('job4.html');
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
                        panelnav.popPage();
                       
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
                    ;

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
            $scope.images.splice(id, 1); 
            $http({
                method: 'POST',
                url: base_url+'remove_banner',
                data: $httpParamSerializer({user_id : $scope.info.id, file_name : image }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                
            }, function errorCallback(response) {
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

                

})
.controller('addproduct', function($scope,$timeout) { 
    $scope.info = JSON.parse(localStorage.getItem('member_info'));
    $scope.product = {
       title : "",
       price : "",
       description : "",
       photo : ""
    };
   
    $scope.submit = function(){
       if($scope.product.title == "" || $scope.product.title === undefined){
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'عنوان  را وارد کنید'
                }); 
        }
        else if($scope.product.photo == "" || $scope.product.photo === undefined){
            ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'تصویر را انتخاب کنید'
                }); 
        }
        else{
         
         document.getElementById('loading').removeAttribute('style'); 
         params.price = $scope.product.price;
         params.title = $scope.product.title;
         params.description = $scope.product.description;
         options.fileName = $scope.product.photo.substr($scope.product.photo.lastIndexOf('/') + 1);
         getFileEntry($scope.product.photo);
         

     }     
  };

  $scope.remove = function(){
      $scope.product.photo = "";
  };

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
   
   function getFileEntry(imgUri) {
          window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
                 var UploadUrl = base_url+"add_product";
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
                $scope.product.title = "";
                $scope.product.price = "";
                $scope.product.description = "";
                $scope.product.photo = "";
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
        params.price = $scope.product.price;
        params.title = $scope.product.title;
        params.description = $scope.product.description;
    
    var options = new FileUploadOptions();
        options.fileKey = "file";
        options.mimeType = "image/jpeg";
        options.httpMethod = "POST";
        options.params = params;
        options.chunkedMode = false;   


   function setOptions(srcType) {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                targetWidth : 500,
                sourceType: srcType,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
                allowEdit: true,
                correctOrientation: true
            }
            return options;
        } 

        function openCamera(selection) {

            var srcType = Camera.PictureSourceType.CAMERA;
            var options = setOptions(srcType);
            navigator.camera.getPicture(function cameraSuccess(imageUri) {
                 $timeout(function(){  
                     $scope.product.photo = imageUri;
                     $scope.$apply();
                 },0); 
            
           }, function cameraError(error) {
                   
            }, options);
        }
       
       
       
        function openFilePicker(selection) {

            var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
            var options = setOptions(srcType);
            
            navigator.camera.getPicture(function cameraSuccess(imageUri) {
                     $timeout(function(){ 
                        $scope.product.photo = imageUri;
                        $scope.$apply();
                    },0); 
              
            }, function cameraError(error) { 
                 

            }, options); 
        }

      
})
.controller('productarchive', function($scope,$http,$rootScope) { 
     $scope.info = JSON.parse(localStorage.getItem('member_info'));
    
     $scope.product_thumb = product_thumb;
     document.getElementById('loading').removeAttribute('style');     
        $http({
                method: 'GET',
                url: base_url+'get_product/'+$scope.info.id, 
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then(function successCallback(response) {
                    document.getElementById('loading').setAttribute('style','display:none;'); 
                    $rootScope.products = response.data.products; 
            }, function errorCallback(response) {
                        document.getElementById('loading').setAttribute('style','display:none;'); 
                        ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'خطا در برقراری ارتباط با سرور'
                }); 
            });
})
.controller('productdetail', function($scope,$timeout,$http,$httpParamSerializer,$rootScope) { 
    $scope.img_url = uploads_pic;
    $scope.product = {
       id : panelnav.topPage.data.id, 
       title : panelnav.topPage.data.title,
       price : Number(panelnav.topPage.data.price),
       description : panelnav.topPage.data.description,
       photo : panelnav.topPage.data.pic_name
    };

     $scope.romove_product = function(id){
          ons.notification.confirm({
                    title : "پیام",
                    message: 'برای حذف محصول اطمینان دارید ؟',
                    buttonLabels : ['خیر','بلی'],
                        callback: function(idx) {
                            switch (idx) {
                                case 0:
                                       
                                    break;
                                case 1:
                                   $scope.Doremove(id);
                                   break;
                        }
                    }
           });
     };
         
        $scope.Doremove = function(id){ 
           
            for(let i=0 ; i < $rootScope.products.length ; i++){
                if($rootScope.products[i].id == id){
                    $rootScope.products.splice(i, 1); 
                    break;
                }
             }
             panelnav.popPage();
              $http({
                method: 'POST',
                url: base_url+'delete_product',
                data: $httpParamSerializer({id : id }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                
            }, function errorCallback(response) {
                       ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'خطا در برقراری ارتباط با سرور'
                   }); 
           });
            
        };

    $scope.submit = function(){
        document.getElementById('loading').removeAttribute('style'); 
         $http({
                method: 'POST',
                url: base_url+'update_product',
                data: $httpParamSerializer({
                    id : $scope.product.id,
                    title :  $scope.product.title,
                    price :  $scope.product.price,
                    description :  $scope.product.description,
                }),
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
                         for(let i=0 ; i<$rootScope.products.length ; i++){
                            if($rootScope.products[i].id == $scope.product.id){
                                $rootScope.products[i].title = $scope.product.title;
                                $rootScope.products[i].price = $scope.product.price;
                                $rootScope.products[i].description = $scope.product.description;
                                break;
                            }
                        }
                    }
                    
            }, function errorCallback(response) {
                        document.getElementById('loading').setAttribute('style','display:none;'); 
                        ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'خطا در برقراری ارتباط با سرور'
              }); 
        });
    };

    $scope.showModal = function(){$scope.modalshow = 1;}
    $scope.hideModal = function(){$scope.modalshow = 0;}
    
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

                  var ft = new FileTransfer();
                  var win = function (r) { 
                     document.getElementById('loading').setAttribute('style','display:none;'); 
                     r.response = JSON.parse(r.response);
                     if(r.response.error == false)
                     {
                         $scope.product.photo = r.response.filename;
                          for(let i=0 ; i<$rootScope.products.length ; i++){
                            if($rootScope.products[i].id == $scope.product.id){
                                $rootScope.products[i].pic_name = $scope.product.photo;
                                break;
                            }
                         } 
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
                    params.id = $scope.product.id;
               
                var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.mimeType = "image/jpeg";
                    options.httpMethod = "POST";
                    options.params = params;
                    options.chunkedMode = false;
      
        function getFileEntry(imgUri) {
                    window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
                        var UploadUrl = base_url+"edit_product_pic";
                        ft.upload(fileEntry.nativeURL, encodeURI(UploadUrl), win, fail , options);
                      });
                }
        
        
         function openFilePicker(selection) {
            var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
            var options = setOptions(srcType);
            navigator.camera.getPicture(function cameraSuccess(imageUri) {
                $timeout(function(){  
                      params.filename = $scope.product.photo;
                      options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
                      getFileEntry(imageUri);
                      document.getElementById('loading').removeAttribute('style');     
                      
                 },0); 
             }, function cameraError(error) { 
                 

            }, options); 
        }
       
       
       
        function openCamera(selection) {

            var srcType = Camera.PictureSourceType.CAMERA;
            var options = setOptions(srcType);
            navigator.camera.getPicture(function cameraSuccess(imageUri) {
                 $timeout(function(){  
                      params.filename = $scope.product.photo;
                      options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
                      getFileEntry(imageUri);
                      document.getElementById('loading').removeAttribute('style');     
                 },0); 
              
           }, function cameraError(error) {
                   
            }, options);
        }
       
       
})       
.controller('msgController', function($scope,$http,$httpParamSerializer,$location, $anchorScroll,$timeout) {       
         $scope.info = JSON.parse(localStorage.getItem('member_info'));
         $scope.msg_user = {
              text1 : ""
            };
         $http({
                method: 'POST',
                url: base_url+'get_message',
                data: $httpParamSerializer({ user_id : $scope.info.id }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                $scope.messages = response.data.msg;
               $timeout(function(){  
                 $location.hash('bottom');
                 $anchorScroll();
              },0);  
             
           },function errorCallback(response) {
                       ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'خطا در برقراری ارتباط با سرور'
                   }); 
           });


      $scope.send_msg = function(){
           $scope.messages.push({id : 9000, reply : "", text : $scope.msg_user.text1});
           $scope.msg_user.text2 = $scope.msg_user.text1;
           $scope.msg_user.text1 = "";
           $location.hash('bottom');
           $anchorScroll();
           $http({
                method: 'POST',
                url: base_url+'save_message',
                data: $httpParamSerializer({ user_id : $scope.info.id , text : $scope.msg_user.text2}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
           
      }     



});