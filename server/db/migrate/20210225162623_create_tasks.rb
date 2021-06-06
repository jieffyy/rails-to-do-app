# frozen_string_literal: true

# Creates the task model
class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.boolean :is_done
      t.datetime :done_at

      t.timestamps
    end

    change_column_default :tasks, :is_done, from: nil, to: false
  end
end
