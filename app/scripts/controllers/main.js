'use strict';

/**
 * @ngdoc function
 * @name testAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testAppApp
 */




angular.module('gitAppApp')
  .controller('MainCtrl',['gitService','$q','NgTableParams', function (gitService,$q,NgTableParams) {
    var main = this;
    main.name = "";
    main.displayName = "https://github.com/"+main.name;
    main.repoName = "https://api.github.com/"+main.name;
    main.openIssuesStats = {};
      main.callService = function(){
          if(main.name !== ""){
        main.show = true;  
        main.displayName = "https://github.com/"+main.name;
        main.repoName = "https://api.github.com/"+main.name;
          $q.all([gitService.latestOpenIssue(main.repoName),gitService.openIssuesCount(main.repoName),gitService.oldestOpenIssue(main.repoName),gitService.avgAgeOfIssues(main.repoName)]).
          then(function(results){
                main.openIssuesStats.latestIssueDate = results[0];
                main.openIssuesStats.openIssuesCount = results[1];
                main.openIssuesStats.oldestIssueDate = results[2];
                main.openIssuesStats.avgAgeOfIssues = results[3].avgAge;
                main.show = false;  
                var data = results[3].openIssues;
                main.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10 // count per page
                }, { dataset: data});
          },function(error){
            main.show = false; 
            alert("This repository name is not correct. Try with repos/vmg/redcarpet");  
            console.log(error);
          });
          } else {
            alert("Please enter the name of the repository");
          }
      }
  }]);