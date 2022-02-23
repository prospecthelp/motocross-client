angular.module('teamsController', ['ngResource', 'ui.router', 'messages'])

  .factory('teamsFactory', ['$resource', function($resource) {
    return $resource('https://motocross-server-api.herokuapp.com/api/teams/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }])

  .controller('teamsIndexController', ['teamsFactory', 'flash', function(teamsFactory, flash) {
    this.teams = teamsFactory.query();
    this.success = flash.getAlert();
    flash.resetAlert();
  }])

  .controller('teamsNewController', ['teamsFactory', '$state', 'flash', function(teamsFactory, $state, flash) {
    this.team = new teamsFactory();
    let app = this;
    this.create = function() {
      this.team.$save().then(function(message) {
        flash.setAlert(message);
        if (message.show) {
          $state.go('teamsIndex');
        } else {
          app.error = flash.getAlert();
          flash.resetAlert();
        }
      })
    }
  }])

  .controller('teamShowController', ['teamsFactory', '$stateParams', '$state', 'flash', function(teamsFactory, $stateParams, $state, flash) {
    this.team = teamsFactory.get({id: $stateParams.id});
    let app = this;
    this.success = flash.getAlert();
    flash.resetAlert();
    this.destroy = function() {
      this.team.$delete({id: $stateParams.id}).then(function(message) {
        flash.setAlert(message);
        if (message.show) {
          $state.go('teamsIndex');
        } else {
          app.error = flash.getAlert();
          flash.resetAlert();
        }
      })
    }
  }])

  .controller('teamEditController', ['teamsFactory', '$stateParams', '$state', 'flash', function(teamsFactory, $stateParams, $state, flash) {
    this.team = teamsFactory.get({id: $stateParams.id});
    let app = this;
    this.update = function() {
      this.team.$update({id: $stateParams.id}).then(function(message) {
        flash.setAlert(message);
        if (message.show) {
          $state.go('teamShow', {id: $stateParams.id});
        } else {
          app.team = teamsFactory.get({id: $stateParams.id});
          app.error = flash.getAlert();
          flash.resetAlert();
        }
      })
    }
  }])
