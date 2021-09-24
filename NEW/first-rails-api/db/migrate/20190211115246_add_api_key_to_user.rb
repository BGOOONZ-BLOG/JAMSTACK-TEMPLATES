class AddApiKeyToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :apikey, :string
  end
end
