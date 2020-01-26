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

end