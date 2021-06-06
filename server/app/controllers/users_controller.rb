# frozen_string_literal: true

# Controller for users
class UsersController < ApplicationController
  skip_before_action :authorized, only: %i[create login]

  # POST /users
  def create
    @user = User.create(user_params)
    if @user.valid?
      token = encode_token({ user_id: @user.id })
      render json: { user: @user, token: token }, status: :created
    else
      render json: { error: 'Invalid username or password' }, status: :unprocessable_entity
    end
  end

  # POST /login
  def login
    @user = User.find_by(username: params[:username])

    if @user&.authenticate(params[:password])
      token = encode_token({ user_id: @user.id })
      render json: { user: @user, token: token }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
