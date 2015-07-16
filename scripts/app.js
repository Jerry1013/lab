'use strict';

/*
*create sub modules(lab.manual,lab.labMaterials,lab.media,lab.directives,lab.services ,lab.filters.)
*for labApp module
*
*/
angular.module("lab.manual" ,['ui.router']);
angular.module("lab.labMaterials" , ['ui.router']);
angular.module("lab.media" ,['ui.router','ui.bootstrap']);
angular.module("lab.directives" , []);
angular.module("lab.services" , ["ngResource"]);
angular.module("lab.filters" , []);

//add all sub modules to labApp.
angular.module("labApp" ,["lab.manual" ,
                          "lab.labMaterials",
                          "lab.media",
                          "lab.services",
                          "lab.directives",
                          "lab.filters",
                          "ngAnimate"]);