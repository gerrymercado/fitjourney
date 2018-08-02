class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports do |t|
      t.integer :avg_protein_per_meal
      t.integer :avg_carbs_per_meal
      t.integer :avg_water_intake
      t.integer :avg_fat_per_meal
      t.integer :avg_calories_per_meal

      t.timestamps
    end
  end
end
