angular.module('myApp.templates', [])
.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/templates', {
        templateUrl: 'templates/templates.html',
        controller: 'templatesCtrl'
    })
    .when('/templates/:templateId', {
        templateUrl: '../product-details/product-details.html',
        controller: 'productCtrl'
    })
}])
.controller('myAppCtrl', function(){

})
.controller('templatesCtrl', [ '$scope', '$http', function($scope, $http){
    $http.get('../json/products.json')
    .success(function(data){
        console.log(data);
        $scope.products = data;
    });
}])
.controller('productCtrl', [ '$scope', '$http', '$routeParams', '$filter' , function($scope,  $http, $routeParams,$filter){
    var productId = $routeParams.templateId;
    // console.log(productId);
    $http.get('../json/products.json')
        .success(function(data){
            $scope.product = $filter('filter')(data, function(d){
                return d.id == productId;
            })[0];
            $scope.mainImg = $scope.product.images[0].name;
        });
        $scope.changeImg = function(image){
            $scope.mainImg = image.name;
        }
}])