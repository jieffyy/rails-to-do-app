class UsersController < ApplicationController
  before_action :require_admin
  skip_before_action :require_login, only: [:login, :create_session, :delete_session]
  skip_before_action :require_admin, only: [:login, :create_session, :delete_session]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to @user
    else
      render 'new'
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      redirect_to @user
    else
      render 'edit'
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy

    redirect_to users_path
  end

  def login
  end

  def create_session
    @user = User.find_by(username: params[:username])

    if @user
      flash[:notice] = "Welcome back! Below are your tasks."
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

    cookies[:user_id] = @user.id
    cookies[:is_admin] = @user.is_admin
    redirect_to '/tasks'

  end

  def delete_session
    cookies.delete(:user_id)
    cookies.delete(:is_admin)
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
