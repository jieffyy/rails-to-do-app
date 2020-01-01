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
    tags_xs = JSON.parse(params[:tags_arr])
    params.delete(:tags_arr)
    params.delete(:authenticity_token)  

    # Write to db if logged in, if not write to sessions[:tasks]
    @task = Task.new(task_params)
    if cookies[:user_id]
      @task.user_id = cookies[:user_id]
      @task.is_complete = false
      if @task.save
        flash[:notice] = "Saved!"
        tags_xs.each do |tag_name|
          @tag = _save_tag(tag_name)
          @task.tags << @tag
        end
      else
        flash[:notice] = "Sth went wrong."
      end
    else
      session[:tasks] ||= {}
      @task["id"] = session[:tasks].length + 1
      session[:tasks][@task.attributes.to_json] = tags_xs
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
    if cookies[:user_id]
      @task = Task.find_by(user_id: cookies[:user_id], id: params[:id])
      if @task
        if @task.destroy
          flash[:notice] = "Task deleted"
        else
          flash[:notice] = "Couldn't delete this task"
        end
      else
        flash[:notice] = "Task Not Found"
      end
    else
      session[:tasks].delete(:task_id)
    end
  end

  private
    def task_params
      params.permit(:task_name, :due_date, :task_desc)
    end
end
