app.controller('jobdetail', function($scope) { 
    $scope.tab = 1;
    $scope.gallery_active = 0;
     
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
          $scope.map = "http://maps.googleapis.com/maps/api/staticmap?key=AIzaSyChkfjZj1Cya2gQE7sJMc1c7-okYGB5Xhk&center=29.5838591,50.5062979&zoom=16&scale=false&size=600x300&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:mid%7Ccolor:0xf40b6f%7Clabel:%7C29.5838591,50.5062979" ;
     $scope.poppage = function(){
         
     }
})