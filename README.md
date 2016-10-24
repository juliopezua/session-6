#MEAN Session Six


##Sushi - cont.


###Componentize

`<script src="https://code.angularjs.org/1.5.8/angular.js"></script>`

Components take the template (html) and controller and unify them into a single item. They offer re-usability and allow the scope to be isolated thus avoiding potentially difficult bugs.

Create `app.module.js` in the app directory and link to it in `index.html`:

```
'use strict';

angular.module('recipeApp', []);
```

[Article on use strict](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)

This defines the `recipeApp` [module](https://docs.angularjs.org/guide/module).

Create `recipe-list.component.js` in a `recipe-list` directory and link it to index.html:
```
'use strict';

angular.module('recipeApp').component('recipeList', {
    template:
    `<h1>test</h1>`
});
```

Add the app.module and recipe-list.component to index.html:

```html

```

And add the component to the page:
```html
<article ng-app="recipeApp">
    <recipe-list></recipe-list>
</article>
```

You should see the template defined in the controller appear.

Add the controller to `recipe-list.component.js`:
```js
angular.module('recipeApp').component('recipeList', {
    template:
    `<h1>test</h1>`,
    controller: function RecipeListController() {

    }
});
```
Add the data to the controller from data/recipe.json:
```js
angular.module('recipeApp').component('recipeList', {
  template:
    `<h1>test</h1>`,
  controller: function RecipeListController() {
    this.recipes = [
        {
            name: 'recipe1309',
            title: 'Lasagna',
            date: '2013-09-01',
            description: 'Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.',
            image: 'lasagne.png'
        },
        {
            name: 'recipe1404',
            title: 'Pho-Chicken Noodle Soup',
            date: '2014-04-15',
            description: 'Pho (pronounced “fuh”) is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.',
            image: 'pho.png'
        },
        {
            name: 'recipe1210',
            title: 'Guacamole',
            date: '2012-10-01',
            description: 'Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor – with this authentic Mexican guacamole recipe, though, you will be an expert in no time.',
            image: 'guacamole.png'
        },
        {
            name: 'recipe1810',
            title: 'Hamburger',
            date: '2012-10-20',
            description: 'A Hamburger (or often called as burger) is a type of food in the form of a rounded bread sliced in half and its Center is filled with patty which is usually taken from the meat, then the vegetables be lettuce, tomatoes and onions.',
            image: 'hamburger.png'
        }
    ];
}
});

```

Create the template. Again - note the use of back ticks.

```html
template:
`
<ul>
    <li ng-repeat="recipe in $ctrl.recipes">
        <img ng-src="img/home/{{ recipe.image }}">
        <h1><a href="#0">{{ recipe.title }}</a></h1>
        <p>{{ recipe.description }}</p>
    </li>
</ul>
`,
```

Convert the template into an external file:

```js
templateUrl: 'recipe-list/recipe-list.template.html',
```
Note the use of templateUrl and that this link it relative to index.html

###Styling the Recipes

* create a new `_recipes.scss` file
* add it to the imports in `styles.scss
* add a class to the ul `<ul class="recipes-list">`
```css
.p-home article {
    margin-left: 1rem;
}
.recipes-list {
    display: flex;
    flex-wrap: wrap;
    li {
        box-sizing: border-box;
        background: rgba(240,223,180,0.25);
        padding: 0.875rem;
        flex: 1 0 100%;
        margin-top: 0.875rem;
        margin-right: 0.875rem;
        @media (min-width: $break-one){
            flex: 1 0 calc(50% - 0.875rem);
        }
    }
    img {
        width: 30%;
        float: left;
        margin-right: 0.875rem;
        @media (min-width: $break-one){
            width: 50%;
        }
    }
}

a {
    color: $reddish;
}
```


###File Organization

Refactor our codebase and move files in order to make our application more easily expandable and maintainable.

* `recipe-list/recipe-list.module.js` - a new file that declares a module
```
'use strict';

angular.module('recipeList', []);
```

* `app.module.js` - add recipeList as a requirement
```
'use strict';

angular.module('recipeApp', [
    'recipeList'
]);
```

* `recipe-list/recipe-list.component.js` - unchanged!
```
'use strict';
        
angular.module('recipeApp').component('recipeList', {
```
Be sure to include references to each in `index.html`:

```html
<script src="app.module.js"></script>
<script src="recipe-list/recipe-list.module.js"></script>
<script src="recipe-list/recipe-list.component.js"></script>
```

###Search / Sort Filter

Add a search input field to the top of `recipe-list.template.html`. Note the use of [ng-model](https://docs.angularjs.org/api/ng/directive/ngModel):

```
<p>
  Search: <input ng-model="$ctrl.query" />
</p>
```

Add a filter to the ng-repeat directive:

`<li ng-repeat="recipe in $ctrl.recipes | filter:$ctrl.query">`

Data-binding is one of the core features in Angular. When the page loads, Angular binds the value of the input box to the data model variable specified with ngModel and keeps the two in sync.

The data that a user types into the input box (bound to $ctrl.query) is immediately available as a filter input in the list repeater (`recipe in $ctrl.recipes | filter:$ctrl.query`). When changes to the data model cause the repeater's input to change, the repeater updates the DOM to reflect the current state of the model.

The [filter](https://docs.angularjs.org/api/ng/filter/filter) function uses the `$ctrl.query` value to create a new array that contains only those records that match the query.

###Two Way Data Binding

Add a `<select>` element bound to `$ctrl.orderProp` to the top paragraph, so that our users can pick from the two provided sorting options.

```
  Sort by:
  <select ng-model="$ctrl.orderProp">
    <option value="title">Alphabetical</option>
    <option value="date">Newest</option>
  </select>
```
Note the values - these are from the json.

Chained the filter filter with the orderBy filter to further process the input for the repeater. 

[`orderBy`](https://docs.angularjs.org/api/ng/filter/orderBy) is a filter that takes an input array, copies it and reorders the copy which is then returned.

`<li ng-repeat="recipe in $ctrl.recipes | filter:$ctrl.query | orderBy:$ctrl.orderProp">`

Add a line to the controller in `recipe-list.component.js` after the recipes array that sets the default value of orderProp to age. If we had not set a default value here, the orderBy filter would remain uninitialized until the user picked an option from the drop-down menu.

`this.orderProp = 'date';`



###Fetching the Data

Here we use `recipes.json` in the data folder instead of keeping the model in the controller. 

We fetch the dataset from our server using one of Angular's built-in services called [$http](https://docs.angularjs.org/api/ng/service/$http). We will use Angular's [dependency injection (DI)](https://docs.angularjs.org/guide/di) to provide the service to the recipeList component's controller.

$http
* a service
* built into core Angular
* need to make it available to our controller via dependency injection.

In `recipe-list.component.js` make $http available to the controller:

`controller: function RecipeListController($http) { `

Create var `self` - since we are making the assignment of the recipes property in a callback function (`.then(function (response) {}`), where the `this` value is not defined, we introduce a local variable called self that points back to the RecipeListController.

```js
controller: function RecipeListController($http) {
    var self = this;
```

Change the orderProp statement to refer to self:

```js
self.orderProp = 'date';
```

Use `get` method of `$http` to fetch the json from the data folder:

```js
$http.get('data/recipes.json').then(function (response) {
    self.recipes = response.data;
});
```

* `then` is a promise which runs the following function when the data is received (the `response`):
* since we want the `response.data` to belong to the RecipeListController function we assign it to `self.recipes`

Here is the complete component:

```
angular.module('recipeApp').component('recipeList', {
    templateUrl: 'recipe-list/recipe-list.template.html',

    controller: function RecipeListController($http) {
        var self = this;
        self.orderProp = 'date';

        $http.get('data/recipes.json').then(function (response) {
            self.recipes = response.data;
        });
    }
});
```



###Adding Routing to Display Individual Recipes

Note the additionof recipe1309.json to the data directory. 

Use the `recipe.name` expression in the html template:

`<h1><a href="#recipes/{{ recipe.name }} ">{{ recipe.title }}</a></h1>`


Add ngRoute to index.html after the main angular load:

`<script src="https://code.angularjs.org/1.5.8/angular-route.js"></script>`


We need to add `ngRoute` as a dependency for our app-module.js:

```
'use strict';

angular.module('recipeApp', [
    'ngRoute',
    'recipeList'
]);
```

Create an app.config file in the app folder:
```js
angular.module('recipeApp').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.
                when('/', {
                    template: '<recipe-list></recipe-list>'
                }).
                otherwise('/recipes');
        }
    ]);
```

Add a link to `app.config.js` to index.html (after the app.module.js):

`<script src="app.config.js"></script>`


Edit index.html:
```html
<article ng-app="recipeApp">
    <div ng-view></div>
</article>
```

Create stubs for recipe details in a new `recipe-detail` directory:

`recipe-detail.module.js`

```
angular.module('recipeDetail', [
    'ngRoute'
]);
```

recipe-detail.component.js
```
angular.
    module('recipeDetail').
    component('recipeDetail', {
        template: '<p>Detail view for <span>{{$ctrl.recipeId}}</span></p>',
        controller: ['$routeParams',
            function RecipeDetailController($routeParams) {
                this.recipeId = $routeParams.recipeId;
            }
        ]
    });
```

Add `recipeDetail` as a dependency to our application in `app.module.js`:

```
angular.module('recipeApp', [
    'ngRoute',
    'recipeDetail',
    'recipeList'
]);
```

Edit the config file to create the routing for URL parameters:

```
angular.
    module('recipeApp').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.
                when('/', {
                    template: '<recipe-list></recipe-list>'
                }).
                when('/recipes/:recipeId', {
                    template: '<recipe-detail></recipe-detail>'
                }).
                otherwise('/recipes');
        }
    ]);
