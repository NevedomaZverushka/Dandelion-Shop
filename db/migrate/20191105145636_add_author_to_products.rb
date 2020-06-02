class AddAuthorToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :author, :string
  end
end
