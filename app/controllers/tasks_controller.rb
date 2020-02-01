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
        
        task_list = []
        found_user.tasks.each do |tr|
          task_list << simplify_task(tr)
        end

        render json: {user: user, tasks: task_list}
        return
      end
    end
  end

  def show
    task = Task.find(params[:id])
  
    render json: simplify_task(task)
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
      params[:tags].each do |tag_name|
        t = Tag.find_or_create_by(tag_name: tag_name)
        task.tags << t
      end
      rv = simplify_task(task)
    else
      rv['error'] = "Error in saving the task"
    end

  
    render json: rv
  end

  def update
    @task = Task.find(params[:id])
    
    if @task.update(params.require(:task).permit(:task_name, :task_desc,
      :due_date, :due_time, :is_complete))

      params[:tags].each do |tag_name|
        tag = Tag.find_or_create_by(tag_name: tag_name)
        @task.tags.push(tag) unless @task.tags.include?(tag)
      end

      render json: {id: @task.id}
    else
      render json: {error: "Couldn't update task."}
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

  private

    def simplify_task(task_record)
      task = task_record.as_json
      task.delete("user_id")
      task.delete("created_at")
      task.delete("updated_at")
      task["tags"] = task_record.tags.map{ |t| t.tag_name }
      return task
    end

end