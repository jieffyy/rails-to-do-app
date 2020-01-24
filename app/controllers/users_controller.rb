class UsersController < ApplicationController
  def index
  end

  def create
    user = User.find_by(username: params[:username])
    message = {message: ""}

    if user
      message["message"] = "Username has been taken."
    else
      user = User.new(username: params[:username], password: params[:password], password_confirmation: params[:cfm_password])
      if user.save
        message["message"] = "User added! Please login."
      else
        message["message"] = "Something unexpected happened"
      end
    end

    render json: message
  end

  def create_session
    user = User.find_by(username: params[:username])
    rv = {}

    if user && user.authenticate(params[:password])
      rv["username"] = user.username
      rv["is_admin"] = user.is_admin
      auth_user(user.id)
    elsif user
      rv['message'] = "Password is incorrect"
    else
      rv['message'] = "Username not found"
    end

    render json: rv
  end
  
  def delete_session
    delete_user
  end
end
