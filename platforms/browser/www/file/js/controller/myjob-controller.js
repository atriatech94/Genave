app.controller('joblogo', function($scope,$timeout,$http) { 
    
    $scope.base_img = uploads_pic;
    $scope.job_info = JSON.parse(localStorage.getItem('job_info'));
    $scope.info = JSON.parse(localStorage.getItem('member_info'));
    $scope.job_info[0].logo;

    $scope.remove = function(){
        $scope.job_info[0].logo = "";
        localStorage.setItem('job_info',JSON.stringify($scope.job_info));
        $http({
            method: 'GET', 
            url: base_url+'remove_logo/'+$scope.info.id, 
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
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
                         $scope.job_info[0].logo = r.response.filename;
                         $scope.$apply(); 
                         localStorage.setItem('job_info',JSON.stringify($scope.job_info));

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
                    options.mimeType = "image/jpeg";
                    options.httpMethod = "POST";
                    options.params = params;
                    options.chunkedMode = false;
      
        function getFileEntry(imgUri) {
                    window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
                        var UploadUrl = base_url+"upload_logo";
                        ft.upload(fileEntry.nativeURL, encodeURI(UploadUrl), win, fail , options);
                      });
                }
        
        
         function openFilePicker(selection) {
            var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
            var options = setOptions(srcType);
            navigator.camera.getPicture(function cameraSuccess(imageUri) {
                $timeout(function(){  
                      params.filename = $scope.job_info[0].logo;
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
.controller('joblocation', function($scope,$timeout) { 
    menu.setSwipeable(false);
    
})

    