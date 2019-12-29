class TasksController < ApplicationController
  def index
    @user = User.find(cookies[:user_id])
    @tasks = Task.where(:user_id => cookies[:user_id])
  end

  def show
    @task = Task.find_by(user_id: cookies[:user_id], id: params[:id])
  end

  def new
    @task = Task.new
  end

  def edit
    @task = Task.find_by(user_id: cookies[:user_id], id: params[:id])
  end

  def create
    @task = Task.new(task_params)
    @task.user_id = cookies[:user_id]

    if @task.save
      redirect_to @task
    else
      render 'new'
    end
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
      params.require(:task).permit(:task_name, :task_desc, :due_date, :is_complete)
    end
end
