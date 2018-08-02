class CreateMeals < ActiveRecord::Migration[5.2]
  def change
    create_table :meals do |t|
      t.integer :calories
      t.string :meal_category
      t.string :name
      t.integer :protein
      t.integer :fat
      t.integer :carbs
      t.integer :upc_code

      t.timestamps
    end
  end
end
