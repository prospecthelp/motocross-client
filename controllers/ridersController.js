angular.module('ridersController', ['ngResource', 'ui.router', 'messages'])

  .factory('ridersFactory', ['$resource', function($resource) {
    return $resource('https://motocross-server-api.herokuapp.com/api/teams/:teamId/riders/:id', {
      teamId: '@teamId',
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }])

  .controller('ridersNewController', ['ridersFactory', '$stateParams', '$state', 'flash', function(ridersFactory, $stateParams, $state, flash) {
    this.teamId = $stateParams.teamId;
    this.rider = new ridersFactory({teamId: $stateParams.teamId});
    let app = this;
    this.create = function() {
      this.rider.$save().then(function(message) {
        flash.setAlert(message);
        if (message.show) {
          $state.go('teamShow', {id: $stateParams.teamId});
        } else {
          app.rider = new ridersFactory({teamId: $stateParams.teamId});
          app.error = flash.getAlert();
          flash.resetAlert();
        }
      });
    }
  }])

  .controller('riderShowController', ['ridersFactory', '$stateParams', '$state', 'flash', function(ridersFactory, $stateParams, $state, flash) {
    this.teamId = $stateParams.teamId;
    this.rider = ridersFactory.get({teamId: $stateParams.teamId, id: $stateParams.id});
    this.success = flash.getAlert();
    flash.resetAlert();
    let app = this;
    this.destroy = function() {
      this.rider.$delete({teamId: $stateParams.teamId, id: $stateParams.id}).then(function(message) {
        flash.setAlert(message);
        if (message.show) {
          $state.go('teamShow', {id: $stateParams.teamId});
        } else {
          app.error = flash.getAlert();
          flash.resetAlert();
        }
      })
    }
  }])

  .controller('riderEditController', ['ridersFactory', '$stateParams', '$state', 'flash', function(ridersFactory, $stateParams, $state, flash) {
    this.teamId = $stateParams.teamId;
    this.rider = ridersFactory.get({teamId: $stateParams.teamId, id: $stateParams.id});
    let app = this;
    this.update = function() {
      this.rider.$update({teamId: $stateParams.teamId, id: $stateParams.id}).then(function(message) {
        flash.setAlert(message);
        if (message.show) {
          $state.go('riderShow', {teamId: $stateParams.teamId, id: $stateParams.id});
        } else {
          app.rider = ridersFactory.get({teamId: $stateParams.teamId, id: $stateParams.id});
          app.error = flash.getAlert();
          flash.resetAlert();
        }
      })
    }
  }])
