class ChangeDataTypeForUpcCode < ActiveRecord::Migration[5.2]
  def change
    change_column :meals, :upc_code, :string
  end
end
