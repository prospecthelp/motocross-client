angular.module('routes', ['ui.router', 'teamsController', 'ridersController'])

  .config(['$stateProvider', function($stateProvider) {
    $stateProvider

    .state('root', {
      url: '/',
      templateUrl: 'views/teams-index.html',
      controller: 'teamsIndexController',
      controllerAs: 'vm'
    })

    .state('teamsIndex', {
      url: '/teams',
      templateUrl: 'views/teams-index.html',
      controller: 'teamsIndexController',
      controllerAs: 'vm'
    })

    .state('teamsNew', {
      url: '/teams/new',
      templateUrl: 'views/teams-new.html',
      controller: 'teamsNewController',
      controllerAs: 'vm'
    })

    .state('teamShow', {
      url: '/teams/:id',
      templateUrl: 'views/team-show.html',
      controller: 'teamShowController',
      controllerAs: 'vm'
    })

    .state('teamEdit', {
      url: '/teams/:id/edit',
      templateUrl: 'views/team-edit.html',
      controller: 'teamEditController',
      controllerAs: 'vm'
    })

    .state('ridersNew', {
      url: '/teams/:teamId/riders/new',
      templateUrl: 'views/riders-new.html',
      controller: 'ridersNewController',
      controllerAs: 'vm'
    })

    .state('riderShow', {
      url: '/teams/:teamId/riders/:id',
      templateUrl: 'views/rider-show.html',
      controller: 'riderShowController',
      controllerAs: 'vm'
    })

    .state('riderEdit', {
      url: '/teams/:teamId/riders/:id/edit',
      templateUrl: 'views/rider-edit.html',
      controller: 'riderEditController',
      controllerAs: 'vm'
    })

    .state('noRoute', {
      url: '*path',
      templateUrl: 'views/teams-index.html',
      controller: 'teamsIndexController',
      controllerAs: 'vm'
    })
  }])
