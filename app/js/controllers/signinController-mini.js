"use strict";angular.module("fitness.controllers.signin",["fitness.services.login"]).controller("SigninCtrl",["$rootScope","$scope","loginService","$location",function(e,t,n,r){t.url=r.path();t.$on("angularFireAuth:login",function(){console.log("logged in as:"+t.email);e.userID=t.auth.uid;console.log("userID "+e.userID)});t.email=null;t.pass=null;t.name=null;t.login=function(e){t.err=null;n.login(t.email,t.pass,"/groups",function(n,r){t.passReset=0;if(n!==null)switch(n.code){case"INVALID_EMAIL":t.err="Oops! Double-check that email address.";break;case"INVALID_USER":t.err="Oops! We can't find that email in our system.";break;case"INVALID_PASSWORD":t.passReset=1;break;default:t.err=n.code}typeof e=="function"&&e(n,r)})};t.loginAnon=function(e){console.log("attempting to log in anon");n.loginAnon("/groups",function(t,n){console.log("in controller call back");console.log(t);typeof e=="function"&&e(t,n)})}}]);