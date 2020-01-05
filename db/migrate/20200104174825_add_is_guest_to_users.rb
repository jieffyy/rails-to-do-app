class AddIsGuestToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :is_guest, :boolean
  end
end
