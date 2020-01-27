class TasksController < ApplicationController
  require 'securerandom'

  def index
    puts cookies['user_id']
    user_id = cookies['user_id']
    user = {}
    
    if user_id
      found_user = User.find(user_id)
      if !found_user.is_guest
        user['username'] = found_user.username
        user['is_admin'] = found_user.is_admin
        @tasks = found_user.tasks

        render json: {user: user, tasks: @tasks}
        return
      end
    end
  end

  def show
    task = Task.find(params[:id])
    task_rv = task.as_json
    task_rv.delete("created_at")
    task_rv.delete("updated_at")
    task_rv.delete("user_id")
    render json: task_rv
  end

  def create
    user_id = get_user()
    rv = {}
    
    if user_id
      user = User.find(user_id)
    else
      user = User.create!(username: SecureRandom.uuid, is_admin: false, is_guest: true, password: 'guest_password')
      cookies['user_id'] = user.id
    end
    
    task = Task.create(task_name: params[:task_name], task_desc: params[:task_desc], 
        due_date: params[:due_date], due_time: params[:due_time], is_complete: false, user_id: user.id)
    if task.save
      rv = task.as_json
      rv.delete('created_at')
      rv.delete('updated_at')
    else
      rv['error'] = "Error in saving the task"
    end

    render json: rv
  end

  def update
    @task = Task.find(params[:id])
    if !@task.update(params.require(:task).permit(:task_name, :task_desc,
            :due_date, :due_time, :is_complete))
      render json: {error: "Couldn't update task."}
      return
    else
      render json: {id: @task.id}
    end
  end

  def destroy
    @task = Task.find(params[:id])
    if !@task.destroy
      render json: {error: "Couldn't delete task"}
    else
      render json: {id: @task.id}
    end
  end

  def toggle_complete
    task = Task.find(params[:id])
    if task.update(is_complete: !task.is_complete)
      render json: {id: task.id}
      return
    else
      render json: {error: "Couldn't find the task!"}
      return
    end
  end

end