```

Alter the recipe-template to include the ! bang:
```
<h1><a href="#!recipes/{{ recipe.name }} ">{{ recipe.title }}</a></h1>
```

```


Link to recipe-detail files:

```
<head>
    <meta charset="UTF-8">
    <title>Brooklyn Eats: Matsu</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.angularjs.org/1.5.8/angular.js"></script>
    <script src="https://code.angularjs.org/1.5.8/angular-route.js"></script>
    <script src="app.module.js"></script>
    <script src="app.config.js"></script>
    <script src="recipe-list/recipe-list.module.js"></script>
    <script src="recipe-list/recipe-list.component.js"></script>
    <script src="recipe-detail/recipe-detail.module.js"></script>
    <script src="recipe-detail/recipe-detail.component.js"></script>
    <link rel="stylesheet" type="text/css" href="css/styles.css">
</head>
```



###Building JSON and the Detail Template

`data/recipe1309.json`:

```js
{
  "name": "recipe1309", 
  "title": "Lasagna", 
  "date": "2013-09-01", 
  "description": "Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.", 
  "mainImageUrl": "img/home/lasagna-1.png",
  "images": ["lasagna-1.png","lasagna-2.png","lasagna-3.png","lasagna-4.png"],

  "ingredients": ["lasagna pasta", "tomatoes", "onions", "ground beef", "garlic", "cheese"]
}
```

