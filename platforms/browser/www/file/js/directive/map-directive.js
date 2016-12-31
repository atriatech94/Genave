app.service('loadGoogleMapAPI', ['$window', '$q', function ( $window, $q ) {

        var deferred = $q.defer(); 

        // Load Google map API script
        function loadScript() {  
            // Use global document since Angular's $document is weak
            var script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAiyKTCRd7rIvh0y4WEPCcjmcsX9ErMhzw&sensor=true&language=fa&callback=initMap&libraries=places,drawing';
            document.body.appendChild(script);
        }

        // Script loaded callback, send resolve
        $window.initMap = function () {
            deferred.resolve();
        }

        loadScript();

        return deferred.promise;
}])
.directive('googleMap',  function( $rootScope, loadGoogleMapAPI , $http , $location ) {  

        return {
            restrict: 'C', // restrict by class name
            scope: {
                mapId: '@id', // map ID
                lat: '@',     // latitude
                long: '@'     // longitude
            },
            link: function( scope, elem, attrs ) {
                 
                
                var flightPath , flightPathh , area_id , center_mp , map , last_points , directionsDisplay;
                var markers = [];
                var other , first_loc = null ;
                var b = 0;
                var counter = 0 ; 
                var geocoder,geocoder2;
                
                var is_click = 1 ; 
                
                
                var _latitude = 29.624698;
                var _longitude = 52.530859;
                var gpss ;
                /*get geo */
                setInterval(function(){ navigator.geolocation.getCurrentPosition(onSuccessw,onErrorw,{timeout:10000}); },500);
                            
                            
                function onSuccessw(){gpss =  1;navigator.geolocation.getCurrentPosition(GetLocation);/*console.log("gps is on");*/}
                function onErrorw(){gpss =  0;/*console.log("gps is off");*/}
                
                var user_pos = new Object();
                
                
               // navigator.geolocation.getCurrentPosition(GetLocation);
                
                function GetLocation(location) 
                {
                    console.log(location.coords.latitude,location.coords.longitude);
                   
                    user_pos.lat = location.coords.latitude;
                    user_pos.lon = location.coords.longitude;
                }
                
                // Check if latitude and longitude are specified
                if ( angular.isDefined(scope.lat) && angular.isDefined(scope.long) ) 
                {

                    // Initialize the map
                    scope.initialize = function() {     
                        geocoder = new google.maps.Geocoder();
                        geocoder2 = new google.maps.Geocoder();
                        
                        var directionsService = new google.maps.DirectionsService();
                        
                        var mapCenter = new google.maps.LatLng(_latitude,_longitude);
                        var mapOptions = {
                            zoom: 13,
                            center: mapCenter,
                            disableDefaultUI: false,
                            //scrollwheel: false,

                        };
                        var mapElement = document.getElementById('submit-map');
                        var map = new google.maps.Map(mapElement, mapOptions);
                        var marker = new google.maps.Marker({
                            position: mapCenter,
                            map: map,
                            icon: 'file/img/marker.png',
                            labelAnchor: new google.maps.Point(50, 0),
                            draggable: true
                        });
                        
                       
                        
                        /*load marker*/
                        
                        
                        /*dragebale marker*/
                        google.maps.event.addListener(marker, "mouseup", function (event) {
                            var latitude = this.position.lat();
                            var longitude = this.position.lng();
                            console.log(latitude,longitude);
                            document.getElementById('latitude').value = latitude;
                            document.getElementById('longitude').value = longitude;
                            //$('#latitude').val( latitude );
                            //$('#longitude').val( longitude );
                        });

                        //  Autocomplete
                        var input = document.getElementById('address_type');
                        var autocomplete = new google.maps.places.Autocomplete(input);
                        autocomplete.bindTo('bounds', map);
                        /*get suggest place*/
                        google.maps.event.addListener(autocomplete, 'place_changed', function() {

                            var place = autocomplete.getPlace();
                            if (!place.geometry) {
                                return;
                            }
                            if (place.geometry.viewport) {
                                map.fitBounds(place.geometry.viewport);
                            } else {
                                map.setCenter(place.geometry.location);
                                map.setZoom(17);
                            }
                            marker.setPosition(place.geometry.location);
                            marker.setVisible(true);
                            
                            console.log(marker.getPosition());
                            
                            document.getElementById('latitude').value = marker.getPosition().lat();
                            document.getElementById('longitude').value = marker.getPosition().lng();
                         
                            
                            var imap = new google.maps.LatLng(marker.getPosition().lat(),marker.getPosition().lng());
                            marker.setPosition(imap);
                            
                            var address = '';
                            
                            if (place.address_components) {
                                address = [
                                    (place.address_components[0] && place.address_components[0].short_name || ''),
                                    (place.address_components[1] && place.address_components[1].short_name || ''),
                                    (place.address_components[2] && place.address_components[2].short_name || '')
                                    ].join(' ');
                            }
                        });
                        
                        
                       
                        /*========================= new code start ===================================*/
                        var shape_type ;
                       
                         google.maps.event.addListener(map, 'click', function(event) {
                                if(is_click != 0)
                                addMarker(event.latLng);
                         });
                        
                        function addMarker(location) {
                            var imap = new google.maps.LatLng(user_pos.lat,user_pos.lon);
                            //map.panTo(location);
                            document.getElementById('latitude').value = location.lat();
                            document.getElementById('longitude').value = location.lng();
                            
                            marker.setPosition(location);
                            
                            
                        }/*end addMarker*/

                        /*Sets the map on all markers in the array.*/
                        function setAllMap(map) {
                            for (var i = 0; i < markers.length; i++) {
                              markers[i].setMap(map);
                            }
                        }

                        /* Removes the markers from the map, but keeps them in the array.*/
                        function clearMarkers() {setAllMap(null);}
                        /*Shows any markers currently in the array.*/
                        function showMarkers() { setAllMap(map);}
                        /*Deletes all markers in the array by removing references to them.*/
                        function deleteMarkers() { clearMarkers();markers = []; }
                        function map_clear(vars){ vars.setMap(null);setAllMap(null);}
                        
                        /*========================= new code start ===================================*/
                        $rootScope.submit_map = function(){
                   
                            var user_latlng = new Array();
                                
                            /*send tu data base*/
                              
                               
                            /*--==========================---*/
                            geocoder2.geocode({ 
                                latLng: marker.getPosition() ,
                                language: 'fa',
                            },function(responses, status){
                                if (status === google.maps.GeocoderStatus.OK)
                                {
                                    if (responses[0]){
                                        var address = responses[0].formatted_address;
                                        $http({
                                            method: 'POST',
                                            url: base_url+'map_address/HamiDaMin23QZYTRRE782',
                                            data: $.param({ 
                                                user_id : localStorage.getItem('user_id'),
                                                lat : user_latlng[0].lat,
                                                lon : user_latlng[0].lng,
                                                address : address,
                                                branch_id : scope.branch_map
                                            }),
                                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                        }).then(function successCallback(response) {
                                            document.getElementById('loading').setAttribute('style','display:none;'); 
                                            if(response.data != 0)
                                            {
                                                var addresses = JSON.parse(localStorage.getItem('address'));
                                                addresses.push({id: JSON.parse(response.data)  , address : address, type : 2 , branch_id : scope.branch_map});
                                                localStorage.setItem('address',JSON.stringify(addresses));
                                                ons.notification.alert({
                                                    title: 'پیام',
                                                    buttonLabel:"بستن" ,
                                                    message: 'آدرس با موفقیت ثبت شد'
                                                });
                                                if(localStorage.getItem('addr_add_check')){
                                                    var addr_add_branch = +localStorage.getItem('addr_add_branch');
                                                    localStorage.removeItem('addr_add_branch');
                                                    localStorage.removeItem('addr_add_check');
                                                    $location.path('/checkout/'+addr_add_branch);   
                                                }
                                                else{
                                                    $location.path('/myprofile/address');     
                                                }   
                                            }
                                            else
                                            {
                                                ons.notification.alert({
                                                    title: 'خطا',
                                                    buttonLabel:"بستن " ,
                                                    message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                                                });
                                                                
                                            }
                                                    
                                        }, function errorCallback(response) {
                                            document.getElementById('loading').setAttribute('style','display:none;'); 
                                            ons.notification.alert({
                                                title: 'خطا',
                                                buttonLabel:"بستن " ,
                                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                                            });
                                            return false;
                                        }); 
                                              
                                    }else{
                                        ons.notification.alert({
                                            title: 'خطا',
                                            buttonLabel:"بستن " ,
                                            message: 'خطا در برقراری ارتباط'
                                        });
                                    } 
                                }
                            });   
                               /*--==========================---*/
                              
                            
                        }// end submit_map
                        
                    }
                    
                   
                    loadGoogleMapAPI.then(function(){scope.initialize();},function () {});
                }
            }
        };
})