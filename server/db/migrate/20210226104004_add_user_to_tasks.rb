# frozen_string_literal: true

# Associates user to tasks
class AddUserToTasks < ActiveRecord::Migration[6.1]
  def change
    add_reference :tasks, :user, null: false, foreign_key: true
  end
end
