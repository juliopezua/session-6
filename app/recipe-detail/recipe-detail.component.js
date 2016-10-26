angular.module('recipeDetail').component('recipeDetail', {
    templateUrl: 'recipe-detail/recipe-detail.template.html',
    controller: ['$http', '$routeParams',
        function RecipeDetailController($http, $routeParams) {
            var self = this;

            $http.get('data/' + $routeParams.recipeId + '.json').then(function (response) {
                self.recipe = response.data;
            });
        }
    ]
});