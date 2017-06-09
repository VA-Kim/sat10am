var app = angular.module('articleApp', []);
app.controller('tableCtrl', function($scope, $http){

  // 시작하자마자 조회!
  $http.get('/api/articles')
    .then(function (response) {
      $scope.articles = response.data;
    });

  // 고고 버튼 클릭시
  $scope.gogo = function(){
    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    console.log(title);
    var data = {
      title : title,
      content : content
    };
    $http.post('/api/articles', data)
      .then(function(response){
        var articles = response.data;
        $scope.articles = articles;
      });
  };

  // 수정 버튼 클릭시
  $scope.edit = function(){
    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    var data = {
      title : title,
      content : content
    };
    $http.post('/api/edit', data)
      .then(function(response){
        var articles = response.data;
        $scope.articles = articles;
      });
  };

});
