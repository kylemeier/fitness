"use strict";angular.module("fitness.services.login",["fitness.services.profileCreator"]).factory("loginService",["angularFireAuth","profileCreator","$location","$rootScope",function(e,t,n,r){return{login:function(t,r,i,s){var o=e.login("password",{email:t,password:r,rememberMe:!0});o.then(function(e){if(i){console.log("officially logged in");n.path(i)}s&&s(null,e)},s)},loginAnon:function(e,t){var r=new Firebase("https://fitnesskdm.firebaseIO.com"),i=new FirebaseSimpleLogin(r,function(e,t){}),s=i.login("anonymous",{rememberMe:!0});s.then(function(r){console.log("inside promise callback");if(e){console.log("redirecting");n.path(e)}t&&t(null,r)},t)},logout:function(t){console.log("logging out to "+t);n.path(t);e.logout()},createAccount:function(t,n,i){console.log(t,n);e._authClient.createUser(t,n,function(e,t){if(i){i(e,t);r.$apply()}})},createProfile:t}}]);