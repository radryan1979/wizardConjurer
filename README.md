# ng-Conjurer: An Angular Wizard Control

## Topics

  1. [About] (#about)
  1. [Using ng-Conjurer] (#using)
  1. [Custom Directives] (#directives)
  1. [Serivce API Details] (#service)
  1. [Future Plans] (#future)

## About

## Using ng-Conjurer

Once you have acquire the source code of ng-Conjurer, add the scripts to your html.
```html
<html ng-app="app">
...
<script src="../src/conjurer.module.js"></script>
<script src="../src/conjurer.service.js"></script>
<script src="../src/conjurer.directive.js"></script>
...
</html>
```
To add the directive to your html document:
````html
<wizard-control wizard-name="myWizard">
  ...
  Place your custom directives here.
  ...
</wizard-control>
```
The only attribute the wizard-control directive has is the wizard-name attribute and it is required. This provides a unique named instance that is used when communicating between the directives and conjurer service.


## Custom Directives

## Service API Details

## Future Plans
