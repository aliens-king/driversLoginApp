/**
 * Created by Nikhil Mahajan on 18-Jan-16.
 */

(function () {

  'use strict';

  angular.module('scfsApp').factory('Session', Session);
  Session.$inject = ['$rootScope','$cookieStore'];
  function Session($rootScope,$cookieStore) {
    var session = {};
    session.Create = Create;
    session.Update = Update;
    session.Destroy = Destroy;
    session.CreateUser = CreateUser;
    session.UpdateCookies = UpdateCookies;


    //session.userId = null;
    session.token = null; // TODO make token null when cookieStore implemented
    //session.userRole = null;
    //session.selectedNavIcon = 'default';
    session.owners = [];
    session.units = [];
    session.userName = null;
    session.permission = [];
    session.dateDisplay = null;
    return session;

    function Create(response) {
      session.userId = response.city;
      session.token = response.token;
      //session.userRole = 'USER';// static role for now
      if(response.date_display=='MMM DD YYYY'){
        session.dateDisplay = "MMM dd yyyy";
      }
      else if(response.date_display=='DD MMM YYYY'){
        session.dateDisplay = "dd MMM yyyy";
      }
      //session.dateDisplay = response.date_display;
    }

    function Update(response) {
      session.userName = response.name;
      session.nickname = response.nickname;
      session.userType = response.usertype;
      session.permission = response.perms;
      session.userObject = response;

      if(response.date_display=='MMM DD YYYY'){
        session.dateDisplay = "MMM dd yyyy";
      }
      else if(response.date_display=='DD MMM YYYY'){
        session.dateDisplay = "dd MMM yyyy";
      }
      // session.dateDisplay = response.date_display;
    }

    function CreateUser(currentUser) {
      session.userId = currentUser.userId;
      session.token = currentUser.token;
     // session.userRole = 'USER';// static role for now
      session.userName = currentUser.userName;
      session.userType = currentUser.userType;
      session.permission = currentUser.permission;
      session.userObject = currentUser.userObj;
      session.dateDisplay = currentUser.dateDisplay;
      //debugger;
      if(session.dateDisplay=='MMM DD YYYY'){
        session.dateDisplay = "MMM dd yyyy";
      }
      else if(session.dateDisplay=='DD MMM YYYY'){
        session.dateDisplay = "dd MMM yyyy";
      }

    }


    function Destroy() {
      //debugger;
      session.userId = null;
      session.token = null;
      session.userRole = null;
      session.userName = null;
      session.nickname = null;
      session.userType = null;
      session.permission = null;
      session.userObject = null;
      session.dateDisplay = null;
    }

    function UpdateCookies(Session) {
      $rootScope.globals = $cookieStore.get('globals') || {};
      $rootScope.globals.currentUser.dateDisplay = Session.dateDisplay;
      $cookieStore.put('globals', $rootScope.globals);

    }
  }
})();
