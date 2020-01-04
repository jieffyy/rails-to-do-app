class UsersController < ApplicationController
  # before_action :require_admin
  # skip_before_action :require_login, only: [:login, :create_session, :delete_session]
  # skip_before_action :require_admin, only: [:login, :create_session, :delete_session]

  # Loads the main summary page
  def login
    @tasks = {}
    if cookies[:user_id]
      @user = User.find(cookies[:user_id])
      @user.tasks.each do |task_obj|
        @tasks[task_obj.id] = {"tasks" => {}, "tags" => {}}
        @tasks[task_obj.id]["tasks"] = task_obj.as_json
        tag_xs = []
        task_obj.tags.each do |tag_obj|
          tag_xs.push(tag_obj.tag_name)
        end
        @tasks[task_obj.id]["tags"] = tag_xs
      end
    end
  end

  # Routed by Main -> Login Button
  def create_session
    @user = User.find_by(username: params[:username])

    # Find the user or register them
    if @user
      flash[:notice] = "Welcome back!"
    else
      @user = User.new(username: params[:username], is_admin: false)
      added = @user.save
      if added
        flash[:notice] = "Hey you're new! Adding you as a non-admin user."
      else
        flash[:notice] = "Username cannot be empty."
        redirect_to root_url and return
      end
    end

    # If there is a guest flag, change the tasks under the guest to belong to
    # the user
    if cookies[:is_guest]
      @user = User.find_by()
      @user.tasks.each do |task|
        task.update(user_id = @user.id)
      end
    end

    # Load into cookies
    cookies[:user_id] = @user.id
    cookies[:is_admin] = @user.is_admin
    cookies.delete(:is_guest)
    redirect_to root_url

  end

  # Routed by Main -> Logout Button
  def delete_session
    cookies.delete(:user_id)
    cookies.delete(:is_admin)
    cookies.delete(:is_guest)
    redirect_to root_url
  end

  private
    def user_params
      params.require(:user).permit(:username, :is_admin)
    end

    def require_admin
      if cookies[:is_admin] == "false"
        flash[:notice] = "Not authorised."
        redirect_to "/tasks"
      end
    end
end
