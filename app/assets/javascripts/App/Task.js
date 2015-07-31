App.Task = function(attributes){
  this.setAttributes(attributes);
};

App.Task.prototype.setAttributes = function(attributes){
  $.extend(this, attributes)
  return this;
};

App.Task.prototype.attributes = function(){
  return {
    id:          this.id,
    description: this.description,
    completed:   this.completed,
    created_at:  this.created_at,
    updated_at:  this.updated_at,
  };
};

App.Task.create = function(attributes){
  var params = {task: attributes};
  return App.request('post', '/tasks', params).then(function(attributes){
    return new App.Task(attributes);
  });
};

App.Task.prototype.save = function(){
  var promise,
    task = this,
    attributes = {task: task.attributes()};
  if (task.id){
    promise = App.request('put', '/tasks/'+task.id, attributes)
  }else{
    promise = App.request('post', '/tasks', attributes)
  };

  return promise.then(function(attributes){
    return task.setAttributes(attributes)
  });
};

App.Task.prototype.complete = function(){
  var task = this
  return App.request('post', '/tasks/'+this.id+'/completed').then(function(attributes){
    task.completed = true
    task;
  });
};


App.Task.prototype.remove = function(){
  return App.request('delete', '/tasks/'+this.id);
};

App.Task.all = function(){
  return App.request('get', '/tasks').then(function(tasks){
    return tasks.map(function(attributes){
      return new App.Task(attributes);
    });
  });
};

