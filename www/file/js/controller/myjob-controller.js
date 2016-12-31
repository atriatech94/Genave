app.controller('uploadimage', function($scope,$timeout) { 
    $scope.showModal = function(){$scope.modalshow = 1;console.log($scope.modalshow)}
    $scope.hideModal = function(){$scope.modalshow = 0;console.log(modalshow)}
    
   $scope.triggerClick = function () {
       document.querySelector('input').click();
   };
})
.controller('joblogo', function($scope,$timeout) { 
    
    
    $scope.inputopen = function(){  
        console.log(1234);
         $timeout(function(){document.querySelector('#logo').click() });
    }
})
.controller('joblocation', function($scope,$timeout) { 
    menu.setSwipeable(false);
    
})

    