class UsersController < ApplicationController
  def index
  end

  def create
    user = User.find_by(username: params[:username])
    message = {message: ""}

    if user
      message["message"] = "Username has been taken."
    elsif get_user()
      user = User.find(get_user())
      if user.update(username: params[:username], password: params[:password], password_confirmation: params[:cfm_password],
                      is_admin: false, is_guest: false)
        message['message'] = "User added! Your tasks have been added. Please login."
      else
        message['message'] = "Something unexpected happened"
      end
    else
      user = User.new(username: params[:username], password: params[:password], password_confirmation: params[:cfm_password],
                      is_admin: false, is_guest: false)
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
      
      if get_user()
        guest_acc = User.find(get_user())
        guest_acc.tasks.each do |t|
          user.tasks << t
        end
        user.save
        guest_acc.reload
        guest_acc.destroy
      end
      
      cookies['user_id'] = user.id
    elsif user
      puts "incorrect password"
      rv['error'] = "Password is incorrect"
    else
      rv['error'] = "Username not found"
    end

    render json: rv
  end
  
  def delete_session
    delete_user

    redirect_to root_url
    return
  end
end
