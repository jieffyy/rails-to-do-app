require 'securerandom'

class TasksController < ApplicationController
  # Routes from: Main -> TaskIndex -> Show
  def show
    task = Task.find_by(user_id: cookies[:user_id], id: params[:id])
    @task = task.as_json
    @task[:tags] = []
    task.tags.each do |t|
      @task[:tags] << t.tag_name
    end
  end

  # Routes from: Main -> TaskIndex -> Edit
  def edit
    task = Task.find_by(user_id: cookies[:user_id], id: params[:id])
    @task = task.as_json
    @task[:tags] = []
    task.tags.each do |t|
      @task[:tags] << t.tag_name
    end
  end

  # Routes from Main -> TaskForm -> New Task
  def create
    tags_xs = params[:tags]
    params.delete(:tags)
    params.delete(:task)

    # Write to db if logged in, if not 
    # if it is the first task, create a new user with a username generated randomly
    if !cookies[:user_id]
      username = SecureRandom.uuid
      @user = User.create!(username: username, is_admin: false)
      cookies[:user_id] = @user.id
      cookies[:is_guest] = true
    else
      @user = User.find(cookies[:user_id])
    end

    @task = Task.new(params.permit(:task_name, :due_date, :task_desc))
    @task.user_id = cookies[:user_id]
    @task.is_complete = false
    if @task.save
      flash[:notice] = "Saved!"
      tags_xs.each do |tag_name|
        @tag = save_tag(tag_name)
        @task.tags << @tag
      end
    else
      flash[:notice] = "Sth went wrong."
    end
 
  end

  # Routes from TaskForm -> Update Task (which is from tasks#edit's render)
  def update
    tags_xs = params[:tags]
    params.delete(:tags)
    params.delete(:task)

    @task = Task.find_by(user_id: cookies[:user_id], id: params[:id])    
    tags_xs.each do |tag_name|
      @tag = save_tag(tag_name)
      @task.tags << @tag
    end

    params.delete(:id)
    if @task.update(params.permit(:task_name, :task_desc, :due_date, :is_complete))
      flash[:notice] = "Task Updated"
    else
      render 'edit'
    end
  end

  # Routes from: Main -> TaskIndex -> Delete
  def destroy
    @task = Task.find_by(user_id: cookies[:user_id], id: params[:id])
    if @task.destroy
      flash[:notice] = "Task Deleted"
    end
  end

  private
    # Helper method to save tags
    def save_tag(tag_name)
      @tag = Tag.find_by(:tag_name => tag_name)
      if !@tag
        Tag.create(:tag_name => tag_name)
        @tag = Tag.find_by(:tag_name => tag_name)
      end 
      return @tag
    end
end
