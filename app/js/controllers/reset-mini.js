app.controller("ResetCtrl",["$rootScope","$scope","$routeParams","Auth",function(e,t,n,r){t.user={email:"",newPassword:""};t.update=function(){if(t.user.newPassword===t.passConfirm){t.user.password=n.temp;t.login();t.changePassword()}else t.message="Passwords don't match"};t.login=function(){r.login(t.user).then(function(t){e.userID=t.uid},function(e){t.passReset=0;switch(e.code){case"INVALID_EMAIL":t.message="Oops! Double-check that email address.";break;case"INVALID_USER":t.message="Oops! We can't find that email in our system.";break;case"INVALID_PASSWORD":t.passReset=1;t.message="We couldn't verify your information. Try clicking the link in your email again.";break;default:t.message=e.toString()}})};t.changePassword=function(){r.changePassword(t.user).then(function(t){e.slideView("view-slide-left","/groups")},function(e){t.message=e.toString()})}}]);