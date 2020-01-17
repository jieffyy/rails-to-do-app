class UsersController < ApplicationController
  before_action :require_admin, only: [:index, :destroy, :set_admin]

  def index
    @users = User.where("id != ?", cookies[:user_id])
    @users ||= []
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
  end

  def set_admin
    @user = User.find(params[:id])
    @user.is_admin = !@user.is_admin
    @user.save
  end

  # Loads the main summary page
  def login
    @tasks = {}
    @tags_xs = Set.new
    if cookies[:user_id]
      @user = User.find(cookies[:user_id])
      @user.tasks.each do |task_obj|
        @tasks[task_obj.id] = task_obj.as_json
        tag_xs = []
        task_obj.tags.each do |tag_obj|
          tag_xs.push(tag_obj.tag_name)
          @tags_xs << tag_obj.tag_name
        end
        @tasks[task_obj.id]["tags"] = tag_xs
      end
    end
  end

  # Routed by Main -> Login Button
  def create_session
    @user = User.find_by(username: params[:username])

    # Find the user or register them
    if params[:username] == ""
      flash[:notice] = "Username cannot be empty."
      redirect_to root_url and return
    elsif @user
      if @user.authenticate(params[:password])
        flash[:notice] = "Welcome back!"
        if cookies[:user_id]
          tmp_user = User.find(cookies[:user_id])
          tmp_user.tasks.each do |t|
            t.user_id = @user.id
            t.save!
          end
        else
          cookies[:user_id] = @user.id
          cookies[:is_admin] = @user.is_admin
          redirect_to root_url and return
        end
      else
        flash[:notice] = "Invalid password"
        redirect_to root_url and return
      end
    else
      if cookies[:user_id]
        @user = User.find(cookies[:user_id])
        @user.username = params[:username]
        @user.is_guest = false
        @user.password = params[:password]
      else
        @user = User.new(username: params[:username], is_guest: false, is_admin: false, password: params[:password])
      end
      if @user.save
        flash[:notice] = "Hey you're new! Adding you as a non-admin user."
        cookies[:user_id] = @user.id
        cookies[:is_admin] = @user.is_admin
        redirect_to root_url and return
      end
    end

    # Load into cookies

  end

  # Routed by Main -> Logout Button
  def delete_session
    cookies.delete(:user_id)
    cookies.delete(:is_admin)
    cookies.delete(:is_guest)
    flash.notice = "Thank you!"
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
