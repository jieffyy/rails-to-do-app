class TagsController < ApplicationController
  before_action :require_cookies_id

  # Routes from Show/Edit -> Tag Button
  def create
    @task = Task.find(params[:task_id])
    @tag = Tag.find_by(tag_name: params[:tag_name])

    if @tag
      push_to_task(@task, @tag)
      redirect_to task_path(@task)
    else
      @task.tags.create(tag_params)
      redirect_to task_path(@task)
    end
  end

  def update
  end

  # Routes from Show/Edit -> Delete Button
  #        from Main -> TaskIndex -> Delete 
  def destroy
    @task = Task.find(params[:task_id])
    @tag = @task.tags.find_by(tag_name: params[:tag_name])
    @task.tags.delete(@tag)
  end

  private
    def tag_params
      params.require(:tag).permit(:tag_name)
    end

    def require_cookies_id
      if !cookies[:user_id]
        flash[:notice] = "Not authorised."
        redirect_to root_url
      end
    end
end
