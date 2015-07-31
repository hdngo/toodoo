class TasksController < ApplicationController
	def index
		# @tasks = Task.order(:id)
		render json: Task.order(created_at: :desc)
	end

	def new
		@task = Task.new
	end

	# def create 
	# 	task = Task.new(task_params)
	# 	@tasks = Task.all
	# 	if task.save
	# 		render 'index'
	# 	else
	# 		render 'new'
	# 	end
	# end

	def create
    task = Task.new(task_params)
    if task.save
      render json: task, status: :created
    else
      render_errors(task)
    end
  end

	def edit
		@task = Task.find(params[:id])
	end

	# def update
	# 	task = Task.find(params[:id])
	# 	task.update(task_params)
	# 	redirect_to tasks_path
	# end
	def update
    task = Task.find(params[:id])
    if task.update(task_params)
      render json: task
    else
      render_errors(task)
    end
  end

	# def destroy
	# 	task = Task.find(params[:id])
	# 	task.destroy
	# 	# render 'index'
	# 	redirect_to tasks_path
	# end
	def destroy
    task = Task.find(params[:id])
    if task.destroy
      render json: task
    else
      render_errors(task)
    end
  end
	
	def complete
		task = Task.find(params[:task_id])
		if task.completed == true
			task.update_attributes(completed: false)
		else
			task.update_attributes(completed: true)
		end
		# render 'index'
		redirect_to tasks_path
	end


	private 
		def task_params
			params.require(:task).permit(:description, :completed)
		end

		def render_errors(task)
    render json: {
      error: task.errors.full_messages.join(', ')
    }, status: :bad_request
  	end
end

