App.TasksListView = function(){
  this.node = $('<div>').addClass('task-list');
  this.tasks = null;
  this.refresh();
};

App.TasksListView.prototype.refresh = function(){
  var view = this;
  App.Task.all().then(function(tasks){
    view.tasks = tasks
    view.render();
  });
};

App.TasksListView.prototype.render = function(){
  console.info('TasksListView render', this);

  this.node.html('');

  this.node.append(this.renderNewTaskForm())

  if (this.tasks){
    if (this.tasks.length === 0){
      this.node.text('no tasks');
    }else{
      var nodes = this.tasks.map(this.renderTask.bind(this));
      this.node.append(nodes);
    }
  }else{
    this.node.text('Loading…')
  }
  $('body').append(this.node);
}

App.TasksListView.prototype.renderNewTaskForm = function(){
  var view = this;
  var form = $.tmpl(App.TasksListView.NewTaskFormTemplate);
  form.on('submit', function(event){
    event.preventDefault()
    var description = $(this).find('input[name="task[description]"]').val()
    App.Task.create({description: description}).then(function(task){
      view.tasks.unshift(task)
      view.render();
    });
  });
  return form;
};

App.TasksListView.prototype.renderTask = function(task){
  var view = this;
  var domNode = $.tmpl(App.TasksListView.TaskTemplate, task);

  domNode.find('.task-remove-link').on('click', function(event){
    event.preventDefault();
    task.remove().then(function(){
      view.refresh();
    });
  });

  return domNode;
};

App.TasksListView.TaskTemplate = $('[data-template="task"]').text();
App.TasksListView.NewTaskFormTemplate = $('[data-template="new-task-form"]').text();





