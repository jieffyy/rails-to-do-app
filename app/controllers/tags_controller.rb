class TagsController < ApplicationController
  def create
    @task = Task.find(params[:task_id])
    @tag = Tag.find_by(tag_name: params[:tag][:tag_name])

    if @tag
      @task.tags << @tag
      redirect_to task_path(@task)
    else
      @task.tags.create(tag_params)
      redirect_to task_path(@task)
    end
  end

  def update
  end

  def destroy
    @task = Task.find(params[:task_id])
    @tag = @task.tags.find(params[:id])
    @task.tags.delete(@tag)
  end

  private
    def tag_params
      params.require(:tag).permit(:tag_name)
    end
end
