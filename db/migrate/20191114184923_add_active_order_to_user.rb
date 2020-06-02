class AddActiveOrderToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :active_order_id, :integer
  end
end
