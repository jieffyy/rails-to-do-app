# frozen_string_literal: true

# Associates user to tasks
class AddUserToTasks < ActiveRecord::Migration[6.1]
  def change
    # rubocop:disable Rails/NotNullColumn
    add_reference :tasks, :user, null: false, foreign_key: true
    # rubocop:enable Rails/NotNullColumn
  end
end
