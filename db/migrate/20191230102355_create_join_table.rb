class CreateJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_join_table :tags, :tasks do |t|
      t.index :tag_id
      t.index :task_id
    end
  end
end
