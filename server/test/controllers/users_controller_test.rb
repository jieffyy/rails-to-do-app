# frozen_string_literal: true

require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:user1)
  end

  test 'should create user' do
    assert_difference('User.count') do
      post users_url, params: { user: { username: 'HelloWorld', password: 'password' } }, as: :json
    end

    assert_response 201
  end

  test 'should not create user' do
    assert_no_changes('User.count') do
      post users_url, params: { user: { username: 'HelloWorld', password: '' } }, as: :json
    end

    assert_response 422
  end

  test 'should login' do
    post login_url, params: { username: @user.username, password: 'OhNoItsPassword' }, as: :json
    assert_response :success
  end

  test 'should not login' do
    post login_url, params: { username: @user.username, password: 'NotTheRightOne' }, as: :json
    assert_response :unauthorized
  end
end
