require "test_helper"

class TaskTest < ActiveSupport::TestCase
  test "valid task with just name" do
    @task = Task.new(name: "Hello!")
    assert @task.valid?
  end

  test "invalid task if name is nil" do
    @task = Task.new(name: nil)
    assert @task.invalid?
  end

  test "invalid task if name is empty string" do
    @task = Task.new(name: "")
    assert @task.invalid?
  end

  test "invalid task if is_done is true without setting done_at" do
    @task = Task.new(name: "Hello!", is_done: true)
    assert @task.invalid?
  end

  test "invalid task if is_done is false and done_at is set" do
    @task = Task.new(name: "Hello!", is_done: false, done_at: Time.now)
    assert @task.invalid?
  end

end
