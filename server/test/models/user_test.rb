# frozen_string_literal: true

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'valid user with username, pwd, pwd_confirm' do
    @user = User.create(username: 'HelloWorld!', password: 'password', password_confirmation: 'password')
    assert @user.valid?
  end

  test 'invalid user with no username' do
    @user = User.create(username: '', password: 'password', password_confirmation: 'password')
    assert @user.invalid?
  end

  test 'invalid user with username, no password' do
    @user = User.create(username: 'HelloWorld!')
    assert @user.invalid?
  end

  # NOTE: can create user without password confirmation
  # test "invalid user with username, pwd, no pwd_confirm" do
  #   @user = User.create(username: "HelloWorld!", password: "password")
  #   assert @user.invalid?
  # end

  test 'invalid user with username, password is empty string' do
    @user = User.create(username: 'HelloWorld!', password: '', password_confirmation: '')
    assert @user.invalid?
  end

  test 'invalid user with username, mismatching password' do
    @user = User.create(username: 'HelloWorld!', password: 'password', password_confirmation: 'pwd')
    assert @user.invalid?
  end

  test 'able to authenticate user with correct pwd' do
    user_1 = users(:user_1)
    assert user_1.authenticate('OhNoItsPassword')
  end

  test 'unable to authenticate user with wrong pwd' do
    user_1 = users(:user_1)
    assert_not user_1.authenticate('NotRight')
  end
end
