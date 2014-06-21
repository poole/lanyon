angular.module('searchApp', [], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})
.filter('matchesQuery', function() {
    return function(items, query){
        var alternate = query.replace(/ /g,"_").toLowerCase();
        var lcQuery = query.toLowerCase();
        var matches = [];
        for (var i=0; i < items.length; i++){
            var matchesStrictly = items[i].title.toLowerCase().indexOf(lcQuery) !== -1;
            var matchesLoosely = items[i].content.indexOf(alternate) !== -1;
            if (matchesStrictly || matchesLoosely) {
                matches.push(items[i]);
            }
        }
        return matches;
    };
});

function PostListCtrl($scope, $http) {
    $scope.query = "";
    $scope.posts = [];
    $http.get('/search/feeds.json').success(function(data) {
        $scope.posts = data;
    });
}
