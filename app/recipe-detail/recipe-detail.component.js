angular.module('recipeDetail').
    component('recipeDetail', {
        template: '<p>Detail view for <span>{{$ctrl.recipeId}}</span></p>',
        controller: ['$routeParams',
            function RecipeDetailController($routeParams) {
                this.recipeId = $routeParams.recipeId;
            }
        ]
    });