//= require_self
//= require_tree ./App

App = {}

App.request = function(method, path, params){

  return new Promise(function(resolve, reject){

    var request = $.ajax({
      method: method,
      url: path,
      data: params,
      dataType: 'json',
    });
    request.done(function(responseJSON){
      resolve(responseJSON);
    });
    request.fail(function(xhr){
      reject(xhr);
    });

  });
};


App.init = function(){
  this.tasksListView = new App.TasksListView()
  this.tasksListView.render();
};

$(function(){
  App.init();
});