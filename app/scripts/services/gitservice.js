'use strict';

/**
 * @ngdoc service
 * @name testAppApp.gitService
 * @description
 * # gitService
 * Service in the testAppApp.
 */
angular.module('gitAppApp')
  .service('gitService',['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var service = this;

    service.openIssuesCount = function (repoName) {
      return $http.get(repoName)
        .then(function(response){
          return response.data.open_issues_count;
      });
    };

    service.latestOpenIssue = function (repoName) {
      return $http.get(repoName+'/issues?sort')
        .then(function(response){
          console.log(response.data[0].created_at);
          return response.data[0].created_at;
        });
    };

    service.oldestOpenIssue = function (repoName) {
      return $http.get(repoName+'/issues?sort&direction=asc')
        .then(function(response){
          console.log(response.data[0].created_at);
          return response.data[0].created_at;
        });
    };

    service.avgAgeOfIssues = function (repoName) { //it needs improvement
      return $http.get(repoName+'/issues?page=1&per_page=100')
        .then(function(response){
          var oneDay = 24*60*60*1000;
          var curDate = new Date();
          var createdDate;
          var diffDays = 0;
          for(var index in response.data){
            createdDate = new Date(response.data[index].created_at);
            diffDays+= Math.round(Math.abs((createdDate.getTime() - curDate.getTime())/oneDay));
          }
          var avgAge = Math.round(diffDays/response.data.length);
          return {'openIssues':response.data,'avgAge':avgAge};
        });
    };

  }]);