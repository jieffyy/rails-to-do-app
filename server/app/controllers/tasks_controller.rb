# frozen_string_literal: true

# Controller for tasks
class TasksController < ApplicationController
  before_action :set_task, only: %i[show update destroy]

  # GET /tasks
  def index
    @tasks = Task.where(user_id: @user.id)

    render json: @tasks
  end

  # GET /tasks/1
  def show
    if @task
      render json: @task
    else
      render json: {}, status: :not_found
    end
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)
    @task.user_id = @user.id

    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task&.update(task_params)
      render json: @task
    else
      render json: {}, status: :not_found
    end
  end

  # DELETE /tasks/1
  def destroy
    if @task
      @task.destroy
    else
      render json: {}, status: :not_found
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_task
    @task = Task.where({ user_id: @user.id, id: params[:id] }).take
  end

  # Only allow a list of trusted parameters through.
  def task_params
    params.require(:task).permit(:name, :is_done)
  end
end
