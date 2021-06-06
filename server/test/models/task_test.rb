# frozen_string_literal: true

require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  setup do
    @user = users(:user_1)
  end

  test 'valid task with just name' do
    @task = Task.new(name: 'Hello!')
    @task.user = @user
    assert @task.valid?
  end

  test 'invalid task if name is nil' do
    @task = Task.new(name: nil)
    @task.user = @user
    assert @task.invalid?
  end

  test 'invalid task if name is empty string' do
    @task = Task.new(name: '')
    @task.user = @user
    assert @task.invalid?
  end

  test 'invalid task if is_done is true without setting done_at' do
    @task = Task.new(name: 'Hello!', is_done: true)
    @task.user = @user
    assert @task.invalid?
  end

  test 'invalid task if is_done is false and done_at is set' do
    @task = Task.new(name: 'Hello!', is_done: false, done_at: Time.zone.now)
    @task.user = @user
    assert @task.invalid?
  end

  test "valid task with user's tags" do
    @task = Task.new(name: 'Hello!', is_done: false)
    @task.user = @user
    @task.tags = @user.tags
    assert @task.valid?
  end

  test "invalid task with another user's tags" do
    @task = Task.new(name: 'Hello!', is_done: false)
    @task.user = @user
    @task.tags = users(:user_2).tags
    assert @task.invalid?
  end
end