Create `recipe-detail/recipe-detail.template.html`

```html
<div itemscope itemtype="http://schema.org/Recipe">

    <h2>{{ $ctrl.recipe.title }}</h2>

    <p>{{ $ctrl.recipe.description }}</p>

    <h3>Ingredients</h3>
    <ul class="ingredients">
        <li ng-repeat="ingredient in $ctrl.recipe.ingredients">
            {{ ingredient }}
        </li>
    </ul>

</div>
```

Edit `recipe-detail/recipe-detail.component.js`

```js
angular.
    module('recipeDetail').
    component('recipeDetail', {
        templateUrl: 'recipe-detail/recipe-detail.template.html',
        controller: ['$http', '$routeParams',
            function RecipeDetailController($http, $routeParams) {
                var self = this;

                $http.get('data/' + $routeParams.recipeId +  '.json').then(function(response){
                    self.recipe = response.data;
                });
            }
        ]
    });
```

##Adding an Image Swapper

Set the html template for the detail view to show one main image using this portion of the json:
`"mainImageUrl": "img/home/lasagna-1.png",`

To get the image to display we could add:

`<img ng-src="{{ $ctrl.recipe.mainImageUrl }}" />`

But we are creating an image switcher so we will create a new function in the component:


```
self.setImage = function setImage(imageUrl) {
      self.mainImageUrl = imageUrl;
};
```

Followed by a call to the function in the promise function:

`self.setImage(self.recipe.images[0]);`

And make the following change to the template:

`<img ng-src="img/home/{{$ctrl.mainImageUrl}}" class="recipe-detail-image" />`

We don't need `"mainImageUrl": "img/home/lasagna-1.png",` in the json since we are refering to the images array.

###SASS

Remove the img float sass from `_basics.scss`

Add sass to `_recipes.scss` to control the display of the main image:

```css
.recipe-detail-image {
    width: 100%;
}
.recipe-thumbs {
    width: 100%;
    margin: 1rem 0;
    display: flex;
    img {
        width: 100%;
        padding: 0 0.5rem;
    }
}

```

```
<ul class="recipe-thumbs">
    <li ng-repeat="img in $ctrl.recipe.images">
    <img ng-src="img/home/{{img}}" ng-click="$ctrl.setImage(img)" />
    </li>
</ul>
```




##Homework

1. 


##Reading

Dickey - Write Modern Web Apps with the MEAN Stack: Mongo, Express, AngularJS and Node.js, chapter 4. Please attempt to implement his sample app on your computer. Here's his [Github repo with sample code](https://github.com/dickeyxxx/mean-sample). Be sure to look at the branches (they correspond to chapter numbers) and don't forget to run `sudo npm install` when running the sample code.



NOTES




