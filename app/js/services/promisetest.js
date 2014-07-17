app.factory("messageService", function($q){
    return {
        getMessage: function(){
            return $q.when("Hello World!");
        }
    };
});