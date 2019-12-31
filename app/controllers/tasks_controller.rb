class TasksController < ApplicationController
  def index
    @user = User.find(cookies[:user_id])
    @tasks = Task.where(user_id: cookies[:user_id])
  end

  def show
    @task = Task.find_by(user_id: cookies[:user_id], id: params[:id])
  end

  def edit
    @task = Task.find_by(user_id: cookies[:user_id], id: params[:id])
  end

  def create
    @task = Task.new(task_params)

    if cookies[:user_id]
      # Write to db with user_id
      @task.user_id = cookies[:user_id]
      @task.is_complete = false
      if @task.save
        flash[:notice] = "Saved!"
      else
        flash[:notice] = "Sth went wrong."
      end
    else
      # Write to sessions[:tasks]
      session[:tasks] ||= []
      session[:tasks] << @task
    end

      redirect_to root_url
  end

  def update
    @task = Task.find_by(user_id: cookies[:user_id], id: params[:id])

    if @task.update(task_params)
      redirect_to @task
    else
      render 'edit'
    end
  end

  def destroy
    @task = Task.find_by(user_id: cookies[:user_id], id: params[:id])
    @task.destroy

    redirect_to tasks_path
  end

  private
    def task_params
      params.permit(:task_name, :due_date, :task_desc)
    end
end
