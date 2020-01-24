class ApplicationController < ActionController::Base
  def auth_user(user_id)
    cookies["user_id"] = user_id
  end

  def get_user
    return cookies["user_id"]
  end

  def delete_user
    cookies.delete("user_id")
  end
end